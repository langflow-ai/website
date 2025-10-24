"use client";

// Dependencies
import { useEffect, useState } from "react";

// Types
import { MarketoForm, MarketoFormId } from "@/lib/types/marketo";
import { CustomWindow } from "@/lib/types/window";

// Hooks
import useIsomorphicLayoutEffect from "./useIsomorphicLayoutEffect";

// Utilities
import { isScriptLoaded, loadScript } from "@/lib/utils/browser";
import {
  addHiddenFields,
  loadZiEnrichment,
  reorderFields,
  setBusinessEmailValidation,
} from "@/lib/utils/marketo";

declare let window: CustomWindow;

// Constants
const INTERVAL_DURATION = 500;
const MAX_WAIT_TIME = 10000;
const MUNCHKIN_ID = "259-IFZ-779";
const DOMAINS: string[] = [
  "https://pages.datastax.com",
  "https://app-ab17.marketo.com",
];

const useMarketo = (
  id: MarketoFormId,
  onLoad?: (form: MarketoForm) => void,
  onError?: () => void,
  useBusinessEmailValidation = true,
) => {
  // Hooks
  const [domain, setDomain] = useState<string>(DOMAINS[0]);
  const [form, setForm] = useState<MarketoForm>();
  const [isMktoForm, setIsMktoForm] = useState(false);
  const [formLoadError, setFormLoadError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    const timeout = setTimeout(() => {
      if (!window.MktoForms2) {
        setFormLoadError(true);
        clearInterval(interval!);
      }
    }, MAX_WAIT_TIME);

    interval = setInterval(() => {
      if (window.MktoForms2) {
        setIsMktoForm(true);
        clearInterval(interval!);
        clearTimeout(timeout);
      }
    }, INTERVAL_DURATION);

    return () => {
      clearInterval(interval!);
      clearTimeout(timeout);
    };
  }, []);

  // Handlers
  const loadForm = (): void => {
    setIsLoading(true);

    if (isLoading || form) {
      return;
    }

    if (window.MktoForms2?.getForm(id)) {
      const _form = window.MktoForms2?.getForm(id);
      _form.render();
      return;
    }

    window.MktoForms2?.loadForm(domain, MUNCHKIN_ID, id);
  };

  const trackLoad = () => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "script-mktoforms2-onload",
    });
  };
  const handleLoad = () => {
    loadForm();
    trackLoad();
  };
  const handleError = () => {
    const index = DOMAINS.indexOf(domain);
    if (index < DOMAINS.length - 1) {
      // Try to use the next domain available.
      setDomain(DOMAINS[index + 1]);
      return;
    }
  };

  // More hooks
  useIsomorphicLayoutEffect(() => {
    // Always make sure jQuery is loaded, which is required by Marketo
    if (typeof window.jQuery === "undefined") {
      loadScript(
        "https://code.jquery.com/jquery-3.6.0.slim.min.js",
        undefined,
        undefined,
        true,
      );
    }
    // Load in Chili Piper
    if (typeof window.ChiliPiper === "undefined") {
      loadScript(
        "https://js.chilipiper.com/marketing.js",
        undefined,
        undefined,
        true,
      );
    }

    // If forms2.min.js was already loaded in other place, just return a success status
    if (typeof window.MktoForms2 !== "undefined" && isMktoForm && !isLoading) {
      loadForm();
    } else if (!isScriptLoaded(`${domain}/js/forms2/js/forms2.min.js`)) {
      // If forms2.min.js is not loaded, try to load it
      loadScript(
        `${domain}/js/forms2/js/forms2.min.js`,
        handleLoad,
        handleError,
        true,
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [domain, isMktoForm]);

  useIsomorphicLayoutEffect(() => {
    if (isMktoForm && window.MktoForms2) {
      window.MktoForms2.whenReady(function (form: MarketoForm) {
        if (form.getId() === 1908) {
          setForm(form);
          onLoad && onLoad(form);
          return;
        }

        if (form && form.getId() === Number(id)) {
          setForm(form);
          loadZiEnrichment(form);
          addHiddenFields(form);
          reorderFields(form);

          if (useBusinessEmailValidation) {
            if (window.srpro && !!window.srpro?.isEmailGood) {
              // Disable this validation if the srpro script is enabled.
              return;
            }
            setBusinessEmailValidation(form);
          }

          onLoad && onLoad(form);
          return;
        }

        onError && onError();
      });
    }
  }, [isMktoForm]);

  return {
    form,
    formLoadError,
  };
};

export default useMarketo;
