'use client'
import { useState } from 'react'
import { RadioGroup } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/20/solid'
import { useRouter } from 'next/navigation'

const frequencies = [
  { value: 'monthly', label: 'Monthly', priceSuffix: '/month' },
  { value: 'annually', label: 'Annually', priceSuffix: '/year' },
]
const tiers = [
  {
    name: 'Congregational',
    id: 'tier-congregational',
    price: {
      monthly: {
        amount: '$0',
        link: '/create-listing/congregational'
      },
      annually: {
        amount: '$0',
        link: '/create-listing/congregational'
      }
    },
    description: 'Advertise to your local congregation.',
    features: [
      'Your local church',
      'Full business listing',
      'Full keyword search'
    ],
    mostPopular: false,
    action: 'Get'
  },
  {
    name: 'Regional',
    id: 'tier-regional',
    price: {
      monthly: {
        amount: '$2',
        link: 'https://buy.stripe.com/8wM16u1T63rIb0Q5kn'
      },
      annually: {
        amount: '$20',
        link: 'https://buy.stripe.com/6oEbL8eFSe6m9WMeUW'
      }
    },
    description: 'Advertise to your physical service region.',
    features: [
      'All CREC churches in region',
      'Full business listing',
      'Full keyword search',
      'Public search option',
      'Search analytics (coming soon)'
    ],
    mostPopular: false,
    action: 'Buy'
  },
  {
    name: 'National',
    id: 'tier-national',
    price: {
      monthly: {
        amount: '$5',
        link: 'https://buy.stripe.com/9AQ8yW69maUa5Gw289'
        // link: 'https://buy.stripe.com/test_00g4hL5uD8pScKI3cc'
      },
      annually: {
        amount: '$50',
        link: 'https://buy.stripe.com/14k7uSbtG3rI4Cs3cc'
      }
    },
    description: 'Perfect for remote businesses.',
    features: [
      'All CREC churches',
      'Full business listing',
      'Full keyword search',
      'Public search option',
      'Search analytics (coming soon)'
    ],
    mostPopular: false,
    action: 'Buy'
  },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Pricing() {
  const [frequency, setFrequency] = useState(frequencies[0])
  const router = useRouter()

  const handlePlanSelect = (tier) => {
    if (tier.id === 'tier-congregational') {
      // Free plan - go directly to listing form
      router.push(`/create-listing/${tier.id}`)
      return
    }

    // For paid plans, open the Stripe payment link in a new tab
    window.open(tier.price[frequency.value].link, '_blank')
  }

  return (
    <div className="bg-white py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">Pricing</h2>
          <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Pricing plans based on your market size
          </p>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-600">
          Choose an affordable plan that reaches your target market.
        </p>
        <div className="mt-16 flex justify-center">
          <RadioGroup
            value={frequency}
            onChange={setFrequency}
            className="grid grid-cols-2 gap-x-1 rounded-full p-1 text-center text-xs font-semibold leading-5 ring-1 ring-inset ring-gray-200"
          >
            <RadioGroup.Label className="sr-only">Payment frequency</RadioGroup.Label>
            {frequencies.map((option) => (
              <RadioGroup.Option
                key={option.value}
                value={option}
                className={({ checked }) =>
                  classNames(
                    checked ? 'bg-indigo-600 text-white' : 'text-gray-500',
                    'cursor-pointer rounded-full px-2.5 py-1'
                  )
                }
              >
                <span>{option.label}</span>
              </RadioGroup.Option>
            ))}
          </RadioGroup>
        </div>
        <div className="isolate mx-auto mt-10 grid max-w-md grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {tiers.map((tier) => (
            <div
              key={tier.id}
              className={classNames(
                tier.mostPopular ? 'ring-2 ring-indigo-600' : 'ring-1 ring-gray-200',
                'rounded-3xl p-8 xl:p-10'
              )}
            >
              <div className="flex items-center justify-between gap-x-4">
                <h3
                  id={tier.id}
                  className={classNames(
                    tier.mostPopular ? 'text-indigo-600' : 'text-gray-900',
                    'text-lg font-semibold leading-8'
                  )}
                >
                  {tier.name}
                </h3>
                {tier.mostPopular ? (
                  <p className="rounded-full bg-indigo-600/10 px-2.5 py-1 text-xs font-semibold leading-5 text-indigo-600">
                    Most popular
                  </p>
                ) : null}
              </div>
              <p className="mt-4 text-sm leading-6 text-gray-600">{tier.description}</p>
              <p className="mt-6 flex items-baseline gap-x-1">
                <span className="text-4xl font-bold tracking-tight text-gray-900">{tier.price[frequency.value].amount}</span>
                <span className="text-sm font-semibold leading-6 text-gray-600">{frequency.priceSuffix}</span>
              </p>
              <button
                onClick={() => handlePlanSelect(tier)}
                className={classNames(
                  tier.mostPopular
                    ? 'bg-indigo-600 text-white shadow-sm hover:bg-indigo-500'
                    : 'text-indigo-600 ring-1 ring-inset ring-indigo-200 hover:ring-indigo-300',
                  'mt-6 block w-full rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                )}
              >
                {tier.action} plan
              </button>
              <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-gray-600 xl:mt-10">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex gap-x-3">
                    <CheckIcon className="h-6 w-5 flex-none text-indigo-600" aria-hidden="true" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <section id="relume" className="hidden lg:block px-[5%] py-12">
          <div className="container text-center relative border-2 border-indigo-600/10">
            <h1 className="absolute top-10 left-48 w-56 bg-indigo-600/10 -rotate-45 z-10 font-bold text-2xl text-indigo-600 rounded-md">Coming soon</h1>
            <h2 className="rb-5 mb-5 text-5xl font-semibold md:mb-6">
              For Churches
            </h2>
            <p className="md:text-xl">
              Get a branded directory for your congregation.
            </p>
            {/* <div className="mt-6 flex items-center justify-center gap-4 md:mt-8">
              <button
                className="focus-visible:ring-border-primary inline-flex gap-3 items-center justify-center whitespace-nowrap ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-border-primary text-text-primary bg-background-primary px-6 py-3 bg-indigo-600 text-white shadow-sm hover:bg-indigo-500 rounded-lg w-96"
                title="Button"
              >
                Get Started
              </button>
            </div> */}
          </div>
        </section>
      </div>
    </div>
  )
}
