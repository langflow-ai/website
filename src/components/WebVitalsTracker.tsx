"use client";

import { useEffect } from "react";

export function WebVitalsTracker() {
  useEffect(() => {
    // Dynamically import web vitals to avoid SSR issues
    import("../lib/utils/webVitals")
      .then(({ initPerformanceMonitoring }) => {
        initPerformanceMonitoring();
      })
      .catch((error) => {
        console.warn("Failed to load web vitals:", error);
      });
  }, []);

  return null;
}
