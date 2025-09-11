import styled from '@emotion/styled'
import { keyframes } from '@emotion/react'
import { useEffect, useRef, useState } from 'react'
import { 
  HiDocumentText, 
  HiShieldCheck, 
  HiExclamation, 
  HiChartBar, 
  HiCube, 
  HiOfficeBuilding 
} from 'react-icons/hi'
import { HiSparkles } from 'react-icons/hi2'

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`

const FeaturesSection = styled.section`
  padding: 5rem 2rem;
  background: linear-gradient(135deg, rgba(14, 123, 215, 0.3) 0%, rgba(32, 178, 170, 0.3) 100%);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
    animation: ${keyframes`
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    `} 30s linear infinite;
  }
`

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`

const SectionTitle = styled.h2`
  font-size: 3rem;
  color: white;
  text-align: center;
  margin-bottom: 1rem;
  text-shadow: 2px 4px 10px rgba(0, 0, 0, 0.2);
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`

const SectionSubtitle = styled.p`
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.9);
  text-align: center;
  margin-bottom: 4rem;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
`

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
`

const FeatureCard = styled.div<{ visible?: boolean; delay?: number }>`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  animation: ${props => props.visible ? fadeIn : 'none'} 0.6s ease-out ${props => props.delay || 0}s both;
  opacity: ${props => props.visible ? 1 : 0};
  backdrop-filter: blur(10px);
  
  &:hover {
    transform: translateY(-10px) scale(1.02);
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
    background: white;
  }
`

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  
  svg {
    width: 48px;
    height: 48px;
    color: #0e7bd7;
    transition: color 0.3s ease;
    
    &:hover {
      color: #20b2aa;
    }
  }
`

const FeatureTitle = styled.h3`
  font-size: 1.4rem;
  color: #082a54;
  margin-bottom: 1rem;
`

const FeatureDescription = styled.p`
  color: #718096;
  line-height: 1.6;
`

const MainFeaturesList = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 3rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
`

const MainFeaturesTitle = styled.h3`
  font-size: 2rem;
  color: white;
  text-align: center;
  margin-bottom: 2rem;
`

const FeaturesList = styled.ul`
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
`

const FeatureItem = styled.li<{ visible?: boolean; index?: number }>`
  color: white;
  display: flex;
  align-items: center;
  font-size: 1.1rem;
  animation: ${props => props.visible ? fadeIn : 'none'} 0.4s ease-out ${props => (props.index || 0) * 0.1}s both;
  opacity: ${props => props.visible ? 1 : 0};
  
  svg {
    margin-right: 1rem;
    width: 20px;
    height: 20px;
    color: #20b2aa;
    flex-shrink: 0;
  }
`

const features = [
  {
    icon: HiSparkles,
    title: 'Plataforma Moderna',
    description: 'Interfaz intuitiva y elegante diseñada para maximizar tu productividad. Experiencia de usuario optimizada para cualquier dispositivo.'
  },
  {
    icon: HiShieldCheck,
    title: 'Autorización con Hacienda',
    description: 'Proceso completo de implementación y autorización directa con el Ministerio de Hacienda.'
  },
  {
    icon: HiExclamation,
    title: 'Contingencia Automatizada',
    description: 'Sistema de contingencia automático para garantizar la continuidad de tu operación sin interrupciones.'
  },
  {
    icon: HiChartBar,
    title: 'Reportes Personalizados',
    description: 'Genera reportes detallados de operaciones generales y por sucursal con análisis en tiempo real.'
  },
  {
    icon: HiCube,
    title: 'Control de Inventario',
    description: 'Gestión completa de inventario con seguimiento en tiempo real y alertas de stock.'
  },
  {
    icon: HiOfficeBuilding,
    title: 'Gestión de Sucursales',
    description: 'Administra múltiples sucursales desde una sola plataforma centralizada.'
  }
]

const mainFeatures = [
  'Implementación y proceso de autorización con Hacienda',
  'Emisión de Factura Electrónica y Crédito Fiscal',
  'Emisión de Nota de Crédito y Sujeto Excluido',
  'Contingencia automatizada',
  'PDF Personalizado con logo y eslogan',
  'Gestión de inventario avanzada',
  'Gestión de múltiples sucursales',
  'Sitio web accesible desde cualquier dispositivo',
  'Reportes personalizados y análisis'
]

const Features = () => {
  const [visibleCards, setVisibleCards] = useState<boolean[]>(new Array(features.length).fill(false))
  const [visibleItems, setVisibleItems] = useState<boolean[]>(new Array(mainFeatures.length).fill(false))
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            features.forEach((_, index) => {
              setTimeout(() => {
                setVisibleCards(prev => {
                  const newState = [...prev]
                  newState[index] = true
                  return newState
                })
              }, index * 100)
            })
            
            mainFeatures.forEach((_, index) => {
              setTimeout(() => {
                setVisibleItems(prev => {
                  const newState = [...prev]
                  newState[index] = true
                  return newState
                })
              }, 600 + index * 50)
            })
          }
        })
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <FeaturesSection id="features" ref={sectionRef}>
      <Container>
        <SectionTitle>Funcionalidades Principales</SectionTitle>
        
        <FeaturesGrid>
          {features.map((feature, index) => {
            const IconComponent = feature.icon
            return (
              <FeatureCard 
                key={index}
                visible={visibleCards[index]}
                delay={index * 0.1}
              >
                <IconWrapper>
                  <IconComponent />
                </IconWrapper>
                <FeatureTitle>{feature.title}</FeatureTitle>
                <FeatureDescription>{feature.description}</FeatureDescription>
              </FeatureCard>
            )
          })}
        </FeaturesGrid>
        
      </Container>
    </FeaturesSection>
  )
}

export default Features