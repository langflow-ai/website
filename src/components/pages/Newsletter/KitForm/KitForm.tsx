"use client";

import { useFormState, useFormStatus } from "react-dom";

import styles from "../../../ui/button/styles.module.scss";
import { kitSubscribe } from "../../../../app/actions/kitSubscribe";
import { useEffect } from "react";
import { trackEvent } from '@/lib/utils/tracking';

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
    trackEvent("Langflow.org - Newsletter Subscribe Button Clicked", {
      text: "Subscribe"
    })
  }

  return (
    <>
      {!state.success ? (
        <form action={formAction} className="container" data-bs-theme="dark">
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
    </>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      className={`${styles.button} ${styles["filled-button"]}`}
      type="submit"
      disabled={pending}
    >
      {pending ? "Submitting..." : "Subscribe"}
    </button>
  );
}
