import dynamic from 'next/dynamic'
import Navbar from '@/components/shared/Navbar'
import HeroSection from '@/components/sections/HeroSection'
import AboutSection from '@/components/sections/AboutSection'
import { ErrorBoundary } from '@/components/shared/ErrorBoundary'

/* ── Lazy-load all below-fold sections ────────────────────────────
   JS chunks load only when the browser needs them — dramatically
   reduces initial parse/execute time on all devices.              */
const ProgramSection    = dynamic(() => import('@/components/sections/ProgramSection'))
const InsightsSection   = dynamic(() => import('@/components/sections/InsightsSection'))
const TestimonialsSection = dynamic(() => import('@/components/sections/TestimonialsSection'))
const SocialProofSection  = dynamic(() => import('@/components/sections/SocialProofSection'))
const PollSection       = dynamic(() => import('@/components/sections/PollSection'))
const SuggestionsSection = dynamic(() => import('@/components/sections/SuggestionsSection'))
const FaqSection        = dynamic(() => import('@/components/sections/FaqSection'))
const VoteSection       = dynamic(() => import('@/components/sections/VoteSection'))
const SocialSection     = dynamic(() => import('@/components/sections/SocialSection'))
const Footer            = dynamic(() => import('@/components/shared/Footer'))

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
