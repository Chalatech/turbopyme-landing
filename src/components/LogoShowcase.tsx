import styled from '@emotion/styled'
import { motion } from 'framer-motion'
import InteractiveLogoDemo from './InteractiveLogoDemo'

const ShowcaseSection = styled.section`
  padding: 5rem 2rem;
  background: linear-gradient(135deg, #082a54 0%, #0e7bd7 100%);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(32, 178, 170, 0.1) 0%, transparent 70%);
    animation: rotate 20s linear infinite;
  }
  
  @keyframes rotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`

const SectionTitle = styled(motion.h2)`
  font-size: 3rem;
  color: white;
  text-align: center;
  margin-bottom: 1rem;
  text-shadow: 2px 4px 10px rgba(0, 0, 0, 0.3);
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`

const SectionSubtitle = styled(motion.p)`
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.9);
  text-align: center;
  margin-bottom: 4rem;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
`

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
`

const FeatureCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 2rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  text-align: center;
`

const FeatureIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
`

const FeatureTitle = styled.h3`
  font-size: 1.4rem;
  color: white;
  margin-bottom: 1rem;
`

const FeatureDescription = styled.p`
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  font-size: 0.95rem;
`

const TechBadge = styled(motion.div)`
  display: inline-block;
  background: rgba(32, 178, 170, 0.2);
  color: #20b2aa;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
  margin: 0.25rem;
  border: 1px solid rgba(32, 178, 170, 0.3);
`

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 2rem;
`

const features = [
  {
    icon: '🎨',
    title: 'Path Drawing Animation',
    description: 'SVG paths are drawn progressively using pathLength animation for a smooth, professional reveal effect.'
  },
  {
    icon: '✨',
    title: 'Dynamic Glow Effects',
    description: 'Multi-layered glow animations that pulse and shift colors, creating an engaging visual experience.'
  },
  {
    icon: '🎬',
    title: 'Choreographed Sequences',
    description: 'Carefully timed animation sequences with staggered delays for maximum visual impact.'
  },
  {
    icon: '🎯',
    title: 'Interactive Controls',
    description: 'Click-to-replay functionality with hover effects and customizable animation parameters.'
  },
  {
    icon: '⚡',
    title: 'Performance Optimized',
    description: 'Hardware-accelerated animations using CSS transforms and optimized rendering for smooth playback.'
  },
  {
    icon: '📱',
    title: 'Responsive Design',
    description: 'Scalable animations that work perfectly across all device sizes and screen resolutions.'
  }
]

const technologies = [
  'Framer Motion', 'TypeScript', 'Emotion/Styled', 'SVG Animation', 
  'React Hooks', 'CSS Transforms', 'Hardware Acceleration'
]

const LogoShowcase = () => {
  return (
    <ShowcaseSection>
      <Container>
        <SectionTitle
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Advanced Logo Animation
        </SectionTitle>
        
        <SectionSubtitle
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Showcasing next-level animation expertise with professional SVG animations, 
          dynamic effects, and interactive controls built with cutting-edge web technologies.
        </SectionSubtitle>

        <InteractiveLogoDemo />

        <FeatureGrid>
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <FeatureIcon>{feature.icon}</FeatureIcon>
              <FeatureTitle>{feature.title}</FeatureTitle>
              <FeatureDescription>{feature.description}</FeatureDescription>
            </FeatureCard>
          ))}
        </FeatureGrid>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <SectionTitle style={{ fontSize: '2rem', marginBottom: '2rem' }}>
            Technologies Used
          </SectionTitle>
          <TechStack>
            {technologies.map((tech, index) => (
              <TechBadge
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ scale: 1.1 }}
              >
                {tech}
              </TechBadge>
            ))}
          </TechStack>
        </motion.div>
      </Container>
    </ShowcaseSection>
  )
}

export default LogoShowcase