'use client';

// Dependencies
import { ReactElement, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Script from 'next/script';

// Types
import { RingLeadInstantBookCallback, RingLeadInstantBookInit } from '@/lib/types/ringlead';
import { InstantBook } from '@/lib/types/sanity';
import { CustomWindow } from '@/lib/types/window';

// Hooks
import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect';
import useMarketo from '@/hooks/useMarketo';

// Utilities
import { addLead, SEQUENCE_ID_1 } from '@/lib/utils/addLeads';
import { isFormSubmittable } from '@/lib/utils/marketo';
import { isFunction } from '@/lib/utils/str';
import { trackEvent } from '@/lib/utils/tracking';

// Components
import Markup from '@/components/ui/markup';
import Footnote from '@/components/ui/footnote';
import Text from '@/components/ui/text';

// Globals
declare let RingLeadInstantBook: {
  init: RingLeadInstantBookInit;
  instantBookCallBack: RingLeadInstantBookCallback;
};
declare let window: CustomWindow;

export type SuccessTracking = {
  action: string;
  payload?: Record<string, string | number | boolean>;
};

// Props types
type Props = {
  id: number | string;
  title?: string | ReactElement;
  feedback?: string | ReactElement;
  allowBypass?: boolean;
  instantBook?: InstantBook;
  onLoad?: (form: any) => void;
  onSuccess?: (values?: any) => void;
  successTracking?: SuccessTracking;
  successRedirect?: string;
  concatValuesToRedirect?: boolean;
  useBusinessEmailValidation?: boolean;
  showFootNote?: boolean;
  shouldDisableButton?: boolean;
};

const MarketoForm = ({
  id,
  title,
  feedback,
  allowBypass = false,
  successRedirect,
  instantBook,
  onLoad = () => null,
  onSuccess = () => null,
  successTracking,
  concatValuesToRedirect,
  useBusinessEmailValidation = false,
  showFootNote = true,
  shouldDisableButton = false
}: Props): JSX.Element => {
  const searchParams = useSearchParams();
  const isMounted = useRef(false);

  const [success, setSuccess] = useState<boolean>(false);
  const [isLoaded, setLoaded] = useState<boolean | null>(null);
  const [ringleadLoaded, setRingleadLoaded] = useState<boolean>(false);
  const [hasErrorBeenHandled, setHasErrorBeenHandled] = useState(false);

  const isValidInstantBook = instantBook?.uuid && instantBook?.org_id && instantBook.task_id && instantBook?.environment;

  const handleSuccess = (values?: any) => {
    try {
      const action = successTracking?.action || 'www - Form Submitted';
      const payload = {
        category: 'All',
        label: window.location.pathname,
        ...(successTracking?.payload || {})
      };

      trackEvent(action, payload);
      if (values?.interestedinCassandraHealthCheck === 'yes') {
        addLead(SEQUENCE_ID_1, values?.Email, values?.FirstName, values?.LastName);
      }
    } catch (error) {
      console.log(error);
    }
    setSuccess(true);
    onSuccess && onSuccess(values);

    if (successRedirect) {
      let redirectLink = successRedirect;
      if (concatValuesToRedirect) {
        const valuesString = `name=${values?.FirstName} ${values?.LastName}&email=${values?.Email}`;
        redirectLink = redirectLink.concat(redirectLink.includes('?') ? `&${valuesString}` : `?${valuesString}`);
      }
      window.open(redirectLink, '_self');
    }

    return false;
  };

  const invalidateForm = (): void => {
    if (isLoaded === null) {
      setLoaded(false);
    }
  };

  const { formLoadError } = useMarketo(
    id,
    (form) => {
      if (!isMounted.current || !form) {
        return;
      }
      setLoaded(true);
      isFunction(onLoad) && onLoad(form);

      if (id == 4429) {
        form.onSubmit(() => {
          window.ChiliPiper.submit('datastax', 'inbound_router_mobile_demo', {
            map: true,
            formId: `mktoForm_${id}`
          });
        });
      }

      if (shouldDisableButton) {
        const requiredFields: string[] = [];

        try {
          form.getFormElem().find('button').attr('disabled', true);
          form
            .getFormElem()
            .find('.mktoRequiredField')
            .find('input, textarea, select')
            .map((_: number, input: any) => {
              requiredFields.push(input.id);
            });
        } catch (error) {
          console.log('Error getting required fields', error);
        }

        form.getFormElem().on('change', () => {
          const isValid = isFormSubmittable(form.getValues(), requiredFields);

          if (isValid) {
            form.getFormElem().find('button').attr('disabled', false);
            return;
          }

          form.getFormElem().find('button').attr('disabled', true);
        });

        form.onValidate((isValid) => {
          if (isValid) {
            form.getFormElem().find('button').attr('disabled', false);
          } else {
            form.getFormElem().find('button').attr('disabled', true);
          }
        });
      }

      form.onSuccess((values: any) => {
        if (!isMounted.current) {
          return false;
        }

        handleSuccess(values);
        return false;
      });
    },
    invalidateForm,
    useBusinessEmailValidation
  );

  useIsomorphicLayoutEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (isValidInstantBook) {
      const interval = setInterval(() => {
        if (typeof RingLeadInstantBook !== undefined) {
          setRingleadLoaded(true);
          clearInterval(interval);
        }
      }, 500);

      return () => clearInterval(interval);
    }
  }, [isValidInstantBook]);

  useEffect(() => {
    if ((allowBypass && searchParams.get('bypass')) || searchParams.get('aliId')) {
      handleSuccess();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  useEffect(() => {
    const checkForErrorAndFocusEmail = () => {
      const errorMsg = document.querySelector('#ValidMsgEmail');
      const emailInput = document.querySelector('#Email') as HTMLInputElement;
      if (!hasErrorBeenHandled && errorMsg && errorMsg.textContent?.includes('Please enter a business email') && emailInput) {
        emailInput.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });

        setHasErrorBeenHandled(true);
      }
    };

    const interval = setInterval(() => {
      checkForErrorAndFocusEmail();
    }, 500);

    return () => clearInterval(interval);
  }, [hasErrorBeenHandled]);

  useEffect(() => {
    const form = document.querySelector(`#mktoForm_${id}`) as HTMLFormElement;
    const submitButton = form?.querySelector('button[type="submit"]');
    if (submitButton) {
      submitButton.addEventListener('click', () => {
        setHasErrorBeenHandled(false);
      });
    }
    return () => {
      submitButton?.removeEventListener('click', () => {
        setHasErrorBeenHandled(false);
      });
    };
  }, [id, hasErrorBeenHandled]);

  useEffect(() => {
    const updateFormLabels = () => {
      const emailLabel = document.querySelector('label[for="Email"], #LblEmail');
      if (emailLabel) {
        emailLabel.innerHTML = '<div class="mktoAsterix">*</div>Business Email:';
      }

      const submitButton = document.querySelector('.mktoButton[type="submit"]');
      if (submitButton) {
        submitButton.textContent = 'Download Langflow';
      }
    };

    const timeout = setTimeout(() => {
      updateFormLabels();
    }, 200);

    return () => clearTimeout(timeout);
  }, []);

  if (formLoadError) {
    return (
      <Text className="text-center" size={400}>
        Sorry, the form could not be loaded.
      </Text>
    );
  }

  return (
    <>
      {isValidInstantBook && <Script type="text/javascript" src="https://scheduler.ringlead.com/scripts/instantbook.js" />}
      {title && typeof title === 'string' ? <h2 className="h2 text-center">{title}</h2> : title}
      {success && feedback ? (
        typeof feedback === 'string' ? (
          <Markup content={feedback} />
        ) : (
          feedback
        )
      ) : (
        <>
          <form id={`mktoForm_${id}`} />
          {isLoaded && showFootNote && <Footnote />}
        </>
      )}

      {ringleadLoaded && isLoaded && (
        <Script strategy="afterInteractive" id="ringlead-instant-book-init">
          {`RingLeadInstantBook.init('${instantBook?.uuid}', ${instantBook?.task_id}, ${instantBook?.org_id}, ${instantBook?.environment});`}
        </Script>
      )}
    </>
  );
};

export default MarketoForm;
