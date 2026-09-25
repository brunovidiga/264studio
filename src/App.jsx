import { useEffect } from 'react'
import Header from './components/Header'
import HeroSection from './components/HeroSection'
import PhoneGallery from './components/PhoneGallery'
import BudgetCTA from './components/BudgetCTA'
import ContactSection from './components/ContactSection'
import Footer from './components/Footer'
import VideoSection from './components/VideoSection'
import ManifestoSection from './components/ManifestoSection'
import StatementSection from './components/StatementSection'
import AboutSection from './components/AboutSection'
import ServicesStack from './components/ServicesStack'
import ClientsCarousel from './components/ClientsCarousel'
import ProjectsSection from './components/ProjectsSection'
import TargetAudienceSection from './components/TargetAudienceSection'
import WorkflowSection from './components/WorkflowSection'
import CreatorSection from './components/CreatorSection'
import SkillsCarousel from './components/SkillsCarousel'


function App() {
  useEffect(() => {
    const blockMenu = (e) => e.preventDefault()
    const blockDrag = (e) => {
      if (e.target instanceof HTMLImageElement || e.target instanceof HTMLVideoElement) e.preventDefault()
    }
    document.addEventListener('contextmenu', blockMenu)
    document.addEventListener('dragstart', blockDrag)
    return () => {
      document.removeEventListener('contextmenu', blockMenu)
      document.removeEventListener('dragstart', blockDrag)
    }
  }, [])

  return (
    <div className="min-h-screen bg-black text-white selection:bg-[#fa6851] selection:text-black">
      <Header />
      <HeroSection />
      <VideoSection />
      <ManifestoSection />
      <StatementSection />
      <AboutSection />
      <ServicesStack />
      <ClientsCarousel />
      <ProjectsSection />
      <TargetAudienceSection />
      <WorkflowSection />

      <CreatorSection />
      <SkillsCarousel />
      <PhoneGallery />
      <BudgetCTA />
      <ContactSection />
      <Footer />
    </div>
  )
}

export default App
