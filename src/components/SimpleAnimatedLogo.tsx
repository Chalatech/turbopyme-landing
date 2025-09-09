import { motion } from 'framer-motion'
import { useState } from 'react'
import styled from '@emotion/styled'

const LogoContainer = styled(motion.div)`
  display: inline-block;
  cursor: pointer;
  position: relative;
  
  &:hover {
    transform: scale(1.02);
    transition: transform 0.3s ease;
  }
  
  svg {
    width: 100%;
    height: auto;
    max-width: 320px;
    
    @media (max-width: 768px) {
      max-width: 280px;
    }
    
    @media (max-width: 480px) {
      max-width: 240px;
    }
  }
`

const AnimatedSVG = styled(motion.svg)`
  overflow: visible;
  filter: drop-shadow(0 10px 30px rgba(0, 0, 0, 0.2));
`


interface SimpleAnimatedLogoProps {
  width?: number
  height?: number
}

const SimpleAnimatedLogo = ({ 
  width = 320, 
  height = 320
}: SimpleAnimatedLogoProps) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <LogoContainer 
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
          animate={{ 
            opacity: 1,
            fill: isHovered ? "#1e8be7" : "#0e7bd7"
          }}
          transition={{ delay: 0.2, duration: 0.6 }}
        />

        {/* Animated teal flame element */}
        <motion.path
          d="M343.09,319.22c3.05,2.96-14.79,14.13-16.83,16.19-14.19,14.31-15.25,31.79-20.78,49.59-3.96,12.75-12.34,15.55,6.22,11.63,24.56-5.18,42.47-20.03,55.65-40.69,1.62-2.53,5.63-14.24,9.27-11.82.79.53,3.17,15.47,3.3,17.82,3.63,62.84-49.68,109.02-107.18,120.23-86.68,16.89-170.71-27.24-195.95-113.15,50.9,47.88,119.38,39.35,172.01-.64,20.46-15.54,49.87-49.16,77.5-49.16,2.5,0,16.17-.58,16.78,0h0Z"
          fill="#20b2aa"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: 1,
            fill: isHovered ? "#30c2ba" : "#20b2aa",
            scale: isHovered ? [1, 1.1, 1.05, 1] : 1,
            filter: isHovered 
              ? "drop-shadow(0 0 15px rgba(32, 178, 170, 0.8))" 
              : "none"
          }}
          transition={{ 
            delay: 0.4, 
            duration: isHovered ? 0.8 : 0.6,
            scale: { 
              duration: 2, 
              repeat: isHovered ? Infinity : 0,
              ease: "easeInOut" 
            }
          }}
          style={{ 
            transformOrigin: "center center",
            filter: isHovered ? "drop-shadow(0 0 10px rgba(32, 178, 170, 0.6))" : "none"
          }}
        />

        {/* Document/Invoice parts */}
        <motion.path
          d="M164.47,383.09c-1.4,1.4-29.53-2.28-30.35-5.06V77.25c1.93-21.68,19.28-37.54,40.61-39.51h278.27c12.93.75,18.88,3.68,18.88,5.99s-25.53,19.96-28.69,23.24H181.22c-5.22-1.16-16.75,6.47-16.75,11.39v304.72h0Z"
          fill="#0e7bd7"
          initial={{ opacity: 0.8 }}
          animate={{ 
            opacity: 1,
            fill: isHovered ? "#1e8be7" : "#0e7bd7"
          }}
          transition={{ duration: 0.3 }}
        />

        <motion.path
          d="M533.61,488.63c-2.26,20.14-18.54,37.18-38.55,40.47l-320.34.17c-21.82-2.53-39.29-20.68-40.59-42.75-.11-1.85-.96-10.04,1.65-9.23,3.62,1.12,12.66,7.44,17.5,9.57,16.65,7.34,34.57,13.13,52.84,14.27,89.94,5.6,185.59-4.32,276.13,0,10.32-.21,20.44-5.98,22.04-16.93,3.63-24.85-2.69-57.35.33-83.02l29-30v117.46h-.01Z"
          fill="#0e7bd7"
          initial={{ opacity: 0.8 }}
          animate={{ 
            opacity: 1,
            fill: isHovered ? "#1e8be7" : "#0e7bd7"
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Document lines */}
        <motion.path
          d="M208.58,127.88c13.32-2.31,75.59-2.12,89.48-.16,18.1,2.55,17.45,26.56,1.09,29.03-13.29,2.01-77.75,2.15-90.76.02-15.63-2.55-15.63-26.15.19-28.89Z"
          fill="#0e7bd7"
          initial={{ opacity: 0.8 }}
          animate={{ 
            opacity: 1,
            fill: isHovered ? "#1e8be7" : "#0e7bd7"
          }}
          transition={{ delay: 0.1, duration: 0.3 }}
        />

        <motion.path
          d="M208.58,198.23c6.03-1.11,36.75-1.05,42.32.47,14.35,3.92,12.89,26.07-1.51,28.43-5.64.92-40.01.71-44.39-.92-12.47-4.68-10.58-25.37,3.58-27.97h0Z"
          fill="#0e7bd7"
          initial={{ opacity: 0.8 }}
          animate={{ 
            opacity: 1,
            fill: isHovered ? "#1e8be7" : "#0e7bd7"
          }}
          transition={{ delay: 0.2, duration: 0.3 }}
        />

        {/* TurboPyme text */}
        <motion.text
          transform="translate(0 658.95)"
          fill="#082a54"
          fontFamily="Kanit-Medium, Kanit"
          fontSize="139"
          fontWeight="500"
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: 1, 
            y: 0,
            fill: isHovered ? "#0a3464" : "#082a54"
          }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <tspan x="0" y="0" letterSpacing="-.09em">T</tspan>
          <tspan x="65.19" y="0">ur</tspan>
          <tspan x="199.32" y="0" letterSpacing="-.02em">b</tspan>
          <tspan x="277.86" y="0">o</tspan>
          <tspan x="359.73" y="0" letterSpacing="-.04em">P</tspan>
          <tspan x="436.6" y="0">yme</tspan>
        </motion.text>

        {/* Subtle teal glow effect around the flame on hover */}
        {isHovered && (
          <motion.circle
            cx={290}
            cy={370}
            r={60}
            fill="rgba(32, 178, 170, 0.1)"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0.1, 0.3, 0.1], 
              scale: [1, 1.3, 1.1]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        )}
      </AnimatedSVG>
    </LogoContainer>
  )
}

export default SimpleAnimatedLogo