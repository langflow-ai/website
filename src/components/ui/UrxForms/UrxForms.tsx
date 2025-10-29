"use client";

// Dependencies
import Script from "next/script";
import { useEffect, useState } from "react";

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
}

const UrxForms: React.FC<UrxFormsProps> = ({
  formId = "urx-54089",
  instanceId = "urx-form",
  success,
  text,
}) => {
  const [scriptsLoaded, setScriptsLoaded] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // const isProduction = process.env.NODE_ENV === "production";

  useEffect(() => {
    if (document.loadWidgets && !scriptsLoaded) {
      setScriptsLoaded(true);
    }
  }, [scriptsLoaded]);

  useEffect(() => {
    // Initialize success callback
    if (!window.onUrxFormSubmitSuccessMultiple) {
      window.onUrxFormSubmitSuccessMultiple = {};
    }

    window.onUrxFormSubmitSuccessMultiple[instanceId] = function (params: any) {
      console.log("Form submitted successfully:", params);
    };
  }, [instanceId]);

  useEffect(() => {
    if (scriptsLoaded && document.loadWidgets) {
      const widget = {
        instanceId: instanceId,
        formid: formId,
        locale: "us-en",
        environment: false ? "production" : "stage",
        onRenderFinish: function () {
          console.log(`Form ${formId} rendered`);
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
          callback();
        },
        formLoaded: function () {
          console.log(`Form ${formId} loaded`);
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
  }, [scriptsLoaded, formId, instanceId]);

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
          src={`https://www${false ? "" : "stage"}.ibm.com/account/ibmidutil/widget/js/loader.js`}
          strategy="afterInteractive"
          onError={(e) => console.error("Loader script failed to load:", e)}
        />
        <Script
          src={`https://www${false ? "" : "stage"}.ibm.com/account/ibmidutil/widget/js/main.js`}
          strategy="afterInteractive"
          onLoad={handleMainScriptLoad}
          onError={(e) => console.error("Main script failed to load:", e)}
        />

        {false && (
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
