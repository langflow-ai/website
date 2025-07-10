'use client';

import { useEffect } from 'react';
import { trackEvent } from '@/lib/utils/tracking';

let isDataAttributeTrackingInitialized = false;

/**
 * Automatic click tracking using data attributes
 *
 * Usage: Add data-event and other data-* attributes to any clickable element.
 * The tracker will automatically send events to Segment when clicked.
 *
 * Example:
 * <Button
 *   data-event="Langflow.org - CTA Clicked"
 *   data-text="Get Started for Free"
 *   data-section="get-started"
 * >
 *   Get Started for Free
 * </Button>
 *
 * This will automatically call:
 * trackEvent("Langflow.org - CTA Clicked", {
 *   text: "Get Started for Free",
 *   section: "get-started"
 * })
 *
 * Note:
 * - data-event is required (becomes the event name)
 * - All other data-* attributes become event properties
 * - CamelCase is converted to snake_case (dataButtonType → button_type)
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
        // Convert camelCase to snake_case for consistency
        const snakeKey = key.replace(/([A-Z])/g, '_$1').toLowerCase();
        properties[snakeKey] = trackingElement.dataset[key];
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
  }, []);

  return null; // This component renders nothing
}
