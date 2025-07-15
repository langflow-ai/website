// Dependencies
import { SyntheticEvent } from "react";

// Types
import { Json } from "../types/definitions";
import { CustomWindow } from "../types/window";
import { LINKEDIN_DEFAULT_FORM_SUBMITTED_CONVERSION_ID } from "@/lib/utils/linkedin";

declare let window: CustomWindow;

/**
 * Track Homepage hero clicks
 *
 * @param {SyntheticEvent} event
 */
export function homepageHeroTracking(event: SyntheticEvent): void {
  event.preventDefault();
  const target = event.target as HTMLButtonElement;

  if (window.analytics) {
    trackEvent("www - Hero CTA Clicked", {
      cta: target.dataset.label,
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
  trackEvent("www - Workshop CTA Clicked", { name: name });
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
    const updatedPayload = {
      ...(payload?.label !== undefined && {
        event_label: payload?.label,
      }),
      ...(payload?.category !== undefined && {
        event_category: payload?.category,
      }),
      ...payload,
    };
    window.analytics.track(name, updatedPayload);
  }

  if (name.includes("Form Submitted")) {
    trackLinkedInEvent(LINKEDIN_DEFAULT_FORM_SUBMITTED_CONVERSION_ID);
    window.rdt && window.rdt("track", "Lead");
    // Event snippet for www_-_Form_Submitted conversion page
    window.gtag &&
      window.gtag("event", "conversion", {
        send_to: "AW-995363228/p-_QCNfuqM8aEJyT0NoD",
      });
  }
}

function getConsentGrantedState(
  consent: string,
  defaultValue: "granted" | "denied"
): "granted" | "denied" {
  if (window.ketchConsent) {
    const purposes = window.ketchConsent.purposes || {};
    return purposes[consent] === true ? "granted" : "denied";
  }

  return defaultValue;
}

export function addKetchConsentToContextMiddleware() {
  if (window.analytics) {
    window.analytics.addSourceMiddleware(({ payload, next }: any) => {
      if (window.ketchConsent) {
        payload.obj.properties = {
          ...(payload.obj.properties || {}),
          analyticsStorageConsentState: getConsentGrantedState(
            "analytics",
            "granted"
          ),
          adsStorageConsentState: getConsentGrantedState(
            "targeted_advertising",
            "granted"
          ),
          adUserDataConsentState: getConsentGrantedState(
            "targeted_advertising",
            "granted"
          ),
          adPersonalizationConsentState: getConsentGrantedState(
            "targeted_advertising",
            "granted"
          ),
        };
        payload.obj.context.consent = {
          categoryPreferences: window.ketchConsent?.purposes,
        };
      }
      next(payload);
    });
  }
}

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
