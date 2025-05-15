"use client"

type EventName =
  | "page_view"
  | "instrument_change"
  | "tuning_change"
  | "mode_change"
  | "reference_freq_change"
  | "play_tone"
  | "microphone_start"
  | "microphone_stop"
  | "microphone_error"
  | "note_detected"
  | "audio_toggle"
  | "simulate_strum"

type EventProperties = Record<string, string | number | boolean>

// Default to true, but will be updated based on user consent
let analyticsConsent = true

// Initialize consent from localStorage if available
if (typeof window !== "undefined") {
  try {
    const storedConsent = localStorage.getItem("analytics_consent")
    if (storedConsent !== null) {
      analyticsConsent = storedConsent === "true"
    }
  } catch (e) {
    // Ignore localStorage errors
    console.error("Error accessing localStorage:", e)
  }
}

/**
 * Set user consent for analytics and store in localStorage
 */
export function setAnalyticsConsent(consent: boolean): void {
  analyticsConsent = consent
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem("analytics_consent", String(consent))
    } catch (e) {
      // Ignore localStorage errors
      console.error("Error writing to localStorage:", e)
    }
  }
}

/**
 * Get current analytics consent status
 */
export function getAnalyticsConsent(): boolean {
  return analyticsConsent
}

/**
 * Track an event with optional properties
 */
export function trackEvent(eventName: EventName, properties: EventProperties = {}): void {
  // Don't track if user has opted out
  if (!analyticsConsent) {
    return
  }

  // Add timestamp to all events
  const eventWithTimestamp = {
    ...properties,
    timestamp: new Date().toISOString(),
  }

  // Track with Vercel Analytics if available
  if (typeof window !== "undefined" && window.va) {
    try {
      window.va.track(eventName, eventWithTimestamp)
    } catch (e) {
      // Ignore tracking errors
      console.error("Error tracking event:", e)
    }
  }

  // Log events in development
  if (process.env.NODE_ENV === "development") {
    console.log(`[Analytics] ${eventName}`, eventWithTimestamp)
  }
}

// Add type definition for Vercel Analytics
declare global {
  interface Window {
    va?: {
      track: (eventName: string, properties?: Record<string, unknown>) => void
    }
  }
}
