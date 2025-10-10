import { onCLS, onFCP, onLCP, onTTFB, onINP, Metric } from "web-vitals";

// Type declarations for global objects
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    analytics?: {
      track: (event: string, properties?: Record<string, any>) => void;
    };
  }
}

// Web Vitals tracking
export function reportWebVitals() {
  // Track Core Web Vitals
  onCLS((metric) => {
    // Track Cumulative Layout Shift
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "web_vitals", {
        event_category: "Web Vitals",
        event_label: "CLS",
        value: Math.round(metric.value * 1000),
        custom_map: { metric_id: metric.id },
        non_interaction: true,
      });
    }

    // Also send to Segment if available
    if (typeof window !== "undefined" && window.analytics) {
      window.analytics.track("Web Vitals", {
        metric: "CLS",
        value: metric.value,
        id: metric.id,
        delta: metric.delta,
        rating: metric.rating,
      });
    }
  });

  onINP((metric) => {
    // Track Interaction to Next Paint (replaces FID)
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "web_vitals", {
        event_category: "Web Vitals",
        event_label: "INP",
        value: Math.round(metric.value),
        custom_map: { metric_id: metric.id },
        non_interaction: true,
      });
    }

    if (typeof window !== "undefined" && window.analytics) {
      window.analytics.track("Web Vitals", {
        metric: "INP",
        value: metric.value,
        id: metric.id,
        delta: metric.delta,
        rating: metric.rating,
      });
    }
  });

  onFCP((metric) => {
    // Track First Contentful Paint
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "web_vitals", {
        event_category: "Web Vitals",
        event_label: "FCP",
        value: Math.round(metric.value),
        custom_map: { metric_id: metric.id },
        non_interaction: true,
      });
    }

    if (typeof window !== "undefined" && window.analytics) {
      window.analytics.track("Web Vitals", {
        metric: "FCP",
        value: metric.value,
        id: metric.id,
        delta: metric.delta,
        rating: metric.rating,
      });
    }
  });

  onLCP((metric) => {
    // Track Largest Contentful Paint
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "web_vitals", {
        event_category: "Web Vitals",
        event_label: "LCP",
        value: Math.round(metric.value),
        custom_map: { metric_id: metric.id },
        non_interaction: true,
      });
    }

    if (typeof window !== "undefined" && window.analytics) {
      window.analytics.track("Web Vitals", {
        metric: "LCP",
        value: metric.value,
        id: metric.id,
        delta: metric.delta,
        rating: metric.rating,
      });
    }
  });

  onTTFB((metric) => {
    // Track Time to First Byte
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "web_vitals", {
        event_category: "Web Vitals",
        event_label: "TTFB",
        value: Math.round(metric.value),
        custom_map: { metric_id: metric.id },
        non_interaction: true,
      });
    }

    if (typeof window !== "undefined" && window.analytics) {
      window.analytics.track("Web Vitals", {
        metric: "TTFB",
        value: metric.value,
        id: metric.id,
        delta: metric.delta,
        rating: metric.rating,
      });
    }
  });
}

// Performance observer for additional metrics
export function trackPerformanceMetrics() {
  if (typeof window === "undefined" || !window.PerformanceObserver) {
    return;
  }

  // Track long tasks
  try {
    const longTaskObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.duration > 50) {
          // Tasks longer than 50ms
          if (window.gtag) {
            window.gtag("event", "long_task", {
              event_category: "Performance",
              event_label: "Long Task",
              value: Math.round(entry.duration),
              non_interaction: true,
            });
          }
        }
      }
    });
    longTaskObserver.observe({ entryTypes: ["longtask"] });
  } catch (e) {
    // Long task API not supported
  }

  // Track largest contentful paint element
  try {
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1] as PerformanceEntry & {
        element?: Element;
      };

      if (lastEntry && window.gtag) {
        window.gtag("event", "lcp_element", {
          event_category: "Performance",
          event_label: lastEntry.element?.tagName || "unknown",
          value: Math.round(lastEntry.startTime),
          non_interaction: true,
        });
      }
    });
    lcpObserver.observe({ entryTypes: ["largest-contentful-paint"] });
  } catch (e) {
    // LCP API not supported
  }
}

// Initialize performance monitoring
export function initPerformanceMonitoring() {
  if (typeof window === "undefined") {
    return;
  }

  // Wait for page to be interactive before starting monitoring
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      setTimeout(() => {
        reportWebVitals();
        trackPerformanceMetrics();
      }, 1000);
    });
  } else {
    setTimeout(() => {
      reportWebVitals();
      trackPerformanceMetrics();
    }, 1000);
  }
}
