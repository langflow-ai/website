"use client";

import { useFormState, useFormStatus } from "react-dom";

import btnStyles from "../../../ui/button/styles.module.scss";
import styles from "./styles.module.scss";
import { kitSubscribe } from "../../../../app/actions/kitSubscribe";
import { useEffect } from "react";
import { trackEvent } from "@/lib/utils/tracking";
import Display from "@/components/ui/Display";

export function KitForm() {
  let referrer = "";
  useEffect(() => {
    if (window && window.location) {
      referrer = window.location.href;
      if (!referrer.includes("utm_source")) {
        const url = new URL(referrer);
        url.searchParams.set("utm_source", "langflow.org");
        url.searchParams.set("utm_medium", "website");
        url.searchParams.set("utm_campaign", "organic");
        referrer = url.toString();
      }
    }
  });

  const initialState = {
    success: false,
    errors: [],
    referrer: referrer,
  };

  const [state, formAction] = useFormState(kitSubscribe, initialState);

  if (state.success) {
    trackEvent("CTA Clicked", {
      CTA: "Subscribe",
      channel: "webpage",
      location: "newsletter-form",
    });
  }

  return (
    <div className={styles.formContainer}>
      {!state.success ? (
        <form action={formAction} data-bs-theme="dark" className={styles.form}>
          <Display className="text-white" size={400} weight={500}>
            Sign up for the newsletter
          </Display>

          <Display size={100} weight={400}>
            Enter your details to start receiving AI++
          </Display>

          <div className="mb-5">
            <label htmlFor="email" className="form-label">
              Email address: *
            </label>
            <input
              type="email"
              className={
                state.errors.length > 0
                  ? "form-control is-invalid"
                  : "form-control"
              }
              id="email"
              name="email"
              placeholder="agent@example.com"
              required
            />
            {state.errors.length > 0 && (
              <div className="invalid-feedback">
                {state.errors.map((error: string) => (
                  <p key={error}>{error}</p>
                ))}
              </div>
            )}
          </div>
          <div className="d-grid">
            <SubmitButton></SubmitButton>
          </div>
        </form>
      ) : (
        <div
          className="alert alert-primary container"
          role="alert"
          data-bs-theme="dark"
        >
          <p>
            <strong>Thank you!</strong> You have subscribed to our newsletter.
            Check your email inbox to confirm.
          </p>
        </div>
      )}
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      className={`${btnStyles.button} ${btnStyles["filled-button"]}`}
      type="submit"
      disabled={pending}
    >
      {pending ? "Submitting..." : "Subscribe"}
    </button>
  );
}
