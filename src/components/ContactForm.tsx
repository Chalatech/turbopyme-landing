import React, { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import { keyframes } from '@emotion/react'

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const ContactContainer = styled.section`
  padding: 5rem 2rem;
  background: linear-gradient(135deg, #f8fbff 0%, #e8f6f5 100%);
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 70% 20%, rgba(14, 123, 215, 0.03), transparent 50%),
                radial-gradient(circle at 30% 80%, rgba(32, 178, 170, 0.03), transparent 50%);
  }
  
  @media (max-width: 768px) {
    padding: 3rem 1.5rem;
  }
  
  @media (max-width: 480px) {
    padding: 2rem 1rem;
  }
`

const FormWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
`

const Title = styled.h2`
  font-size: 2.5rem;
  color: #082a54;
  text-align: center;
  margin-bottom: 1rem;
  animation: ${fadeIn} 1s ease-out;
  font-weight: 700;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.8rem;
  }
`

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #4a5568;
  text-align: center;
  margin-bottom: 3rem;
  animation: ${fadeIn} 1s ease-out 0.2s both;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
    margin-bottom: 2.5rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1rem;
    margin-bottom: 2rem;
  }
`

const Form = styled.form`
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 3rem;
  box-shadow: 0 20px 60px rgba(14, 123, 215, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  animation: ${fadeIn} 1s ease-out 0.4s both;
  
  @media (max-width: 768px) {
    padding: 2rem;
  }
  
  @media (max-width: 480px) {
    padding: 1.5rem;
  }
`

const FormRow = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`

const FormGroup = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`

const Label = styled.label`
  font-size: 0.95rem;
  font-weight: 600;
  color: #082a54;
  margin-bottom: 0.5rem;
`

const Input = styled.input`
  padding: 1rem 1.2rem;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.9);
  color: #2d3748;
  font-weight: 500;
  
  &:focus {
    outline: none;
    border-color: #0e7bd7;
    box-shadow: 0 0 0 3px rgba(14, 123, 215, 0.1);
    background: rgba(255, 255, 255, 1);
    color: #1a202c;
  }
  
  &::placeholder {
    color: #a0aec0;
  }
  
  /* Fix autofill styling */
  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    -webkit-box-shadow: 0 0 0 30px rgba(255, 255, 255, 0.9) inset !important;
    -webkit-text-fill-color: #2d3748 !important;
    background-color: rgba(255, 255, 255, 0.9) !important;
    color: #2d3748 !important;
    transition: background-color 5000s ease-in-out 0s;
  }
  
  /* Firefox autofill */
  &:-moz-autofill {
    background-color: rgba(255, 255, 255, 0.9) !important;
    color: #2d3748 !important;
  }
`

const TextArea = styled.textarea`
  padding: 1rem 1.2rem;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.9);
  min-height: 120px;
  resize: vertical;
  font-family: inherit;
  color: #2d3748;
  font-weight: 500;
  
  &:focus {
    outline: none;
    border-color: #0e7bd7;
    box-shadow: 0 0 0 3px rgba(14, 123, 215, 0.1);
    background: rgba(255, 255, 255, 1);
    color: #1a202c;
  }
  
  &::placeholder {
    color: #a0aec0;
  }
`


const SubmitButton = styled.button`
  background: #0e7bd7;
  color: white;
  border: none;
  padding: 1.2rem 3rem;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 8px 25px rgba(14, 123, 215, 0.3);
  width: 100%;
  margin-top: 1rem;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 35px rgba(14, 123, 215, 0.4);
    background: #1e8be7;
  }
  
  &:active {
    transform: translateY(-1px);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`

const StatusMessage = styled.div<{ type: 'success' | 'error' }>`
  padding: 1rem 1.5rem;
  border-radius: 50px;
  margin-top: 1rem;
  font-weight: 500;
  background: ${props => props.type === 'success' 
    ? 'rgba(72, 187, 120, 0.1)' 
    : 'rgba(245, 101, 101, 0.1)'};
  color: ${props => props.type === 'success' ? '#2f855a' : '#c53030'};
  border: 1px solid ${props => props.type === 'success' 
    ? 'rgba(72, 187, 120, 0.2)' 
    : 'rgba(245, 101, 101, 0.2)'};
`

interface ContactFormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  company: string
  message: string
}

interface ContactFormProps {
  onSubmit?: (data: ContactFormData) => Promise<boolean>
  onTrackEvent?: (eventName: string, data: Record<string, unknown>) => void
  selectedPlan?: string | null
  onPlanProcessed?: () => void
}

const ContactForm: React.FC<ContactFormProps> = ({ onSubmit, onTrackEvent, selectedPlan, onPlanProcessed }) => {
  const [formData, setFormData] = useState<ContactFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null)

  // Pre-fill message when a plan is selected
  useEffect(() => {
    if (selectedPlan) {
      setFormData(prev => ({
        ...prev,
        message: `Hola, me interesa el plan ${selectedPlan} para mi empresa. Me gustaría obtener más información sobre este plan y el proceso de implementación.`
      }))
      // Mark the plan as processed
      onPlanProcessed?.()
    }
  }, [selectedPlan, onPlanProcessed])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setStatus(null)

    try {
      // Track form submission attempt
      onTrackEvent?.('contact_form_submitted', {
        hasCompany: !!formData.company,
        timestamp: new Date().toISOString()
      })

      const success = onSubmit ? await onSubmit(formData) : true

      if (success) {
        setStatus({ type: 'success', message: '¡Gracias por contactarnos! Te responderemos pronto.' })
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          company: '',
          message: ''
        })
        
        // Track successful submission
        onTrackEvent?.('contact_form_success', {
          timestamp: new Date().toISOString()
        })
      } else {
        setStatus({ type: 'error', message: 'Hubo un error al enviar el mensaje. Por favor intenta nuevamente.' })
        onTrackEvent?.('contact_form_error', { timestamp: new Date().toISOString() })
      }
    } catch (error) {
      setStatus({ type: 'error', message: 'Hubo un error al enviar el mensaje. Por favor intenta nuevamente.' })
      onTrackEvent?.('contact_form_error', { 
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <ContactContainer id="contact">
      <FormWrapper>
        <Title>Contáctanos</Title>
        <Subtitle>
          ¿Listo para simplificar tu facturación? Cuéntanos sobre tu negocio y te ayudaremos a elegir el plan perfecto.
        </Subtitle>
        
        <Form onSubmit={handleSubmit}>
          <FormRow>
            <FormGroup>
              <Label htmlFor="firstName">Nombre *</Label>
              <Input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Tu nombre"
                required
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="lastName">Apellidos *</Label>
              <Input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Tus apellidos"
                required
              />
            </FormGroup>
          </FormRow>

          <FormRow>
            <FormGroup>
              <Label htmlFor="email">Correo Electrónico *</Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="tu@email.com"
                required
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="phone">Teléfono</Label>
              <Input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+503 1234-5678"
              />
            </FormGroup>
          </FormRow>

          <FormGroup>
            <Label htmlFor="company">Empresa</Label>
            <Input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Nombre de tu empresa"
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="message">Mensaje</Label>
            <TextArea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Cuéntanos sobre tu negocio y cómo podemos ayudarte con la facturación electrónica..."
            />
          </FormGroup>

          <SubmitButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
          </SubmitButton>

          {status && (
            <StatusMessage type={status.type}>
              {status.message}
            </StatusMessage>
          )}
        </Form>
      </FormWrapper>
    </ContactContainer>
  )
}

export default ContactForm