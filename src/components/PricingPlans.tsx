import styled from '@emotion/styled'
import { keyframes } from '@emotion/react'
import { useEffect, useRef, useState } from 'react'
import { HiCheck } from 'react-icons/hi'

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const PricingSection = styled.section`
  padding: 4rem 2rem;
  background: white;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  @media (max-width: 768px) {
    padding: 3rem 1rem;
  }
`

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  color: #082a54;
  text-align: center;
  margin-bottom: 1rem;
  font-weight: 700;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.8rem;
  }
`

const SectionSubtitle = styled.p`
  font-size: 1.2rem;
  color: #718096;
  text-align: center;
  margin-bottom: 4rem;
  max-width: 600px;
`

const PlansContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`

const PlanCard = styled.div<{ featured?: boolean; visible?: boolean }>`
  background: white;
  border-radius: 16px;
  padding: 1.8rem;
  box-shadow: ${props => props.featured 
    ? '0 15px 50px rgba(14, 123, 215, 0.3)' 
    : '0 8px 25px rgba(0, 0, 0, 0.1)'};
  transition: all 0.3s ease;
  position: relative;
  border: ${props => props.featured ? '2px solid #0e7bd7' : '1px solid #e2e8f0'};
  animation: ${props => props.visible ? fadeInUp : 'none'} 0.6s ease-out forwards;
  opacity: ${props => props.visible ? 1 : 0};
  min-height: 500px;
  display: flex;
  flex-direction: column;
  
  ${props => props.featured && `
    transform: scale(1.03);
    
    &::before {
      content: 'MÁS POPULAR';
      position: absolute;
      top: -12px;
      left: 50%;
      transform: translateX(-50%);
      background: linear-gradient(135deg, #0e7bd7 0%, #20b2aa 100%);
      color: white;
      padding: 0.4rem 1.2rem;
      border-radius: 15px;
      font-size: 0.75rem;
      font-weight: 600;
    }
  `}
  
  &:hover {
    transform: ${props => props.featured ? 'scale(1.05)' : 'translateY(-8px)'};
    box-shadow: ${props => props.featured 
      ? '0 20px 60px rgba(14, 123, 215, 0.4)' 
      : '0 12px 35px rgba(0, 0, 0, 0.15)'};
  }
  
  @media (max-width: 768px) {
    padding: 1.5rem;
    min-height: 450px;
    
    ${props => props.featured && `
      transform: scale(1);
      
      &:hover {
        transform: translateY(-5px);
      }
    `}
  }
`

const PlanName = styled.h3`
  font-size: 1.5rem;
  color: #082a54;
  margin-bottom: 0.8rem;
  text-align: center;
  font-weight: 600;
  
  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
`

const PlanPrice = styled.div`
  text-align: center;
  margin-bottom: 1.2rem;
`

const Price = styled.div`
  font-size: 2.2rem;
  color: #0e7bd7;
  font-weight: 700;
  
  span {
    font-size: 1rem;
    color: #718096;
  }
  
  @media (max-width: 768px) {
    font-size: 1.8rem;
    
    span {
      font-size: 0.9rem;
    }
  }
`

const PriceLabel = styled.div`
  color: #718096;
  font-size: 0.9rem;
  margin-top: 0.5rem;
`

const PlanFeatures = styled.ul`
  list-style: none;
  padding: 0;
  margin: 1.5rem 0;
  flex-grow: 1;
`

const Feature = styled.li`
  padding: 0.5rem 0;
  color: #4a5568;
  display: flex;
  align-items: flex-start;
  font-size: 0.9rem;
  line-height: 1.4;
  
  svg {
    color: #48bb78;
    margin-right: 0.6rem;
    width: 16px;
    height: 16px;
    margin-top: 0.1rem;
    flex-shrink: 0;
  }
  
  @media (max-width: 768px) {
    font-size: 0.85rem;
  }
`

const ImplementationCost = styled.div`
  background: #f7fafc;
  border-radius: 8px;
  padding: 0.8rem;
  margin-top: 0.8rem;
  text-align: center;
  margin-bottom: 1rem;
`

const ImplementationLabel = styled.div`
  font-size: 0.8rem;
  color: #718096;
  margin-bottom: 0.4rem;
`

const ImplementationPrice = styled.div`
  font-size: 1.2rem;
  color: #082a54;
  font-weight: 600;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`

const SelectButton = styled.button`
  width: 100%;
  padding: 0.8rem;
  background: linear-gradient(135deg, #0e7bd7 0%, #20b2aa 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: auto;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 15px rgba(14, 123, 215, 0.3);
  }
  
  @media (max-width: 768px) {
    padding: 0.7rem;
    font-size: 0.95rem;
  }
`

const plans = [
  {
    name: 'Personal',
    monthlyPrice: 9.99,
    annualPrice: 119.88,
    implementationCost: 100,
    features: [
      'Emisión de 25 DTE',
      'Casa Matriz',
      'Diseño de Factura Personalizada',
      'Envío de DTE vía correo electrónico',
      'Importación de json',
      '1 Usuario'
    ]
  },
  {
    name: 'Microempresa',
    monthlyPrice: 12.99,
    annualPrice: 155.88,
    implementationCost: 200,
    features: [
      'Emisión de 50 DTE',
      'Casa Matriz',
      'Diseño de Factura Personalizada',
      'Envío de DTE vía correo electrónico',
      'Importación de json',
      'Catálogo de Productos',
      '1 Usuario'
    ]
  },
  {
    name: 'Básico',
    monthlyPrice: 20.00,
    annualPrice: 240.00,
    implementationCost: 300,
    featured: true,
    features: [
      'Emisión de 400 DTE',
      'Casa Matriz',
      'Diseño de Factura Personalizada',
      'Envío de DTE vía correo electrónico',
      'Importación de json',
      'Catálogo de Productos',
      '3 Usuarios'
    ]
  },
  {
    name: 'Pro',
    monthlyPrice: 40.00,
    annualPrice: 480.00,
    implementationCost: 400,
    features: [
      'Emisión de 800 DTE',
      'Casa Matriz + 2 sucursales',
      'Diseño de Factura Personalizada',
      'Envío de DTE vía correo electrónico',
      'Importación de json',
      'Reportes de operaciones General',
      'Reportes por sucursal',
      'Catálogo de Productos',
      'Control de inventarios',
      '6 Usuarios'
    ]
  },
  {
    name: 'Enterprise',
    monthlyPrice: 'Personalizado',
    annualPrice: 'Personalizado',
    implementationCost: '500+',
    features: [
      'Emisión de +1,000 DTE',
      'Casa Matriz y sucursales ilimitadas',
      'Diseño de Factura Personalizada',
      'Envío de DTE vía correo electrónico',
      'Importación de json',
      'Reportes de operaciones',
      'Catálogo de Productos',
      'Control de inventarios',
      'Usuarios Ilimitados'
    ]
  }
]

const PricingPlans = () => {
  const [visibleCards, setVisibleCards] = useState<boolean[]>(new Array(plans.length).fill(false))
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            plans.forEach((_, index) => {
              setTimeout(() => {
                setVisibleCards(prev => {
                  const newState = [...prev]
                  newState[index] = true
                  return newState
                })
              }, index * 100)
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
    <PricingSection id="pricing-plans" ref={sectionRef}>
      <SectionTitle>Planes y Precios</SectionTitle>
      <SectionSubtitle>
        Elige el plan perfecto para tu negocio. Todos incluyen soporte completo y actualizaciones.
      </SectionSubtitle>
      <PlansContainer>
        {plans.map((plan, index) => (
          <PlanCard 
            key={plan.name} 
            featured={plan.featured}
            visible={visibleCards[index]}
          >
            <PlanName>{plan.name}</PlanName>
            <PlanPrice>
              <Price>
                {typeof plan.monthlyPrice === 'number' ? `$${plan.monthlyPrice}` : plan.monthlyPrice}
                {typeof plan.monthlyPrice === 'number' && <span>/mes</span>}
              </Price>
              <PriceLabel>
                {typeof plan.annualPrice === 'number' 
                  ? `$${plan.annualPrice} anual` 
                  : 'Cotización personalizada'}
              </PriceLabel>
            </PlanPrice>
            <PlanFeatures>
              {plan.features.map((feature, idx) => (
                <Feature key={idx}>
                  <HiCheck />
                  {feature}
                </Feature>
              ))}
            </PlanFeatures>
            <ImplementationCost>
              <ImplementationLabel>Costo de Implementación</ImplementationLabel>
              <ImplementationPrice>
                {typeof plan.implementationCost === 'number' 
                  ? `$${plan.implementationCost}` 
                  : `$${plan.implementationCost}`}
              </ImplementationPrice>
            </ImplementationCost>
            <SelectButton>Seleccionar Plan</SelectButton>
          </PlanCard>
        ))}
      </PlansContainer>
    </PricingSection>
  )
}

export default PricingPlans