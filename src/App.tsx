import { css, Global } from '@emotion/react'
import styled from '@emotion/styled'
import Hero from './components/Hero'
import PricingPlans from './components/PricingPlans'
import Features from './components/Features'
import Footer from './components/Footer'

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
  return (
    <>
      <Global styles={GlobalStyles} />
      <AppContainer>
        <Hero />
        <Features />
        <PricingPlans />
        <Footer />
      </AppContainer>
    </>
  )
}

export default App
