import Navbar from '@/components/shared/Navbar'
import Footer from '@/components/shared/Footer'
import HeroSection from '@/components/sections/HeroSection'
import AboutSection from '@/components/sections/AboutSection'
import ProgramSection from '@/components/sections/ProgramSection'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import SocialProofSection from '@/components/sections/SocialProofSection'
import PollSection from '@/components/sections/PollSection'
import SuggestionsSection from '@/components/sections/SuggestionsSection'
import FaqSection from '@/components/sections/FaqSection'
import VoteSection from '@/components/sections/VoteSection'
import SocialSection from '@/components/sections/SocialSection'
import InsightsSection from '@/components/sections/InsightsSection'
import { ErrorBoundary } from '@/components/shared/ErrorBoundary'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ProgramSection />
        <InsightsSection />
        <TestimonialsSection />
        <ErrorBoundary>
          <SocialProofSection />
        </ErrorBoundary>
        <ErrorBoundary>
          <PollSection />
        </ErrorBoundary>
        <ErrorBoundary>
          <SuggestionsSection />
        </ErrorBoundary>
        <div id="faq">
          <FaqSection />
        </div>
        <VoteSection />
        <SocialSection />
      </main>
      <Footer />
    </>
  )
}
