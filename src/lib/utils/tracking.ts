// Dependencies
import { SyntheticEvent } from "react";

// Types
import { Json } from "../types/definitions";
import { CustomWindow } from "../types/window";
import { LINKEDIN_DEFAULT_FORM_SUBMITTED_CONVERSION_ID } from "@/lib/utils/linkedin";

declare let window: CustomWindow;

/**
 * IBM Segment Common Properties
 * Required properties that must be included with all Segment events
 */
export const SEGMENT_COMMON_PROPERTIES = {
  productTitle: "IBM Elite Support for Langflow",
  productCode: "5900BUB",
  productCodeType: "WWPC",
  UT30: "30AS5",
  instanceId: "marketing-site",
  subscriptionId: "public-access",
  productPlanName: "Public",
  productPlanType: "freemium",
  userId: "IBMid-ANONYMOUS",
} as const;

/**
 * Track Homepage hero clicks
 *
 * @param {SyntheticEvent} event
 */
export function homepageHeroTracking(event: SyntheticEvent): void {
  event.preventDefault();
  const target = event.target as HTMLButtonElement;

  if (window.analytics) {
    trackEvent("CTA Clicked", {
      CTA: target.dataset.label,
      channel: "webpage",
      location: "hero",
    });
  }

  window.open(target.dataset.href, target.dataset.target);
}

/**
 * Track Workshop registration clicks.
 *
 * @param {SyntheticEvent} event
 * @param {String}         name
 */
export function workshopRegistrationTracking(
  event: SyntheticEvent,
  name: string
): void {
  event.preventDefault();
  const target = event.target as HTMLAnchorElement;
  trackEvent("CTA Clicked", {
    CTA: "Register for Workshop",
    channel: "webpage",
    workshopName: name,
  });
  window.location.href = target.href;
}

/**
 * Track clicks.
 *
 * @param {SyntheticEvent} event
 * @param {String}         eventLabel
 * @param {String}         properties
 */
export function clickTracking(
  event: SyntheticEvent,
  eventLabel: string,
  properties: Json
): void {
  event.preventDefault();
  const target = event.target as HTMLAnchorElement;
  trackEvent(eventLabel, properties);
  window.location.href = target.href;
}

/**
 * Get data from URL params and send them to mixpanel.
 */
export const saveSourceDataToMixpanel = () => {
  if (window.mixpanel) {
    try {
      const urlParams: URLSearchParams = new URLSearchParams(
        window.location.search
      );
      const utmSource = urlParams.get("utm_source");
      const utmMedium = urlParams.get("utm_medium");
      const utmCampaign = urlParams.get("utm_campaign");
      const utmContent = urlParams.get("utm_content");
      const utmTerm = urlParams.get("utm_term");
      const gclid = urlParams.get("gclid");

      const params: any = (type: "first" | "last") => {
        return {
          [`utm_source [${type} touch]`]: utmSource,
          [`utm_medium [${type} touch]`]: utmMedium,
          [`utm_campaign [${type} touch]`]: utmCampaign,
          [`utm_content [${type} touch]`]: utmContent,
          [`utm_term [${type} touch]`]: utmTerm,
          [`gclid [${type} touch]`]: gclid,
        };
      };

      window.mixpanel.people.set(params("last"));
      window.mixpanel.people.set_once(params("first"));
      window.mixpanel.register(params("last"));
    } catch (e) {
      console.error(
        `Mixpanel error: ${JSON.stringify(e, Object.getOwnPropertyNames(e))}`
      );
    }
  }
};

export function throwIfSSR() {
  throw new Error("Using GA during SSR is not allowed");
}

export function gaHandler(...args: any[]) {
  const dataLayer = ((window as any).dataLayer =
    (window as any).dataLayer || []);

  dataLayer.push(args);
}

export function trackEvent(name: string, payload?: Record<string, unknown>) {
  if (typeof window === "undefined") {
    return; // Exit early during SSR
  }

  if (window.analytics) {
    // IBM requires identify() call before track events
    // Exclude productPlanName and productPlanType from identify traits
    const { productPlanName, productPlanType, ...identifyTraits } = SEGMENT_COMMON_PROPERTIES;
    window.analytics.identify(SEGMENT_COMMON_PROPERTIES.userId, identifyTraits);

    // Get current UTM parameters for attribution
    const urlParams = new URLSearchParams(window.location.search);
    const utmData: Record<string, string | null> = {
      utm_source: urlParams.get("utm_source"),
      utm_medium: urlParams.get("utm_medium"),
      utm_campaign: urlParams.get("utm_campaign"),
      utm_content: urlParams.get("utm_content"),
      utm_term: urlParams.get("utm_term"),
    };

    // Remove null UTM values
    const cleanedUtmData = Object.fromEntries(
      Object.entries(utmData).filter(([_, value]) => value !== null)
    );

    // For UI Interaction events, exclude userId from properties
    let commonProperties = SEGMENT_COMMON_PROPERTIES;
    if (name === "UI Interaction") {
      const { userId, ...propertiesWithoutUserId } = SEGMENT_COMMON_PROPERTIES;
      commonProperties = propertiesWithoutUserId as typeof SEGMENT_COMMON_PROPERTIES;
    }

    const updatedPayload = {
      ...(payload?.label !== undefined && {
        event_label: payload?.label,
      }),
      ...(payload?.category !== undefined && {
        event_category: payload?.category,
      }),
      ...payload,
      ...cleanedUtmData,
      ...commonProperties,
    };

    window.analytics.track(name, updatedPayload);
  }

  if (name.includes("Form Submitted")) {
    trackLinkedInEvent(LINKEDIN_DEFAULT_FORM_SUBMITTED_CONVERSION_ID);
    // Event snippet for www_-_Form_Submitted conversion page
    window.gtag &&
      window.gtag("event", "conversion", {
        send_to: "AW-995363228/p-_QCNfuqM8aEJyT0NoD",
      });
  }
}

// IBM TrustArc consent is now handled by IBM common.js
// No additional middleware needed as consent is managed at the IBM level

export function checkLinkByHref(
  validHrefs: { [key: string]: any },
  href: string
) {
  Object.keys(validHrefs).every((targetHref: string) => {
    if (href.endsWith(targetHref)) {
      const foundHref = validHrefs[targetHref];
      trackEvent(foundHref.action, foundHref.payload);
      return false;
    } else {
      return true;
    }
  });
}

export function checkLinkByParentId(
  validParents: { [key: string]: any },
  target: HTMLElement
) {
  Object.keys(validParents).every((parentId: string) => {
    let currentElement: HTMLElement | null = target;
    while (currentElement && currentElement.id !== parentId) {
      currentElement = currentElement.parentElement;
    }
    if (currentElement) {
      const foundParent = validParents[parentId];
      trackEvent(foundParent.action, foundParent.payload);
      return false;
    } else {
      return true;
    }
  });
}

export const trackLinkedInEvent = (conversionId: number) => {
  if (window.lintrk) {
    window.lintrk("track", { conversion_id: conversionId });
  }
};

/**
 * Track page view with friendly name
 * IBM requires page events to have a friendly "page" property
 */
export function trackPage(pageName?: string) {
  if (typeof window === "undefined") {
    return; // Exit early during SSR
  }

  if (window.analytics) {
    // IBM requires identify() call before page events
    // Exclude productPlanName and productPlanType from identify traits
    const { productPlanName, productPlanType, userId, ...identifyTraits } = SEGMENT_COMMON_PROPERTIES;
    window.analytics.identify(SEGMENT_COMMON_PROPERTIES.userId, identifyTraits);

    // Get friendly page name from title or pathname
    const friendlyName = pageName || document.title.split('|')[0].trim();

    // Exclude userId from page properties (only needed in track events)
    const pageProperties = identifyTraits;

    window.analytics.page(friendlyName, {
      ...pageProperties,
      path: window.location.pathname,
      url: window.location.href,
      title: document.title,
    });
  }
}

/**
 * Get UTM parameters from URL and send them to Segment.
 */
export const saveUTMDataToSegment = () => {
  if (typeof window === "undefined") {
    return; // Exit early during SSR
  }

  if (window.analytics) {
    try {
      const urlParams: URLSearchParams = new URLSearchParams(
        window.location.search
      );
      const utmSource = urlParams.get("utm_source");
      const utmMedium = urlParams.get("utm_medium");
      const utmCampaign = urlParams.get("utm_campaign");
      const utmContent = urlParams.get("utm_content");
      const utmTerm = urlParams.get("utm_term");
      const gclid = urlParams.get("gclid");

      // Only track if we have UTM parameters
      if (utmSource || utmMedium || utmCampaign || utmContent || utmTerm || gclid) {
        const utmData: Record<string, string | null> = {
          utm_source: utmSource,
          utm_medium: utmMedium,
          utm_campaign: utmCampaign,
          utm_content: utmContent,
          utm_term: utmTerm,
          gclid: gclid,
        };

        // Remove null values
        const cleanedUtmData = Object.fromEntries(
          Object.entries(utmData).filter(([_, value]) => value !== null)
        );

        // Set UTM parameters as user traits for attribution
        window.analytics.identify(null, cleanedUtmData);
      }
    } catch (e) {
      console.error(
        `Segment UTM tracking error: ${JSON.stringify(e, Object.getOwnPropertyNames(e))}`
      );
    }
  }
};
