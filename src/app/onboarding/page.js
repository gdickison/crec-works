import { getChurches } from '@/app/actions'
import OnboardingForm from '@/components/OnboardingForm'

export default async function OnboardingPage() {
  const churches = await getChurches()

  return (
    <section className="relative pt-24">
      <div className="flex flex-col w-full max-w-5xl mx-auto px-4 justify-between">
        <div className="flex items-center">
          <h1 className="text-xl font-bold md:text-2xl">Welcome</h1>
        </div>
        <div>
          <p className="mt-4 text-gray-600">To create an account you must be a member in good standing of a CREC church. Please enter your name and contact information, and select your church from the list below.</p>
          <OnboardingForm churches={churches} href={'/'} />
        </div>
      </div>
    </section>
  )
}

