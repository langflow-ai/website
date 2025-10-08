"use client";

// Dependencies
import { useState } from "react";

// Components
import Display from "@/components/ui/Display";
import MarketoForm from "@/components/ui/form";

// Utils
import { DOWNLOAD_OPTIONS, NEWSLETTER_BLURB } from "@/utils/constants";
import { trackEvent } from "@/lib/utils/tracking";
import { kitSubscribe } from "@/app/actions/kitSubscribe";

// Styles
import styles from "./styles.module.scss";

const CHECKBOX_ID = "newsletter-optin-checkbox";

const DownloadForm = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleDownload = async (url: string, filename: string) => {
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    trackEvent("CTA Clicked", {
      CTA: "Download",
      channel: "webpage",
      location: "download-form",
      filename: filename,
    });
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  // Creates and inserts a checkbox for newsletter subscription into the Marketo form
  // Yes, this is a bit hacky, but I couldn't find a better way to insert
  // a custom field into the Marketo form.
  const handleFormLoad = (form: any) => {
    // Insert the checkbox as a new .mktoButtonRow before the existing button row
    const formElem = form.getFormElem()[0];
    if (!formElem) return;

    // Prevent duplicate insertion
    if (document.getElementById("newsletter-optin-checkbox")) return;

    // Find the existing .mktoButtonRow (the one with the submit button)
    const buttonRow = formElem.querySelector(".mktoButtonRow");
    if (!buttonRow) return;

    // Create a new .mktoButtonRow for the checkbox
    const checkboxRow = document.createElement("div");
    checkboxRow.className = "mktoButtonRow";

    // Create the checkbox container
    const wrap = document.createElement("div");
    wrap.className = "mmktoFieldDescriptor mktoFormCol";
    const innerWrap = document.createElement("div");
    innerWrap.className = "mktoFieldWrap";

    const container = document.createElement("div");
    container.style.margin = "1rem 0 0.75rem 0";
    container.style.display = "flex";
    container.style.flexDirection = "column";
    container.style.alignItems = "left";

    const explainer = document.createElement("p");
    explainer.textContent = NEWSLETTER_BLURB;
    explainer.style.color = "white";
    explainer.style.fontSize = "1.1em";

    // Create the checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = CHECKBOX_ID;
    checkbox.style.marginRight = "0.5em";
    checkbox.className = "mktoField";
    checkbox.name = "newsletter-optin";

    // Create the label
    const label = document.createElement("label");
    label.htmlFor = CHECKBOX_ID;
    label.style.display = "flex";
    label.style.flexDirection = "row";
    label.style.gap = "0.5em";
    label.style.alignItems = "center";
    label.style.marginBottom = "0.5em";
    label.className = "mktoLabel";
    label.appendChild(checkbox);
    const labelSpan = document.createElement("span");
    labelSpan.appendChild(document.createTextNode("Subscribe to the "));
    const link = document.createElement("a");
    link.href = "/newsletter";
    link.textContent = "AI++ newsletter";
    link.target = "_blank";
    labelSpan.appendChild(link);
    label.appendChild(labelSpan);

    container.appendChild(label);
    container.appendChild(explainer);
    innerWrap.appendChild(container);
    wrap.appendChild(innerWrap);
    checkboxRow.appendChild(wrap);

    // Insert the checkbox row before the button row
    buttonRow.parentNode?.insertBefore(checkboxRow, buttonRow);
  };

  const handleSuccess = async (values: any) => {
    const checkbox = document.getElementById(
      CHECKBOX_ID
    ) as HTMLInputElement | null;
    const email = values?.Email;
    if (checkbox?.checked && email) {
      const formData = new FormData();
      formData.append("email", email);
      await kitSubscribe(
        { errors: [], success: false, referrer: window.location.href },
        formData
      );
      trackEvent("CTA Clicked", {
        CTA: "Subscribe",
        channel: "webpage",
        location: "download-form",
      });
    }
    setFormSubmitted(true);
  };

  if (formSubmitted) {
    return (
      <div className={styles.list}>
        {DOWNLOAD_OPTIONS.map((option) => (
          <div key={option.name} className={styles.listItem}>
            <div
              className={`${styles.detailsItem} ${option.isComingSoon ? styles.opacity : ""}`}
            >
              {option.icon}
              <Display size={100} weight={600} className={styles.itemName}>
                {option.name}
              </Display>
            </div>

            {option.isComingSoon ? (
              <Display size={100} weight={400} className={styles.comingSoon}>
                Coming Soon
              </Display>
            ) : (
              <a
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleDownload(option.link, option.fileName);
                }}
                className={styles.downloadButton}
              >
                <Display
                  size={100}
                  weight={600}
                  className={"text-center text-black"}
                >
                  {option.btnText}
                </Display>
              </a>
            )}
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      <Display className="text-white" size={100} weight={400}>
        Fill out the form below to receive access to download the desktop app
        for Mac or Windows.
      </Display>
      <MarketoForm
        showFootNote={false}
        onSuccess={handleSuccess}
        onLoad={handleFormLoad}
        isDownload
        id={5302}
      />
    </>
  );
};

export default DownloadForm;
