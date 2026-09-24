import { AnalyticsEventType } from '../types/property';

declare global {
  interface Window {
    dataLayer?: Record<string, any>[];
  }
}

export function trackEvent(event: AnalyticsEventType, properties?: Record<string, any>) {
  const payload = {
    event,
    timestamp: new Date().toISOString(),
    ...properties,
  };

  // Push to GTM/GA4 dataLayer if available
  if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(payload);
  }

  // Developer logging (silent in production)
  if (process.env.NODE_ENV === 'development') {
    // Quiet debug
    console.debug(`[ProntoApto Analytics] ${event}`, properties);
  }
}
