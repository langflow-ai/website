"use client";

import { useFormState, useFormStatus } from "react-dom";

import styles from "../../../ui/button/styles.module.scss";
import { kitSubscribe } from "../../../../app/actions/kitSubscribe";

export function KitForm() {
  const [state, formAction] = useFormState(kitSubscribe, {
    success: false,
    errors: [],
  });
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
