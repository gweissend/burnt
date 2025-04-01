import { Container } from '@/components/container'
import { Heading, Subheading } from '@/components/text'

const steps = [
  {
    name: 'Take our personality quiz',
    description:
      'Spend just 5 minutes answering fun questions about your work style, passions, and dream environment. Our quiz reveals hidden talents you never knew you had!',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-1.17 1.025-3.07 1.025-4.242 0-1.172-1.025-1.172-2.687 0-3.712Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-1.17 1.025-3.07 1.025-4.242 0-1.172-1.025-1.172-2.687 0-3.712Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 12.75c1.148 0 2.278.08 3.383.237 1.037.146 1.866.966 1.866 2.013 0 3.728-2.35 6.75-5.25 6.75S6.75 18.728 6.75 15c0-1.046.83-1.867 1.866-2.013A24.204 24.204 0 0 1 12 12.75Z" />
      </svg>
    ),
  },
  {
    name: 'Tell us what you love (or hate)',
    description:
      'Give thumbs up or down on industries and roles. Our AI learns your preferences in real-time, delivering increasingly perfect job matches with every swipe!',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
      </svg>
    ),
  },
  {
    name: 'Review Recommendations',
    description:
      'Identify new roles based on your specific desires. Apply to the ones your like.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
      </svg>
    ),
  },
  {
    name: 'Land your next job ',
    description:
      'We connect you directly with hiring managers through our insider network. Skip the application black hole and fast-track your way to interviews !',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z" />
      </svg>
    ),
  },
]

export function HowItWorks() {
  return (
    <div className="py-24 sm:py-32">
      <Container>
        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
          <Subheading>How it works</Subheading>
          <Heading as="h2" className="mt-2 max-w-3xl">
            Four steps to your exciting new career
          </Heading>
          <div className="mt-10 max-w-xl text-base/7 leading-7 text-gray-700 lg:max-w-none">
            <p>
              Our fast-paced process gets you from burnt-out to fired-up in record time. 
              No more endless job searches or waiting for callbacks!
            </p>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:grid-cols-4">
            {steps.map((step, stepIdx) => (
              <div key={step.name} className="relative">
                <div className="flex items-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 text-amber-600">
                    {step.icon}
                  </div>
                  <div aria-hidden="true" className="absolute -ml-6 h-px w-screen -translate-x-full bg-gray-200 sm:-ml-8 lg:static lg:-mr-6 lg:ml-8 lg:w-auto lg:flex-auto lg:translate-x-0" />
                  <span className="ml-4 flex h-8 w-8 items-center justify-center rounded-full border border-amber-600 bg-white text-sm font-semibold text-amber-600">
                    {stepIdx + 1}
                  </span>
                </div>
                <h3 className="mt-6 text-lg/8 font-semibold tracking-tight text-gray-900">{step.name}</h3>
                <p className="mt-2 text-base/7 text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  )
}

// Also export as default for flexibility
export default HowItWorks;