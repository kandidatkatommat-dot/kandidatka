import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import Navbar from '@/components/shared/Navbar'
import HeroSection from '@/components/sections/HeroSection'
import BackToTop from '@/components/shared/BackToTop'
import { ErrorBoundary } from '@/components/shared/ErrorBoundary'

/* Minimal skeleton shown while a lazy section JS chunk loads */
function SectionSkeleton() {
  return <div className="h-64 rounded-3xl bg-white/[0.025] animate-pulse mx-4 my-2" />
}

/* ── Lazy-load all below-fold sections ────────────────────────────
   JS chunks load only when the browser needs them — dramatically
   reduces initial parse/execute time on all devices.              */
const AboutSection      = dynamic(() => import('@/components/sections/AboutSection'))
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
        <Suspense fallback={<SectionSkeleton />}>
          <AboutSection />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <ProgramSection />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <InsightsSection />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <TestimonialsSection />
        </Suspense>
        <ErrorBoundary>
          <Suspense fallback={<SectionSkeleton />}>
            <SocialProofSection />
          </Suspense>
        </ErrorBoundary>
        <ErrorBoundary>
          <Suspense fallback={<SectionSkeleton />}>
            <PollSection />
          </Suspense>
        </ErrorBoundary>
        <ErrorBoundary>
          <Suspense fallback={<SectionSkeleton />}>
            <SuggestionsSection />
          </Suspense>
        </ErrorBoundary>
        <div id="faq">
          <Suspense fallback={<SectionSkeleton />}>
            <FaqSection />
          </Suspense>
        </div>
        <Suspense fallback={<SectionSkeleton />}>
          <VoteSection />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <SocialSection />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
      <BackToTop />
    </>
  )
}
