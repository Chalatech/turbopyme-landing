import React from 'react'
import styled from '@emotion/styled'
import { keyframes } from '@emotion/react'
import { useEffect, useRef, useState } from 'react'
import { HiCheck } from 'react-icons/hi'

interface PlanFeature {
  text: string
  isSubfeature?: boolean
}

interface PlanData {
  name: string
  monthlyPrice: number | string
  annualPrice: number | string
  implementationCost: number | string | null
  features: (string | PlanFeature)[]
  implementationDetails: string[]
  featured?: boolean
  isEnterprise?: boolean
}

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
  background: linear-gradient(135deg, #f0f8ff 0%, #e8f6f5 100%);
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  
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
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.5rem;
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;

  @media (max-width: 768px) {
    gap: 1rem;
  }
`

const PlanCard = styled.div<{ featured?: boolean; visible?: boolean }>`
  background: white;
  border-radius: 16px;
  padding: 1.8rem;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  position: relative;
  border: 1px solid #e2e8f0;
  animation: ${props => props.visible ? fadeInUp : 'none'} 0.6s ease-out forwards;
  opacity: ${props => props.visible ? 1 : 0};
  min-height: 500px;
  display: flex;
  flex-direction: column;
  flex: 0 1 calc(20% - 1.5rem);
  min-width: 250px;
  max-width: 300px;

  &:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 20px 60px rgba(14, 123, 215, 0.3);
    border-color: #0e7bd7;
  }

  @media (max-width: 1350px) {
    flex: 0 1 calc(33% - 1.5rem);
    max-width: 320px;
  }

  @media (max-width: 1000px) {
    flex: 0 1 calc(45% - 1.5rem);
    max-width: 350px;
  }

  @media (max-width: 768px) {
    padding: 1.5rem;
    min-height: 450px;
    flex: 0 1 calc(50% - 1rem);
    max-width: 350px;

    &:hover {
      transform: translateY(-5px) scale(1.01);
    }
  }

  @media (max-width: 550px) {
    flex: 0 1 100%;
    max-width: 100%;
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

const Price = styled.div<{ isCustom?: boolean }>`
  font-size: ${props => props.isCustom ? '1.3rem' : '2.2rem'};
  color: #0e7bd7;
  font-weight: 700;
  word-break: break-word;
  line-height: 1.2;

  span {
    font-size: 1rem;
    color: #718096;
  }

  @media (max-width: 768px) {
    font-size: ${props => props.isCustom ? '1.1rem' : '1.8rem'};

    span {
      font-size: 0.9rem;
    }
  }
`

const PlanFeatures = styled.ul`
  list-style: none;
  padding: 0;
  margin: 1rem 0;
  flex-grow: 1;
`

const Feature = styled.li<{ isSubfeature?: boolean }>`
  padding: 0.25rem 0;
  color: #4a5568;
  display: flex;
  align-items: flex-start;
  font-size: 0.9rem;
  line-height: 1.3;
  margin-left: ${props => props.isSubfeature ? '1.5rem' : '0'};

  svg {
    color: ${props => props.isSubfeature ? '#718096' : '#48bb78'};
    margin-right: 0.6rem;
    width: ${props => props.isSubfeature ? '12px' : '16px'};
    height: ${props => props.isSubfeature ? '12px' : '16px'};
    margin-top: 0.1rem;
    flex-shrink: 0;
  }

  ${props => props.isSubfeature && `
    font-size: 0.85rem;
    color: #718096;
    padding: 0.15rem 0;
  `}
  
  @media (max-width: 768px) {
    font-size: 0.85rem;
    margin-left: ${props => props.isSubfeature ? '1rem' : '0'};
    
    ${props => props.isSubfeature && `
      font-size: 0.8rem;
    `}
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

const ImplementationDetails = styled.div`
  background: #f8fbff;
  border-radius: 8px;
  padding: 0.8rem;
  margin-top: 0.8rem;
  margin-bottom: 1rem;
  border-left: 3px solid #20b2aa;
`

const ImplementationDetailsTitle = styled.div`
  font-size: 0.8rem;
  color: #20b2aa;
  font-weight: 600;
  margin-bottom: 0.5rem;
`

const ImplementationDetailsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`

const ImplementationDetailItem = styled.li`
  font-size: 0.75rem;
  color: #4a5568;
  padding: 0.2rem 0;
  display: flex;
  align-items: flex-start;
  
  svg {
    color: #20b2aa;
    margin-right: 0.4rem;
    width: 12px;
    height: 12px;
    margin-top: 0.1rem;
    flex-shrink: 0;
  }
`

const SelectButton = styled.button`
  width: 100%;
  padding: 0.8rem 2rem;
  background: #0e7bd7;
  color: white;
  border: none;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: auto;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 15px rgba(14, 123, 215, 0.3);
    background: #1e8be7;
  }
  
  @media (max-width: 768px) {
    padding: 0.7rem;
    font-size: 0.95rem;
  }
`

const plans: PlanData[] = [
  {
    name: 'Personal',
    monthlyPrice: 9.99,
    annualPrice: 119.88,
    implementationCost: 100,
    features: [
      'Emisión de 25 DTE',
      { text: 'Factura Comercial', isSubfeature: true },
      { text: 'Crédito Fiscal', isSubfeature: true },
      { text: 'Nota de Crédito', isSubfeature: true },
      { text: 'Sujeto Excluido', isSubfeature: true },
      { text: 'Factura exportación electrónica (próximamente)', isSubfeature: true },
      'Casa Matriz',
      'Clientes & Proveedores',
      'Catálogo de Productos',
      'Factura con logo de empresa y eslogan',
      'Envío de DTE vía correo electrónico',
      'Registro de compras',
      { text: 'Importación JSON inteligente', isSubfeature: true },
      '1 Usuario'
    ],
    implementationDetails: [
      'Pruebas con Hacienda',
      'Autorización de Facturación Electrónica',
      'Capacitación básica',
      'Soporte técnico'
    ]
  },
  {
    name: 'Microempresa',
    monthlyPrice: 12.99,
    annualPrice: 155.88,
    implementationCost: 200,
    features: [
      'Emisión de 50 DTE',
      { text: 'Factura Comercial', isSubfeature: true },
      { text: 'Crédito Fiscal', isSubfeature: true },
      { text: 'Nota de Crédito', isSubfeature: true },
      { text: 'Sujeto Excluido', isSubfeature: true },
      { text: 'Factura exportación electrónica (próximamente)', isSubfeature: true },
      'Casa Matriz',
      'Clientes & Proveedores',
      'Catálogo de Productos',
      'Factura con logo de empresa y eslogan',
      'Envío de DTE vía correo electrónico',
      'Registro de compras',
      { text: 'Importación JSON inteligente', isSubfeature: true },
      '1 Usuario'
    ],
    implementationDetails: [
      'Ingreso catálogo productos',
      'Ingreso de catálogo de clientes',
      'Pruebas con Hacienda',
      'Autorización de Facturación Electrónica',
      'Capacitación completa',
      'Soporte técnico extendido'
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
      { text: 'Factura Comercial', isSubfeature: true },
      { text: 'Crédito Fiscal', isSubfeature: true },
      { text: 'Nota de Crédito', isSubfeature: true },
      { text: 'Sujeto Excluido', isSubfeature: true },
      { text: 'Factura exportación electrónica (próximamente)', isSubfeature: true },
      'Casa Matriz',
      'Clientes & Proveedores',
      'Catálogo de Productos',
      'Factura con logo de empresa y eslogan',
      'Envío de DTE vía correo electrónico',
      'Registro de compras',
      { text: 'Importación JSON inteligente', isSubfeature: true },
      '3 Usuarios'
    ],
    implementationDetails: [
      'Ingreso catálogo productos',
      'Ingreso de catálogo de clientes',
      'Pruebas con Hacienda',
      'Autorización de Facturación Electrónica',
      'Configuración avanzada',
      'Capacitación multi-usuario',
      'Soporte prioritario'
    ]
  },
  {
    name: 'Pro',
    monthlyPrice: 40.00,
    annualPrice: 480.00,
    implementationCost: 400,
    features: [
      'Emisión de 800 DTE',
      { text: 'Factura Comercial', isSubfeature: true },
      { text: 'Crédito Fiscal', isSubfeature: true },
      { text: 'Nota de Crédito', isSubfeature: true },
      { text: 'Sujeto Excluido', isSubfeature: true },
      { text: 'Factura exportación electrónica (próximamente)', isSubfeature: true },
      'Casa Matriz + 2 sucursales',
      'Clientes & Proveedores',
      'Catálogo de Productos',
      'Control de inventarios',
      'Reportes de operaciones General',
      'Reportes por sucursal',
      'Factura con logo de empresa y eslogan',
      'Envío de DTE vía correo electrónico',
      'Registro de compras',
      { text: 'Importación JSON inteligente', isSubfeature: true },
      '6 Usuarios'
    ],
    implementationDetails: [
      'Ingreso catálogo productos',
      'Ingreso de catálogo de clientes',
      'Pruebas con Hacienda',
      'Autorización de Facturación Electrónica',
      'Configuración multi-sucursal',
      'Migración de datos',
      'Capacitación avanzada',
      'Soporte dedicado'
    ]
  },
  {
    name: 'Enterprise',
    monthlyPrice: 'Solución personalizada',
    annualPrice: 'Solución personalizada',
    implementationCost: null,
    features: [
      'DTEs ilimitados',
      { text: 'Factura Electrónica', isSubfeature: true },
      { text: 'Comprobante de Crédito Fiscal Electrónico', isSubfeature: true },
      { text: 'Nota de Remisión Electrónica', isSubfeature: true },
      { text: 'Nota de Crédito Electrónica', isSubfeature: true },
      { text: 'Nota de Débito Electrónica', isSubfeature: true },
      { text: 'Comprobante de Retención Electrónico', isSubfeature: true },
      { text: 'Comprobante de Liquidación Electrónico', isSubfeature: true },
      { text: 'Documento Contable de Liquidación Electrónico', isSubfeature: true },
      { text: 'Factura de Exportación Electrónica', isSubfeature: true },
      { text: 'Factura Sujeto Excluido Electrónico', isSubfeature: true },
      { text: 'Comprobante de Donación Electrónico', isSubfeature: true },
      'Casa Matriz y sucursales ilimitadas',
      'Clientes & Proveedores',
      'Catálogo de Productos',
      'Control de inventarios',
      'Reportes de operaciones',
      'Factura con logo de empresa y eslogan',
      'Envío de DTE vía correo electrónico',
      'Registro de compras',
      { text: 'Importación JSON inteligente', isSubfeature: true },
      'Usuarios Ilimitados',
      'Más funcionalidades'
    ],
    implementationDetails: [
      'Pruebas con Hacienda',
      'Autorización de Facturación Electrónica',
      'Configuración empresarial',
      'Integración con sistemas',
      'Migración completa de datos',
      'Capacitación corporativa',
      'Soporte 24/7'
    ],
    isEnterprise: true
  }
]

interface PricingPlansProps {
  onPlanSelect?: (planName: string) => void
}

const PricingPlans: React.FC<PricingPlansProps> = ({ onPlanSelect }) => {
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
              <Price isCustom={plan.isEnterprise}>
                {typeof plan.monthlyPrice === 'number' ? `$${plan.monthlyPrice}` : plan.monthlyPrice}
                {typeof plan.monthlyPrice === 'number' && <span>/mes</span>}
              </Price>
            </PlanPrice>
            <PlanFeatures>
              {plan.features.map((feature, idx) => {
                const isSubfeature = typeof feature === 'object' && feature.isSubfeature
                const featureText = typeof feature === 'string' ? feature : feature.text
                
                return (
                  <Feature key={idx} isSubfeature={isSubfeature}>
                    <HiCheck />
                    {featureText}
                  </Feature>
                )
              })}
            </PlanFeatures>
            {plan.implementationCost && (
              <ImplementationCost>
                <ImplementationLabel>Costo de Implementación</ImplementationLabel>
                <ImplementationPrice>
                  {typeof plan.implementationCost === 'number' 
                    ? `$${plan.implementationCost}` 
                    : `$${plan.implementationCost}`}
                </ImplementationPrice>
              </ImplementationCost>
            )}
            <ImplementationDetails>
              <ImplementationDetailsTitle>
                Incluye:
              </ImplementationDetailsTitle>
              <ImplementationDetailsList>
                {plan.implementationDetails.map((detail, idx) => (
                  <ImplementationDetailItem key={idx}>
                    <HiCheck />
                    {detail}
                  </ImplementationDetailItem>
                ))}
              </ImplementationDetailsList>
            </ImplementationDetails>
            <SelectButton onClick={() => onPlanSelect?.(plan.name)}>
              {plan.isEnterprise ? 'Contactar Ventas' : 'Seleccionar Plan'}
            </SelectButton>
          </PlanCard>
        ))}
      </PlansContainer>
    </PricingSection>
  )
}

export default PricingPlans