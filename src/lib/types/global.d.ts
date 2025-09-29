// Global type declarations for window objects

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    analytics?: {
      track: (event: string, properties?: Record<string, any>) => void;
      page: (name: string, properties?: Record<string, any>) => void;
      identify: (userId: string | null, traits?: Record<string, any>) => void;
    };
  }
}

export {};
