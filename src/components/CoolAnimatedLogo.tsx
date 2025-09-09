import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import styled from '@emotion/styled'

const LogoContainer = styled(motion.div)`
  display: inline-block;
  cursor: pointer;
  position: relative;
  
  &:hover {
    transform: scale(1.02);
    transition: transform 0.3s ease;
  }
`

const AnimatedSVG = styled(motion.svg)`
  overflow: visible;
  filter: drop-shadow(0 10px 30px rgba(0, 0, 0, 0.2));
`

// Rocket trail animation - better contrast
const TrailPath = styled(motion.path)`
  stroke: #20b2aa;
  stroke-width: 4;
  fill: none;
  stroke-linecap: round;
  filter: drop-shadow(0 0 8px rgba(32, 178, 170, 0.8));
`

// Floating particles around rocket - better contrast
const Particle = styled(motion.circle)`
  fill: #20b2aa;
  stroke: #0e7bd7;
  stroke-width: 1;
  filter: drop-shadow(0 0 6px rgba(32, 178, 170, 0.6));
`

interface CoolAnimatedLogoProps {
  width?: number
  height?: number
  autoPlay?: boolean
}

const CoolAnimatedLogo = ({ 
  width = 320, 
  height = 320, 
  autoPlay = true
}: CoolAnimatedLogoProps) => {
  const [animationPhase, setAnimationPhase] = useState<'idle' | 'flying' | 'delivered'>('idle')
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    if (autoPlay) {
      // Start animation after a short delay
      setTimeout(() => setAnimationPhase('flying'), 800)
      // Complete delivery after full orbit
      setTimeout(() => setAnimationPhase('delivered'), 7000)
    }
  }, [autoPlay])

  const handleClick = () => {
    setAnimationPhase('flying')
    setTimeout(() => setAnimationPhase('delivered'), 6000)
    setTimeout(() => setAnimationPhase('idle'), 8000)
  }

  // Calculate orbital path around the entire SVG (much bigger orbit)
  const centerX = 358 // SVG center X
  const centerY = 355 // SVG center Y
  const orbitRadius = 280 // Large orbit radius
  
  // Create orbital path using ellipse
  const orbitPath = `M ${centerX + orbitRadius} ${centerY} 
                     A ${orbitRadius} ${orbitRadius * 0.8} 0 1 1 ${centerX - orbitRadius} ${centerY}
                     A ${orbitRadius} ${orbitRadius * 0.8} 0 1 1 ${centerX + orbitRadius} ${centerY}`
  
  return (
    <LogoContainer 
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatedSVG
        width={width}
        height={height}
        viewBox="0 0 716.4 709.41"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ 
          opacity: 1, 
          scale: isHovered ? 1.05 : 1,
          filter: isHovered 
            ? "drop-shadow(0 15px 40px rgba(0, 0, 0, 0.3))" 
            : "drop-shadow(0 10px 30px rgba(0, 0, 0, 0.2))"
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {/* Main logo paths - static and visible */}
        <motion.path
          d="M345.26,256.46c-1.41-2.23-30.81-2.53-35.23-2.23-21.09,1.46-44.43,12.79-28.81-22.32,20.31-45.65,64.11-71.53,112.73-76.72,42.71-65.16,110.95-120.6,184.87-146.38,18.18-6.34,56.14-20.4,59.8,10,8.26,68.59-36.75,169.25-78.6,222.34-3.21,4.08-20.9,22.46-21.5,23.96-1.47,3.64.92,25.19.49,31.89-2.25,35.22-22.5,69.31-49.86,90.86-6.81,5.36-34.4,27.17-36.74,8.77-.89-7.06,2.09-58.14-8.96-57.79-5.02.16-23.07,11.77-28.1,10.51l-73.38-59.85c-5.87-3.9,4.34-31.42,3.3-33.05h0ZM519.36,97.6c-55.59,1.83-50.8,87.03,6.12,81.96,50.76-4.53,46.21-83.69-6.12-81.96Z"
          fill="#0e7bd7"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        />

        <motion.path
          d="M343.09,319.22c3.05,2.96-14.79,14.13-16.83,16.19-14.19,14.31-15.25,31.79-20.78,49.59-3.96,12.75-12.34,15.55,6.22,11.63,24.56-5.18,42.47-20.03,55.65-40.69,1.62-2.53,5.63-14.24,9.27-11.82.79.53,3.17,15.47,3.3,17.82,3.63,62.84-49.68,109.02-107.18,120.23-86.68,16.89-170.71-27.24-195.95-113.15,50.9,47.88,119.38,39.35,172.01-.64,20.46-15.54,49.87-49.16,77.5-49.16,2.5,0,16.17-.58,16.78,0h0Z"
          fill="#20b2aa"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        />

        {/* Document/Invoice parts */}
        <motion.path
          d="M164.47,383.09c-1.4,1.4-29.53-2.28-30.35-5.06V77.25c1.93-21.68,19.28-37.54,40.61-39.51h278.27c12.93.75,18.88,3.68,18.88,5.99s-25.53,19.96-28.69,23.24H181.22c-5.22-1.16-16.75,6.47-16.75,11.39v304.72h0Z"
          fill="#0e7bd7"
          initial={{ opacity: 0.3 }}
          animate={{
            opacity: animationPhase === 'delivered' ? 1 : 0.3,
            scale: animationPhase === 'delivered' ? 1.05 : 1
          }}
          transition={{ duration: 0.5 }}
        />

        <motion.path
          d="M533.61,488.63c-2.26,20.14-18.54,37.18-38.55,40.47l-320.34.17c-21.82-2.53-39.29-20.68-40.59-42.75-.11-1.85-.96-10.04,1.65-9.23,3.62,1.12,12.66,7.44,17.5,9.57,16.65,7.34,34.57,13.13,52.84,14.27,89.94,5.6,185.59-4.32,276.13,0,10.32-.21,20.44-5.98,22.04-16.93,3.63-24.85-2.69-57.35.33-83.02l29-30v117.46h-.01Z"
          fill="#0e7bd7"
          initial={{ opacity: 0.3 }}
          animate={{
            opacity: animationPhase === 'delivered' ? 1 : 0.3,
            scale: animationPhase === 'delivered' ? 1.05 : 1
          }}
          transition={{ duration: 0.5 }}
        />

        {/* Document lines */}
        <motion.path
          d="M208.58,127.88c13.32-2.31,75.59-2.12,89.48-.16,18.1,2.55,17.45,26.56,1.09,29.03-13.29,2.01-77.75,2.15-90.76.02-15.63-2.55-15.63-26.15.19-28.89Z"
          fill="#0e7bd7"
          initial={{ opacity: 0.3, x: -10 }}
          animate={{
            opacity: animationPhase === 'delivered' ? 1 : 0.3,
            x: animationPhase === 'delivered' ? 0 : -10
          }}
          transition={{ delay: 0.2, duration: 0.4 }}
        />

        <motion.path
          d="M208.58,198.23c6.03-1.11,36.75-1.05,42.32.47,14.35,3.92,12.89,26.07-1.51,28.43-5.64.92-40.01.71-44.39-.92-12.47-4.68-10.58-25.37,3.58-27.97h0Z"
          fill="#0e7bd7"
          initial={{ opacity: 0.3, x: -10 }}
          animate={{
            opacity: animationPhase === 'delivered' ? 1 : 0.3,
            x: animationPhase === 'delivered' ? 0 : -10
          }}
          transition={{ delay: 0.4, duration: 0.4 }}
        />

        {/* Orbital trail that wraps around the entire logo */}
        <TrailPath
          d={orbitPath}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: animationPhase === 'flying' ? 1 : 0,
            opacity: animationPhase === 'flying' ? 0.6 : 0
          }}
          transition={{ 
            pathLength: { duration: 5, ease: "easeInOut" },
            opacity: { duration: 0.5 }
          }}
        />
        
        {/* Multiple orbital rings for depth - better contrast */}
        {[1, 0.85, 0.7].map((scale, ringIndex) => (
          <motion.ellipse
            key={ringIndex}
            cx={centerX}
            cy={centerY}
            rx={orbitRadius * scale}
            ry={orbitRadius * 0.8 * scale}
            fill="none"
            stroke={`rgba(32, 178, 170, ${0.6 - ringIndex * 0.15})`}
            strokeWidth={4 - ringIndex}
            strokeDasharray={ringIndex === 0 ? "15 25" : ringIndex === 1 ? "8 18" : "4 12"}
            filter={`drop-shadow(0 0 ${8 - ringIndex * 2}px rgba(32, 178, 170, ${0.7 - ringIndex * 0.2}))`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: (animationPhase === 'flying' || isHovered) ? (0.7 - ringIndex * 0.15) : 0,
              scale: (animationPhase === 'flying' || isHovered) ? (isHovered ? 1.1 : 1) : 0.8,
              rotate: (animationPhase === 'flying' || isHovered) ? (ringIndex % 2 === 0 ? 360 : -360) : 0
            }}
            transition={{ 
              opacity: { duration: 0.5 },
              scale: { duration: 0.8 },
              rotate: { 
                duration: isHovered ? 4 + ringIndex : 8 + ringIndex * 2, 
                ease: "linear", 
                repeat: (animationPhase === 'flying' || isHovered) ? Infinity : 0 
              }
            }}
          />
        ))}

        {/* Orbiting rocket that follows the orbital path */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{
            opacity: animationPhase === 'flying' ? 1 : 0,
          }}
          transition={{ duration: 0.5 }}
        >
          {/* Main rocket */}
          <motion.g
            initial={{ 
              scale: 0,
              rotate: 0
            }}
            animate={{
              scale: animationPhase === 'flying' ? 1 : 0,
              rotate: animationPhase === 'flying' ? [0, 360, 720] : 0
            }}
            transition={{ 
              scale: { duration: 0.5 },
              rotate: { duration: 6, ease: "linear" }
            }}
            style={{
              transformOrigin: `${centerX}px ${centerY}px`,
              transformBox: 'fill-box'
            }}
          >
            <motion.circle
              cx={centerX + orbitRadius}
              cy={centerY}
              r="12"
              fill="#20b2aa"
              stroke="#0e7bd7"
              strokeWidth="4"
              filter="drop-shadow(0 0 12px rgba(32, 178, 170, 0.8))"
              animate={{
                scale: (animationPhase === 'flying' || isHovered) ? [1, 1.3, 1] : 1,
                boxShadow: isHovered ? "0 0 20px rgba(32, 178, 170, 1)" : "0 0 12px rgba(32, 178, 170, 0.8)"
              }}
              transition={{
                scale: { duration: isHovered ? 0.5 : 1, repeat: Infinity, ease: "easeInOut" },
                boxShadow: { duration: 0.3 }
              }}
            />
            
            {/* Rocket glow effect */}
            <motion.circle
              cx={centerX + orbitRadius}
              cy={centerY}
              r="20"
              fill="rgba(32, 178, 170, 0.2)"
              animate={{
                opacity: (animationPhase === 'flying' || isHovered) ? [0.2, 0.5, 0.2] : 0,
                scale: (animationPhase === 'flying' || isHovered) ? [1, 1.4, 1] : 1
              }}
              transition={{
                duration: 2, 
                repeat: Infinity, 
                ease: "easeInOut"
              }}
            />
            
            {/* Rocket tail - enhanced */}
            <motion.ellipse
              cx={centerX + orbitRadius - 18}
              cy={centerY}
              rx="12"
              ry="4"
              fill="rgba(32, 178, 170, 0.8)"
              filter="drop-shadow(0 0 8px rgba(32, 178, 170, 0.6))"
              animate={{
                opacity: (animationPhase === 'flying' || isHovered) ? [0.8, 1, 0.5] : 0,
                rx: (animationPhase === 'flying' || isHovered) ? [12, 18, 12] : 12
              }}
              transition={{
                opacity: { duration: 0.3, repeat: Infinity, ease: "easeInOut" },
                rx: { duration: 0.8, repeat: Infinity, ease: "easeInOut" }
              }}
            />
            
            {/* Additional tail particles */}
            {[1, 2, 3].map((i) => (
              <motion.circle
                key={i}
                cx={centerX + orbitRadius - (15 + i * 8)}
                cy={centerY + (i % 2 === 0 ? 2 : -2)}
                r={4 - i}
                fill={`rgba(32, 178, 170, ${0.7 - i * 0.2})`}
                animate={{
                  opacity: (animationPhase === 'flying' || isHovered) ? [0, 0.8, 0] : 0,
                  scale: (animationPhase === 'flying' || isHovered) ? [0, 1, 0] : 0
                }}
                transition={{
                  duration: 1,
                  delay: i * 0.1,
                  repeat: Infinity,
                  ease: "easeOut"
                }}
              />
            ))}
          </motion.g>

          {/* Orbital particles that follow behind the rocket */}
          {Array.from({ length: 8 }).map((_, i) => {
            const particleDelay = i * 0.3
            const particleRadius = orbitRadius - (i * 5)
            return (
              <motion.g
                key={i}
                initial={{ rotate: -particleDelay * 60 }}
                animate={{
                  rotate: animationPhase === 'flying' ? [0, 360, 720] : 0
                }}
                transition={{ 
                  rotate: { duration: 6, ease: "linear", delay: particleDelay }
                }}
                style={{
                  transformOrigin: `${centerX}px ${centerY}px`,
                  transformBox: 'fill-box'
                }}
              >
                <Particle
                  cx={centerX + particleRadius}
                  cy={centerY}
                  r={6 - i}
                  initial={{ 
                    opacity: 0,
                    scale: 0
                  }}
                  animate={{
                    opacity: animationPhase === 'flying' ? [0, 0.8, 0.4, 0] : 0,
                    scale: animationPhase === 'flying' ? [0, 1, 0.5, 0] : 0
                  }}
                  transition={{
                    duration: 2,
                    delay: particleDelay,
                    ease: "easeOut"
                  }}
                />
              </motion.g>
            )
          })}
        </motion.g>

        {/* Success checkmark when delivered */}
        <motion.g
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: animationPhase === 'delivered' ? 1 : 0,
            scale: animationPhase === 'delivered' ? 1 : 0
          }}
          transition={{ delay: 0.5, duration: 0.5, type: "spring" }}
        >
          <motion.circle
            cx="350"
            cy="250"
            r="25"
            fill="rgba(32, 178, 170, 0.2)"
            stroke="#20b2aa"
            strokeWidth="3"
            initial={{ scale: 0 }}
            animate={{ 
              scale: animationPhase === 'delivered' ? [0, 1.2, 1] : 0
            }}
            transition={{ duration: 0.6, delay: 0.5 }}
          />
          <motion.path
            d="M 340 250 L 348 258 L 362 242"
            stroke="#20b2aa"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ 
              pathLength: animationPhase === 'delivered' ? 1 : 0
            }}
            transition={{ duration: 0.4, delay: 0.8 }}
          />
        </motion.g>

        {/* TurboPyme text */}
        <motion.text
          transform="translate(0 658.95)"
          fill="#082a54"
          fontFamily="Kanit-Medium, Kanit"
          fontSize="139"
          fontWeight="500"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <tspan x="0" y="0" letterSpacing="-.09em">T</tspan>
          <tspan x="65.19" y="0">ur</tspan>
          <tspan x="199.32" y="0" letterSpacing="-.02em">b</tspan>
          <tspan x="277.86" y="0">o</tspan>
          <tspan x="359.73" y="0" letterSpacing="-.04em">P</tspan>
          <tspan x="436.6" y="0">yme</tspan>
        </motion.text>

        {/* Floating success particles */}
        {animationPhase === 'delivered' && Array.from({ length: 12 }).map((_, i) => (
          <motion.circle
            key={`success-${i}`}
            r="3"
            fill="#20b2aa"
            initial={{
              cx: 350,
              cy: 250,
              opacity: 0,
              scale: 0
            }}
            animate={{
              cx: 350 + (Math.random() - 0.5) * 200,
              cy: 250 + (Math.random() - 0.5) * 200,
              opacity: [0, 1, 0],
              scale: [0, 1, 0]
            }}
            transition={{
              duration: 2,
              delay: 0.8 + i * 0.1,
              ease: "easeOut"
            }}
          />
        ))}
      </AnimatedSVG>
    </LogoContainer>
  )
}

export default CoolAnimatedLogo