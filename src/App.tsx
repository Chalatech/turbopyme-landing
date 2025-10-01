import { css, Global } from '@emotion/react'
import styled from '@emotion/styled'
import { useEffect, useState } from 'react'
import Hero from './components/Hero'
import PricingPlans from './components/PricingPlans'
import Features from './components/Features'
import ContactForm from './components/ContactForm'
import Footer from './components/Footer'
import leadsAPI from './utils/leads'
import analytics, { trackPageView } from './utils/analytics'

const GlobalStyles = css`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: linear-gradient(135deg, #e6f3ff 0%, #d9f2f0 100%);
    min-height: 100vh;
  }

  html {
    scroll-behavior: smooth;
  }
`

const AppContainer = styled.div`
  min-height: 100vh;
  position: relative;
`

function App() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)

  useEffect(() => {
    // Track initial page view
    trackPageView()
  }, [])

  const handleLeadSubmit = async (leadData: Parameters<typeof leadsAPI.submitLead>[0]) => {
    const result = await leadsAPI.submitLead(leadData)
    return result.success
  }

  const handleTrackEvent = (eventName: string, data: Record<string, unknown>) => {
    analytics.track(eventName, data)
  }

  const handlePlanSelect = (planName: string) => {
    setSelectedPlan(planName)
    // Scroll to contact form
    const contactSection = document.getElementById('contact')
    contactSection?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <Global styles={GlobalStyles} />
      <AppContainer>
        <Hero />
        <Features />
        <PricingPlans onPlanSelect={handlePlanSelect} />
        <ContactForm
          onSubmit={handleLeadSubmit}
          onTrackEvent={handleTrackEvent}
          selectedPlan={selectedPlan}
          onPlanProcessed={() => setSelectedPlan(null)}
        />
        <Footer />
      </AppContainer>
    </>
  )
}

export default App
