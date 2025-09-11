interface EventData {
  [key: string]: unknown
}

interface AnalyticsConfig {
  trackingUrl: string
  debug?: boolean
}

class Analytics {
  private config: AnalyticsConfig
  private isEnabled: boolean = true

  constructor(config: AnalyticsConfig) {
    this.config = config
    
    // Disable analytics in development if debug is false
    if (import.meta.env.DEV && !config.debug) {
      this.isEnabled = false
    }
  }

  /**
   * Map internal event names to API enum values
   */
  private mapEventType(eventName: string): string {
    const eventMapping: { [key: string]: string } = {
      'page_view': 'view',
      'click': 'click', 
      'button_click': 'click',
      'cta_click': 'click',
      'form_submit': 'form_submit',
      'contact_form_submitted': 'form_submit',
      'contact_form_success': 'form_submit',
      'contact_form_error': 'form_submit',
      'conversion': 'click',
      'error': 'view'
    }
    
    return eventMapping[eventName] || 'view'
  }

  /**
   * Track an event
   */
  async track(eventName: string, data: EventData = {}): Promise<boolean> {
    if (!this.isEnabled) {
      console.log(`[Analytics Debug] ${eventName}:`, data)
      return true
    }

    try {
      const payload = {
        eventType: this.mapEventType(eventName),
        ...data,
        timestamp: new Date().toISOString(),
        url: window.location.href,
        referrer: document.referrer,
        userAgent: navigator.userAgent,
        screen: {
          width: window.screen.width,
          height: window.screen.height
        },
        viewport: {
          width: window.innerWidth,
          height: window.innerHeight
        }
      }

      const response = await fetch(this.config.trackingUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      if (this.config.debug) {
        console.log(`[Analytics] Event tracked: ${eventName}`, payload)
      }

      return true
    } catch (error) {
      console.error('Analytics tracking failed:', error)
      return false
    }
  }

  /**
   * Track page views
   */
  async trackPageView(page?: string): Promise<boolean> {
    return this.track('page_view', {
      page: page || window.location.pathname,
      title: document.title
    })
  }

  /**
   * Track user interactions
   */
  async trackClick(element: string, data: EventData = {}): Promise<boolean> {
    return this.track('click', {
      element,
      ...data
    })
  }

  /**
   * Track form submissions
   */
  async trackFormSubmit(formName: string, data: EventData = {}): Promise<boolean> {
    return this.track('form_submit', {
      form: formName,
      ...data
    })
  }

  /**
   * Track button clicks
   */
  async trackButton(buttonName: string, data: EventData = {}): Promise<boolean> {
    return this.track('button_click', {
      button: buttonName,
      ...data
    })
  }

  /**
   * Track CTA interactions
   */
  async trackCTA(ctaName: string, data: EventData = {}): Promise<boolean> {
    return this.track('cta_click', {
      cta: ctaName,
      ...data
    })
  }

  /**
   * Track conversions
   */
  async trackConversion(conversionType: string, data: EventData = {}): Promise<boolean> {
    return this.track('conversion', {
      type: conversionType,
      ...data
    })
  }

  /**
   * Track errors
   */
  async trackError(error: Error | string, data: EventData = {}): Promise<boolean> {
    const errorData = typeof error === 'string' 
      ? { message: error }
      : {
          message: error.message,
          stack: error.stack,
          name: error.name
        }

    return this.track('error', {
      ...errorData,
      ...data
    })
  }

  /**
   * Enable or disable tracking
   */
  setEnabled(enabled: boolean): void {
    this.isEnabled = enabled
  }

  /**
   * Check if tracking is enabled
   */
  isTrackingEnabled(): boolean {
    return this.isEnabled
  }
}

// Create and export analytics instance
const analytics = new Analytics({
  trackingUrl: 'https://chala-flow-887539836693.us-central1.run.app/api/analytics/track/turbopyme-com',
  debug: import.meta.env.DEV
})

export default analytics

// Export convenience functions
export const trackEvent = (eventName: string, data?: EventData) => analytics.track(eventName, data)
export const trackPageView = (page?: string) => analytics.trackPageView(page)
export const trackClick = (element: string, data?: EventData) => analytics.trackClick(element, data)
export const trackFormSubmit = (formName: string, data?: EventData) => analytics.trackFormSubmit(formName, data)
export const trackButton = (buttonName: string, data?: EventData) => analytics.trackButton(buttonName, data)
export const trackCTA = (ctaName: string, data?: EventData) => analytics.trackCTA(ctaName, data)
export const trackConversion = (conversionType: string, data?: EventData) => analytics.trackConversion(conversionType, data)
export const trackError = (error: Error | string, data?: EventData) => analytics.trackError(error, data)