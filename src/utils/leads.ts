interface LeadData {
  firstName: string
  lastName: string
  email: string
  phone?: string
  company?: string
  message: string
}

interface LeadsConfig {
  submitUrl: string
  timeout?: number
}

class LeadsAPI {
  private config: LeadsConfig

  constructor(config: LeadsConfig) {
    this.config = {
      timeout: 10000, // 10 second default timeout
      ...config
    }
  }

  /**
   * Submit a lead to the API
   */
  async submitLead(leadData: LeadData): Promise<{ success: boolean; message?: string; data?: unknown }> {
    try {
      // Validate required fields
      const requiredFields = ['firstName', 'lastName', 'email']
      const missingFields = requiredFields.filter(field => !leadData[field as keyof LeadData])
      
      if (missingFields.length > 0) {
        throw new Error(`Missing required fields: ${missingFields.join(', ')}`)
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(leadData.email)) {
        throw new Error('Invalid email format')
      }

      // Prepare the payload
      const payload = {
        name: `${leadData.firstName.trim()} ${leadData.lastName.trim()}`,
        email: leadData.email.trim().toLowerCase(),
        company: leadData.company?.trim() || "",
        phone: leadData.phone?.trim() || "",
        message: leadData.message?.trim() || ""
      }

      // Create abort controller for timeout
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), this.config.timeout)

      const response = await fetch(this.config.submitUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
        signal: controller.signal
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
      }

      const result = await response.json()
      
      return {
        success: true,
        message: result.message || 'Lead submitted successfully',
        data: result
      }

    } catch (error) {
      console.error('Lead submission failed:', error)
      
      // Handle different types of errors
      let errorMessage = 'Failed to submit lead. Please try again.'
      
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          errorMessage = 'Request timed out. Please check your connection and try again.'
        } else if (error.message.includes('fetch')) {
          errorMessage = 'Network error. Please check your connection and try again.'
        } else {
          errorMessage = error.message
        }
      }

      return {
        success: false,
        message: errorMessage
      }
    }
  }

  /**
   * Validate lead data before submission
   */
  validateLead(leadData: Partial<LeadData>): { isValid: boolean; errors: string[] } {
    const errors: string[] = []

    // Required field validation
    if (!leadData.firstName?.trim()) errors.push('First name is required')
    if (!leadData.lastName?.trim()) errors.push('Last name is required')
    if (!leadData.email?.trim()) errors.push('Email is required')

    // Email format validation
    if (leadData.email?.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(leadData.email.trim())) {
        errors.push('Please enter a valid email address')
      }
    }

    // Phone validation (if provided)
    if (leadData.phone?.trim()) {
      const phoneRegex = /^[+]?[0-9\s\-()]+$/
      if (!phoneRegex.test(leadData.phone.trim())) {
        errors.push('Please enter a valid phone number')
      }
    }

    // Message length validation
    if (leadData.message?.trim() && leadData.message.trim().length < 10) {
      errors.push('Message must be at least 10 characters long')
    }

    return {
      isValid: errors.length === 0,
      errors
    }
  }

  /**
   * Get business types for the form
   */
  getBusinessTypes(): { value: string; label: string }[] {
    return [
      { value: 'retail', label: 'Comercio / Retail' },
      { value: 'services', label: 'Servicios' },
      { value: 'restaurant', label: 'Restaurante / Bar' },
      { value: 'manufacturing', label: 'Manufactura' },
      { value: 'healthcare', label: 'Salud' },
      { value: 'education', label: 'Educación' },
      { value: 'technology', label: 'Tecnología' },
      { value: 'other', label: 'Otro' }
    ]
  }
}

// Create and export leads API instance
const leadsAPI = new LeadsAPI({
  submitUrl: 'https://chala-flow-887539836693.us-central1.run.app/api/leads/contact/turbopyme-com',
  timeout: 15000 // 15 seconds for lead submission
})

export default leadsAPI
export type { LeadData }