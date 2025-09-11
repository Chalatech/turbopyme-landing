import styled from '@emotion/styled'
import { HiMail, HiPhone, HiLocationMarker } from 'react-icons/hi'
import { FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa'

const FooterContainer = styled.footer`
  background: #1a202c;
  color: white;
  padding: 4rem 2rem 2rem;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: #0e7bd7;
  }
`

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 3rem;
  margin-bottom: 3rem;
`

const FooterSection = styled.div``

const FooterTitle = styled.h4`
  font-size: 1.3rem;
  margin-bottom: 1.5rem;
  color: #0e7bd7;
`

const FooterText = styled.p`
  color: #cbd5e0;
  line-height: 1.8;
  margin-bottom: 1rem;
`

const FooterList = styled.ul`
  list-style: none;
  padding: 0;
`

const FooterLink = styled.li`
  margin-bottom: 0.8rem;
  
  a {
    color: #cbd5e0;
    text-decoration: none;
    transition: color 0.3s ease;
    
    &:hover {
      color: #0e7bd7;
    }
  }
`

const ContactInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  color: #cbd5e0;
  
  svg {
    margin-right: 0.75rem;
    width: 18px;
    height: 18px;
    color: #0e7bd7;
    flex-shrink: 0;
  }
`

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
`

const SocialLink = styled.a`
  width: 40px;
  height: 40px;
  background: rgba(14, 123, 215, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #0e7bd7;
  text-decoration: none;
  transition: all 0.3s ease;
  
  svg {
    width: 18px;
    height: 18px;
  }
  
  &:hover {
    background: #0e7bd7;
    color: white;
    transform: translateY(-3px);
  }
`

const FooterBottom = styled.div`
  text-align: center;
  padding-top: 2rem;
  border-top: 1px solid #2d3748;
  color: #718096;
`

const Logo = styled.img`
  height: 50px;
  margin-bottom: 1rem;
  filter: brightness(0) invert(1);
  opacity: 0.9;
`

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <Logo src="/turboPyme_texto.svg" alt="TurboPyme" />
          <FooterText>
            La solución más completa para la facturación electrónica en El Salvador.
            Automatiza tu proceso con Hacienda de forma simple y confiable.
          </FooterText>
          {/* <SocialLinks>
            <SocialLink href="#" aria-label="Facebook">
              <FaFacebook />
            </SocialLink>
            <SocialLink href="#" aria-label="Twitter">
              <FaTwitter />
            </SocialLink>
            <SocialLink href="#" aria-label="LinkedIn">
              <FaLinkedin />
            </SocialLink>
          </SocialLinks> */}
        </FooterSection>
        
        <FooterSection>
          <FooterTitle>Productos</FooterTitle>
          <FooterList>
            <FooterLink><a href="#pricing-plans">Plan Personal</a></FooterLink>
            <FooterLink><a href="#pricing-plans">Plan Microempresa</a></FooterLink>
            <FooterLink><a href="#pricing-plans">Plan Básico</a></FooterLink>
            <FooterLink><a href="#pricing-plans">Plan Pro</a></FooterLink>
            <FooterLink><a href="#pricing-plans">Plan Enterprise</a></FooterLink>
          </FooterList>
        </FooterSection>
        
        
        <FooterSection>
          <FooterTitle>Contacto</FooterTitle>
          <ContactInfo>
            <HiMail />
            <a href="mailto:info@turbopyme.com" style={{ color: 'inherit', textDecoration: 'none' }}>info@turbopyme.com</a>
          </ContactInfo>
          {/* <ContactInfo>
            <HiPhone />
            <span>+503 2222-3333</span>
          </ContactInfo> */}
          <ContactInfo>
            <HiLocationMarker />
            <span>Chalatenango, El Salvador</span>
          </ContactInfo>
        </FooterSection>
      </FooterContent>
      
      <FooterBottom>
        <p>&copy; {new Date().getFullYear()} TurboPyme. Todos los derechos reservados.</p>
      </FooterBottom>
    </FooterContainer>
  )
}

export default Footer