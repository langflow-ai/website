// Dependencies
import { formatDate } from "date-fns";

export const SEQUENCE_ID_1 = "93e9f15d874712fe3f3d89afcc80b183cc74cf13";
export const SEQUENCE_ID_2 = "23ffc1c1dcb74820f879e628fc5f40d534c113bf";
export const SEQUENCE_ID_3 = "056e8c4ff5c472e0ff4fb1ee55f97e7b347636a8";

export interface AmpleMarketResponse {
  message: string;
  company: string;
  validatedEmails: string[];
  executiveCount: number;
}

export const addLead = async (
  sequenceId: string,
  email: string,
  FirstName?: string,
  LastName?: string,
) => {
  if (process.env.NODE_ENV === "production") {
    try {
      const response = await fetch("/api/ampleMarketAddLead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          sequenceId,
          firstName: FirstName || "",
          lastName: LastName || "",
        }),
      });

      if (!response.ok) {
        console.error("API request failed:", await response.text());
      } else {
        const data = await response.json();
        console.log("API request completed successfully:", data);
      }
    } catch (error) {
      console.error("Error calling API:", error);
    }
  }
};

export const getEmailsAndAddLeads = async (
  companyName: string,
  sequenceId: string,
) => {
  if (process.env.NODE_ENV === "production") {
    try {
      const today = new Date();
      const date = formatDate(today, "MM/dd/yyyy");

      const response = await fetch("/api/ampleMarket", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sequenceId,
          companyName,
          date,
        }),
      });

      if (!response.ok) {
        console.error("API request failed:", await response.text());
      } else {
        const data: AmpleMarketResponse = await response.json();
        console.log("API request completed successfully:", data);
      }
    } catch (error) {
      console.error("Error calling API:", error);
    }
  }
};
