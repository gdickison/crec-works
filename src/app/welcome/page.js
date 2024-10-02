/* eslint-disable @next/next/no-img-element */
import { getLoggedInUser, setUserChurch } from "@/app/appwrite/config";
import { redirect } from "next/navigation";

export default async function Welcome() {
  const user = await getLoggedInUser();
  if (!user) {
    redirect('/sign-in');
  }

  async function handleChurchSelection(formData) {
    'use server'
    const data = Object.fromEntries(formData);

    await setUserChurch(user.$id, data.church)

    redirect('/search-results');
  }

  return (
    <div>
      <section>
        <div
          className="relative grid h-screen grid-cols-1 items-stretch justify-center overflow-auto lg:grid-cols-2"
        >
          <div
            className="relative mx-[5vw] flex items-center justify-center pb-16 pt-20 md:pb-20 md:pt-24 lg:py-20"
          >
            <div className="container max-w-lg">
              <div className="container mb-6 max-w-lg text-center md:mb-8 space-y-4">
                <h1 className="mb-5 text-3xl md:mb-6 md:text-4xl lg:text-5xl">Welcome, {user.name}</h1>
                <p className="md:text-md">crecWorks is a private directory for church members to find and connect with businesses run by fellow church members.</p>
                <p className="md:text-md">Finish setting up your account by selecting your church below.</p>
              </div>
              <form action={handleChurchSelection} className="grid grid-cols-1 gap-6">
                <div>
                  <label htmlFor="church" className="sr-only">
                    Church
                  </label>
                  <select
                    id="church"
                    name="church"
                    className="block w-full px-6 py-4 text-base text-center text-gray-900 placeholder-gray-600 bg-white border border-gray-200 rounded-xl focus:bg-white focus:border-blue-600 focus:ring-1 focus:ring-blue-600 focus:outline-none"
                    required
                  >
                    <option>Select Your Church</option>
                    <option>Christ Church - Moscow, ID</option>
                    <option>King&apos;s Cross - Moscow, ID</option>
                    <option>Providence Church - Pensacola, FL</option>
                  </select>
                </div>
                <div className="flex items-center justify-center">
                  <input id="accept-terms" name="accept-terms" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"/>
                  <label htmlFor="accept-terms" className="ml-3 block text-sm leading-6 text-gray-900">I accept the <a href="#" className="underline text-blue-600 hover:text-blue-700">terms and conditions</a></label>
                </div>
                <div className="grid-col-1 grid gap-4">
                  <button
                    type="submit"
                    className="border-gray-200 rounded-xl focus-visible:ring-border-primary inline-flex gap-3 items-center justify-center whitespace-nowrap ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-border-primary bg-background-alternative text-text-alternative px-6 py-4 bg-gray-900 text-gray-100 hover:bg-gray-300 hover:text-gray-900"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="hidden bg-background-secondary lg:block">
            <img
              src="/images/business_open_sm.jpg"
              alt="Relume placeholder image"
              className="h-full w-full object-fit"
            />
          </div>
        </div>
      </section>
    </div>
  )
}
