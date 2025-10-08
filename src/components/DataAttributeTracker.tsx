'use client';

import { useEffect } from 'react';
import { trackEvent, saveUTMDataToSegment, trackPage } from '@/lib/utils/tracking';

let isDataAttributeTrackingInitialized = false;

/**
 * Automatic click tracking using data attributes
 *
 * Usage: Add data-event and other data-* attributes to any clickable element.
 * The tracker will automatically send events to Segment when clicked.
 *
 * Example - CTA Clicked:
 * <Button
 *   data-event="CTA Clicked"
 *   data-cta="Get Started"
 *   data-channel="webpage"
 *   data-text="Get Started for Free"
 * >
 *   Get Started for Free
 * </Button>
 *
 * Example - UI Interaction:
 * <Link
 *   data-event="UI Interaction"
 *   data-action="clicked"
 *   data-channel="webpage"
 *   data-element-id="nav-docs"
 *   data-namespace="header"
 * >
 *   Documentation
 * </Link>
 *
 * Note:
 * - data-event is required (becomes the event name)
 * - All other data-* attributes become event properties
 * - Follows IBM Segment Common Schema standards
 * - No onClick handler needed for tracking
 */
export function initializeDataAttributeTracking() {
  // Only run on client side and prevent duplicate initialization
  if (typeof window === 'undefined' || isDataAttributeTrackingInitialized) return;

  const handleClick = (event: Event) => {
    const target = event.target as HTMLElement;
    const trackingElement = target.closest('[data-event]') as HTMLElement;

    if (!trackingElement) return;

    const eventName = trackingElement.dataset.event;
    if (!eventName) return;

    // Extract all data-* attributes (except data-event itself)
    const properties: Record<string, any> = {};

    Object.keys(trackingElement.dataset).forEach(key => {
      if (key !== 'event') {
        // Map to IBM Segment property names (preserve exact casing per schema)
        let propertyKey = key;

        // Handle special IBM property mappings
        if (key === 'cta') propertyKey = 'CTA';
        else if (key === 'elementId') propertyKey = 'elementId';
        else if (key === 'topLevel') propertyKey = 'topLevel';
        else if (key === 'subLevel') propertyKey = 'subLevel';

        properties[propertyKey] = trackingElement.dataset[key];
      }
    });

    trackEvent(eventName, properties);
  };

  // Remove existing listener if it exists
  document.removeEventListener('click', handleClick);

  // Add the new listener
  document.addEventListener('click', handleClick);

  // Mark as initialized
  isDataAttributeTrackingInitialized = true;
}

export function DataAttributeTracker() {
  useEffect(() => {
    initializeDataAttributeTracking();
    saveUTMDataToSegment();

    // Track page view with friendly name after IBM common.js loads Segment
    const trackPageView = () => {
      if (window.analytics) {
        trackPage();
      } else {
        // Wait for Segment to load
        setTimeout(trackPageView, 100);
      }
    };

    // Start trying to track page view
    trackPageView();
  }, []);

  return null; // This component renders nothing
}
