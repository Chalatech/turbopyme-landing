import styled from '@emotion/styled'
import { keyframes } from '@emotion/react'
import SimpleAnimatedLogo from './SimpleAnimatedLogo'
import { trackCTA } from '../utils/analytics'

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


const HeroContainer = styled.section`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #f0f8ff 0%, #e8f6f5 100%);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 30% 80%, rgba(14, 123, 215, 0.05), transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(32, 178, 170, 0.05), transparent 50%);
  }
  
  @media (max-width: 768px) {
    padding: 1.5rem;
    min-height: 90vh;
  }
  
  @media (max-width: 480px) {
    padding: 1rem;
    min-height: 85vh;
  }
`

const LogoContainer = styled.div`
  z-index: 2;
  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    margin-bottom: 1rem;
  }
  
  @media (max-width: 480px) {
    margin-bottom: 0.75rem;
  }
`

const BrandName = styled.h1`
  font-size: 4rem;
  color: #0e7bd7;
  text-align: center;
  margin-bottom: 2rem;
  animation: ${fadeIn} 1s ease-out 0.2s both;
  font-weight: 700;
  text-shadow: 2px 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 2;
  letter-spacing: -0.02em;
  
  @media (max-width: 768px) {
    font-size: 3rem;
    margin-bottom: 1.5rem;
  }
  
  @media (max-width: 480px) {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }
`

const Title = styled.h2`
  font-size: 2.5rem;
  color: #082a54;
  text-align: center;
  margin-bottom: 1rem;
  animation: ${fadeIn} 1s ease-out 0.4s both;
  text-shadow: 1px 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 2;
  font-weight: 600;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.8rem;
  }
`

const Subtitle = styled.p`
  font-size: 1.5rem;
  color: #4a5568;
  text-align: center;
  margin-bottom: 3rem;
  animation: ${fadeIn} 1s ease-out 0.6s both;
  z-index: 2;
  max-width: 600px;
  line-height: 1.6;
  font-weight: 400;
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.1rem;
    max-width: 90%;
  }
`

const CTAButton = styled.button`
  background: #0e7bd7;
  color: white;
  border: none;
  padding: 1.2rem 3rem;
  font-size: 1.2rem;
  font-weight: 600;
  border-radius: 50px;
  cursor: pointer;
  animation: ${fadeIn} 1s ease-out 0.8s both;
  transition: all 0.3s ease;
  box-shadow: 0 8px 25px rgba(14, 123, 215, 0.3);
  z-index: 2;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 35px rgba(14, 123, 215, 0.4);
    background: #1e8be7;
  }
  
  &:active {
    transform: translateY(-1px);
  }
  
  @media (max-width: 768px) {
    padding: 1rem 2.5rem;
    font-size: 1.1rem;
  }
  
  @media (max-width: 480px) {
    padding: 0.9rem 2rem;
    font-size: 1rem;
  }
`

const LoginButton = styled.a`
  background: transparent;
  color: #0e7bd7;
  border: 2px solid #0e7bd7;
  padding: 1.2rem 3rem;
  font-size: 1.2rem;
  font-weight: 600;
  border-radius: 50px;
  cursor: pointer;
  animation: ${fadeIn} 1s ease-out 0.9s both;
  transition: all 0.3s ease;
  z-index: 2;
  text-decoration: none;
  display: inline-block;
  margin-left: 1rem;
  
  &:hover {
    background: #0e7bd7;
    color: white;
    border-color: transparent;
    transform: translateY(-3px);
    box-shadow: 0 12px 35px rgba(14, 123, 215, 0.4);
  }
  
  &:active {
    transform: translateY(-1px);
  }
  
  @media (max-width: 768px) {
    padding: 1rem 2.5rem;
    font-size: 1.1rem;
    margin-left: 0;
    margin-top: 1rem;
  }
  
  @media (max-width: 480px) {
    padding: 0.9rem 2rem;
    font-size: 1rem;
  }
`

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  z-index: 2;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0;
    padding-bottom: 60px; /* Add space to avoid overlap with scroll indicator */
  }

  @media (max-width: 480px) {
    padding-bottom: 70px; /* More space on smaller screens */
  }
`

const ScrollIndicator = styled.div`
  position: absolute;
  bottom: 30px;
  transform: translateX(-50%);
  animation: ${fadeIn} 1s ease-out 1s both;

  &::after {
    content: '';
    display: block;
    width: 24px;
    height: 24px;
    border: 2px solid #0e7bd7;
    border-top: none;
    border-left: none;
    transform: rotate(45deg) translateX(-3px);
    opacity: 0.7;
    margin: 0 auto;
  }
`

const Hero = () => {

  const scrollToPlans = () => {
    trackCTA('hero_pricing_button', { section: 'hero', action: 'scroll_to_plans' })
    const plansSection = document.getElementById('pricing-plans')
    plansSection?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleLoginClick = () => {
    trackCTA('hero_login_button', { section: 'hero', action: 'external_login' })
  }

  const loginUrl = import.meta.env.VITE_LOGIN_URL || 'https://test.turbopyme.com'

  return (
    <HeroContainer>
      <LogoContainer>
        <SimpleAnimatedLogo width={280} height={280} />
      </LogoContainer>
      <BrandName>TurboPyme</BrandName>
      <Title>Facturación Electrónica Inteligente</Title>
      <Subtitle>
        La plataforma más completa para automatizar tu facturación con Hacienda.
        Simple, rápida y confiable.
      </Subtitle>
      <ButtonContainer>
        <CTAButton onClick={scrollToPlans}>
          Ver Planes y Precios
        </CTAButton>
        <LoginButton href={loginUrl} target="_blank" rel="noopener noreferrer" onClick={handleLoginClick}>
          Iniciar Sesión
        </LoginButton>
      </ButtonContainer>
      <ScrollIndicator />
    </HeroContainer>
  )
}

export default Hero