import { BentoCard } from '@/components/bento-card'
import { Button } from '@/components/button'
import { Container } from '@/components/container'
import { Footer } from '@/components/footer'
import { Gradient } from '@/components/gradient'
import { HowItWorks } from '@/components/how-it-works'
import { Keyboard } from '@/components/keyboard'
import { Link } from '@/components/link'
import { LinkedAvatars } from '@/components/linked-avatars'
import { LogoCloud } from '@/components/logo-cloud'
import { LogoCluster } from '@/components/logo-cluster'
import { LogoTimeline } from '@/components/logo-timeline'
import { Map } from '@/components/map'
import { Navbar } from '@/components/navbar'
import { QuizPreview } from '@/components/quiz-preview'
import { Screenshot } from '@/components/screenshot'
import { Testimonials } from '@/components/testimonials'
import { Heading, Subheading } from '@/components/text'
import { ChevronRightIcon } from '@heroicons/react/16/solid'

export const metadata = {
  description:
    'Burnt helps professionals transition to new careers with AI-powered job matching and personalized recommendations.',
}

function Hero() {
  return (
    <div className="relative">
      <Gradient className="absolute inset-2 bottom-0 rounded-4xl ring-1 ring-black/5 ring-inset" />
      <Container className="relative">
        <Navbar
          banner={
            <Link
              href="/blog/burnt-raises-5m-seed-from-job-matching-ventures"
              className="flex items-center gap-1 rounded-full bg-amber-950/35 px-3 py-0.5 text-sm/6 font-medium text-white data-hover:bg-amber-950/30"
            >
              Burnt join Founder University
              {/* <ChevronRightIcon className="size-4" /> */}
            </Link>
          }
        />
        <div className="pt-16 pb-24 sm:pt-24 sm:pb-32 md:pt-32 md:pb-48">
          <h1 className="font-display text-6xl/[0.9] font-medium tracking-tight text-balance text-gray-950 sm:text-8xl/[0.8] md:text-9xl/[0.8]">
            Find your new path.
          </h1>
          <p className="mt-8 max-w-lg text-xl/7 font-medium text-gray-950/75 sm:text-2xl/8">
            Burnt helps professionals transition to new careers with AI-powered job matching and personalized recommendations.
          </p>
          <div className="mt-12 flex flex-col gap-x-6 gap-y-4 sm:flex-row">
            <Button href="#">Get started</Button>
          </div>
        </div>
      </Container>
    </div>
  )
}

function BentoSection() {
  return (
    <Container>
      <Subheading>Career Transition</Subheading>
      <Heading as="h3" className="mt-2 max-w-3xl">
        Personalized job matching for burnt-out professionals.
      </Heading>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-6 lg:grid-rows-1">
        <BentoCard
          eyebrow="Efficiency"
          title="Built for busy professionals"
          description="Our Tinder-style job swiping interface makes sorting through opportunities quick and intuitive, perfect for those with limited time."
          graphic={
            <div className="flex size-full pt-10 pl-10">
              <Keyboard highlighted={['LeftArrow', 'RightArrow', 'Enter']} />
            </div>
          }
          className="lg:col-span-2 lg:rounded-bl-4xl"
        />
        <BentoCard
          eyebrow="Network"
          title="Access exclusive opportunities"
          description="Tap into our proprietary network of industry contacts to secure interviews with decision-makers at leading firms."
          graphic={<LogoCluster />}
          className="lg:col-span-2"
        />
        <BentoCard
          eyebrow="Global"
          title="Find remote work anywhere"
          description="Burnt helps you discover remote opportunities across the globe, giving you the freedom to work from anywhere."
          graphic={<Map />}
          className="max-lg:rounded-b-4xl lg:col-span-2 lg:rounded-br-4xl"
        />
      </div>
    </Container>
  )
}



export default function Home() {
  return (
    <div className="overflow-hidden">
      <Hero />
      <main>
        <Container className="mt-10">
          <LogoCloud />
        </Container>
        <div className="bg-linear-to-b from-white from-50% to-gray-100 py-32">
               <BentoSection />
        </div>
        <HowItWorks />
        <QuizPreview />
      </main>
      <Footer />
    </div>
  )
}