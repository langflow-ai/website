"use client";

import { useEffect } from "react";

const PartnersAnalytics = () => {
  useEffect(() => {
    // Track page view for Partners page
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "page_view", {
        page_title: "Langflow Partner Program",
        page_location: window.location.href,
        page_path: "/partners",
        content_group: "Partners",
      });
    }

    // Track scroll depth for engagement
    let maxScroll = 0;
    const trackScrollDepth = () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      );
      
      if (scrollPercent > maxScroll) {
        maxScroll = scrollPercent;
        
        // Track milestone scroll depths
        if (maxScroll >= 25 && maxScroll < 50) {
          window.gtag?.("event", "scroll", {
            event_category: "Engagement",
            event_label: "Partners - 25%",
            value: 25,
          });
        } else if (maxScroll >= 50 && maxScroll < 75) {
          window.gtag?.("event", "scroll", {
            event_category: "Engagement",
            event_label: "Partners - 50%",
            value: 50,
          });
        } else if (maxScroll >= 75 && maxScroll < 90) {
          window.gtag?.("event", "scroll", {
            event_category: "Engagement",
            event_label: "Partners - 75%",
            value: 75,
          });
        } else if (maxScroll >= 90) {
          window.gtag?.("event", "scroll", {
            event_category: "Engagement",
            event_label: "Partners - 90%",
            value: 90,
          });
        }
      }
    };

    // Track form interactions
    const trackFormInteraction = (action: string, element: string) => {
      window.gtag?.("event", "form_interaction", {
        event_category: "Partners Form",
        event_label: `${action} - ${element}`,
        value: 1,
      });
    };

    // Add scroll listener
    window.addEventListener("scroll", trackScrollDepth);

    // Track form field interactions
    const formFields = document.querySelectorAll('input, textarea, select');
    formFields.forEach(field => {
      field.addEventListener('focus', () => {
        trackFormInteraction('focus', field.getAttribute('name') || 'unknown');
      });
      
      field.addEventListener('blur', () => {
        trackFormInteraction('blur', field.getAttribute('name') || 'unknown');
      });
    });

    // Track button clicks
    const buttons = document.querySelectorAll('button[data-attr]');
    buttons.forEach(button => {
      button.addEventListener('click', () => {
        const attr = button.getAttribute('data-attr');
        window.gtag?.("event", "click", {
          event_category: "Partners CTA",
          event_label: attr,
          value: 1,
        });
      });
    });

    // Cleanup
    return () => {
      window.removeEventListener("scroll", trackScrollDepth);
    };
  }, []);

  return null;
};

export default PartnersAnalytics;
