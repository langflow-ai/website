"use client";

import { useEffect, useRef } from "react";
import { CustomWindow } from "@/lib/types/window";

declare let window: CustomWindow;

const Template = () => {
  const hasNavigated = useRef(false);

  function experienceClosed(reason: string) {
    if (reason != "willNotShow" && !hasNavigated.current) {
      hasNavigated.current = true;
      // Check if there's a history to go back to
      if (window.history.length > 1) {
        console.log("history back");
        window.history.back();
      } else {
        console.log("no history back");
        // Fallback to home page if no history
        if (document.referrer) {
          window.location.href = document.referrer;
        } else {
          window.location.href = "/";
        }
      }
    }
  }

  useEffect(() => {
    // Only access window on client side
    if (typeof window !== "undefined" && window.ketch) {
      const ketch = window.ketch;
      ketch("showExperience");
      ketch("on", "hideExperience", experienceClosed);
    }
  }, []);

  return <></>;
};

export default Template;
