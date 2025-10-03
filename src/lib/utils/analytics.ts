// GA4 Analytics utility functions for Partners page

declare global {
  interface Window {
    gtag?: (command: string, targetId: string, config?: any) => void;
  }
}

export const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, {
      event_category: 'partners',
      ...parameters
    });
  }
};

// Specific event tracking functions for Partners page
export const trackApplyClick = (source: string) => {
  trackEvent('apply_click', {
    event_label: source,
    value: 1
  });
};

export const trackStartApplication = () => {
  trackEvent('start_application', {
    value: 1
  });
};

export const trackFormProgress = (step: number, totalSteps: number) => {
  trackEvent('form_progress', {
    event_label: `step_${step}_of_${totalSteps}`,
    value: step
  });
};

export const trackFormSubmit = (success: boolean, step?: number) => {
  trackEvent('form_submit', {
    event_label: success ? 'success' : 'error',
    value: success ? 1 : 0,
    step: step || 0
  });
};

export const trackUploadPdf = (fileSize: number) => {
  trackEvent('upload_pdf', {
    event_label: 'case_study_pdf',
    value: fileSize
  });
};

export const trackFaqExpand = (question: string) => {
  trackEvent('faq_expand', {
    event_label: question,
    value: 1
  });
};

export const trackExitBeforeSubmit = (step: number, timeSpent: number) => {
  trackEvent('exit_before_submit', {
    event_label: `step_${step}`,
    value: timeSpent
  });
};

export const trackSocialClick = (platform: string) => {
  trackEvent('social_click', {
    event_label: platform,
    value: 1
  });
};

export const trackScrollDepth = (depth: number) => {
  trackEvent('scroll_depth', {
    event_label: `${depth}%`,
    value: depth
  });
};
