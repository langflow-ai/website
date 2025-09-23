"use server";

export type KitFormState = {
  errors: string[];
  success: boolean;
  referrer: string;
};

export async function kitSubscribe(
  previousState: KitFormState,
  formData: FormData
): Promise<KitFormState> {
  const email = formData.get("email") as string;
  const referrer = previousState.referrer;
  if (!process.env.KIT_API_KEY) {
    return {
      errors: ["No KIT_API_KEY configured."],
      success: false,
      referrer,
    };
  }
  const options = {
    method: "POST",
    headers: {
      "X-Kit-Api-Key": process.env.KIT_API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email_address: email, state: "inactive" }),
  };

  try {
    const response = await fetch("https://api.kit.com/v4/subscribers", options);
    const data = await response.json();

    if (response.ok) {
      const formOptions = {
        method: "POST",
        headers: {
          "X-Kit-Api-Key": process.env.KIT_API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email_address: email,
          referrer,
        }),
      };
      fetch(
        `https://api.kit.com/v4/forms/${process.env.KIT_FORM_ID}/subscribers`,
        formOptions
      )
        .then((res) => res.json())
        .catch((error) => console.error("Error submitting form:", error));

      return {
        errors: [],
        success: true,
        referrer,
      };
    } else {
      return {
        errors: data.errors,
        success: false,
        referrer,
      };
    }
  } catch (error) {
    console.error("Error subscribing to Kit:", error);
    return {
      errors: ["Failed to subscribe. Please try again later."],
      success: false,
      referrer,
    };
  }
}
