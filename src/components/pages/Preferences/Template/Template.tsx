"use client";

import { useEffect } from "react";
import { CustomWindow } from "@/lib/types/window";

declare let window: CustomWindow;

const Template = () => {
  function experienceClosed(reason: string) {
    if (reason != "willNotShow") {
      if (document.referrer && document.referrer !== document.location.href) {
        window.location.href = document.referrer;
      } else {
        window.location.href = "/";
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
