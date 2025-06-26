"use server";

export type KitFormState = {
  errors: string[];
  success: boolean;
};

export async function kitSubscribe(
  _previousState: KitFormState,
  formData: FormData
) {
  const email = formData.get("email") as string;
  const options = {
    method: "POST",
    headers: {
      "X-Kit-Api-Key": process.env.KIT_API_KEY ?? "",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email_address: email }),
  };

  try {
    const response = await fetch("https://api.kit.com/v4/subscribers", options);
    const data = await response.json();
    if (response.ok) {
      return {
        errors: [],
        success: true,
      };
    } else {
      return {
        errors: data.errors,
        success: false,
      };
    }
  } catch (error) {
    console.error("Error subscribing to Kit:", error);
    return {
      errors: ["Failed to subscribe. Please try again later."],
      success: false,
    };
  }
}
