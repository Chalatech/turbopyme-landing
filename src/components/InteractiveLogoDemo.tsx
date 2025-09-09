import styled from '@emotion/styled'
import { motion } from 'framer-motion'
import { useState } from 'react'
import AnimatedLogo from './AnimatedLogo'

const DemoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  margin: 2rem 0;
`

const ControlPanel = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
`

const ControlButton = styled(motion.button)`
  padding: 0.8rem 1.5rem;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 25px;
  cursor: pointer;
  font-weight: 500;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`

const StatusText = styled(motion.p)`
  color: rgba(255, 255, 255, 0.8);
  font-size: 1rem;
  text-align: center;
  margin: 0;
`

const InteractiveLogoDemo = () => {
  const [animationKey, setAnimationKey] = useState(0)
  const [showGlow, setShowGlow] = useState(true)
  const [logoSize, setLogoSize] = useState(320)
  const [status, setStatus] = useState('Ready to animate')

  const triggerAnimation = () => {
    setAnimationKey(prev => prev + 1)
    setStatus('Animation in progress...')
  }

  const handleAnimationComplete = () => {
    setStatus('Animation completed! Click to replay')
  }

  const toggleGlow = () => {
    setShowGlow(!showGlow)
    setStatus(showGlow ? 'Glow effect disabled' : 'Glow effect enabled')
  }

  const cycleSizes = () => {
    const sizes = [280, 320, 360, 400]
    const currentIndex = sizes.indexOf(logoSize)
    const nextSize = sizes[(currentIndex + 1) % sizes.length]
    setLogoSize(nextSize)
    setStatus(`Logo size: ${nextSize}px`)
  }

  return (
    <DemoContainer>
      <StatusText
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        key={status}
      >
        {status}
      </StatusText>
      
      <AnimatedLogo
        key={animationKey}
        width={logoSize}
        height={logoSize}
        autoPlay={false}
        showGlow={showGlow}
        onAnimationComplete={handleAnimationComplete}
      />
      
      <ControlPanel>
        <ControlButton
          onClick={triggerAnimation}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          🎬 Trigger Animation
        </ControlButton>
        
        <ControlButton
          onClick={toggleGlow}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          ✨ {showGlow ? 'Disable' : 'Enable'} Glow
        </ControlButton>
        
        <ControlButton
          onClick={cycleSizes}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          📏 Resize ({logoSize}px)
        </ControlButton>
      </ControlPanel>
    </DemoContainer>
  )
}

export default InteractiveLogoDemo