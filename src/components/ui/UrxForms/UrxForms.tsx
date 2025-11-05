"use client";

// Dependencies
import Script from "next/script";
import { useEffect, useMemo, useState } from "react";

// Components
import Text from "@/components/ui/text";

// Styles
import styles from "./styles.module.scss";

declare global {
  interface Window {
    onUrxFormSubmitSuccessMultiple?: {
      [key: string]: (params: any) => void;
    };
  }

  interface Document {
    loadWidgets?: (widgets: any[]) => void;
  }
}

interface UrxFormsProps {
  formId: string;
  instanceId?: string;
  success?: JSX.Element;
  text?: string;
  stageFormId?: string;
}

const UrxForms: React.FC<UrxFormsProps> = ({
  formId = "urx-54089",
  instanceId = "urx-form",
  success,
  text,
  stageFormId = "",
}) => {
  const [scriptsLoaded, setScriptsLoaded] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const [isProduction, setIsProduction] = useState(0);

  const isBrowser = typeof window !== "undefined";

  useEffect(() => {
    if (document.loadWidgets && !scriptsLoaded) {
      setScriptsLoaded(true);
    }
  }, [scriptsLoaded]);

  useEffect(() => {
    if (!isLoaded) return;

    const observer = new MutationObserver(() => {
      const label = document.querySelector('label[for="email"]');
      if (label && label.textContent === "Business email") {
        label.textContent = "Email";
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, [isLoaded]);

  useEffect(() => {
    if (!isBrowser) return;
    const origin = window.location?.origin ?? "";
    setIsProduction(
      origin.includes("langflow.org") || origin.includes("langflow.new")
        ? 1
        : -1
    );
  }, [isBrowser]);

  const resolvedFormId = useMemo(() => {
    return isProduction === -1 && stageFormId ? stageFormId : formId;
  }, [isProduction, stageFormId, formId]);

  useEffect(() => {
    if (!isBrowser) return;
    window.onUrxFormSubmitSuccessMultiple ??= {};
    window.onUrxFormSubmitSuccessMultiple[instanceId!] = function (
      params: any
    ) {
      console.log("Form submitted successfully:", params);
    };
  }, [isBrowser, instanceId]);

  useEffect(() => {
    if (
      scriptsLoaded &&
      document.loadWidgets &&
      isBrowser &&
      isProduction !== 0
    ) {
      const widget = {
        instanceId: instanceId,
        formid: resolvedFormId,
        locale: "us-en",
        environment: isProduction === 1 ? "production" : "stage",
        onRenderFinish: function () {
          console.log(`Form ${resolvedFormId} rendered`);
        },
        renderFunctionName: "renderUrxWidget",
        design: {
          column: 1,
          theme: "dark",
          singleStep: true,
          inline: false,
        },
        triggerManually: true,
        onUrxFormSubmit: function (_: any, callback: () => void) {
          setIsSuccess(true);
          callback();
        },
        formLoaded: function () {
          console.log(`Form ${resolvedFormId} loaded`);
          setIsLoaded(true);
        },
        onUrxFormSubmitSuccess: function () {
          setIsSuccess(true);
        },
        userActionEvent: function (action: string, payload: any) {
          console.info("userActionEvent", action, payload);
        },
        emailOnly: false,
        controls: {
          authRedirection: false,
        },
      };

      document.loadWidgets([widget]);
    } else if (scriptsLoaded && !document.loadWidgets) {
      console.error("Scripts loaded but loadWidgets function not found!");
    }
  }, [scriptsLoaded, resolvedFormId, instanceId, isBrowser, isProduction]);

  const handleMainScriptLoad = () => {
    setScriptsLoaded(true);
  };

  if (isSuccess && success) {
    return <>{success}</>;
  }

  return (
    <>
      {text && <Text size={200}>{text}</Text>}
      <div className={styles.urx}>
        <Script
          src={`https://www${isProduction === 1 ? "" : "stage"}.ibm.com/account/ibmidutil/widget/js/loader.js`}
          strategy="afterInteractive"
          onError={(e) => console.error("Loader script failed to load:", e)}
        />
        <Script
          src={`https://www${isProduction === 1 ? "" : "stage"}.ibm.com/account/ibmidutil/widget/js/main.js`}
          strategy="afterInteractive"
          onLoad={handleMainScriptLoad}
          onError={(e) => console.error("Main script failed to load:", e)}
        />

        {isProduction === 1 && (
          <Script
            src="https://www.ibm.com/common/stats/ida_stats.js"
            strategy="lazyOnload"
          />
        )}

        <div>
          {!scriptsLoaded && (
            <div
              style={{
                padding: "2rem",
                textAlign: "center",
                color: "#666",
              }}
            >
              Loading form...
            </div>
          )}
          <div id={instanceId}></div>
        </div>
      </div>
    </>
  );
};

export default UrxForms;
