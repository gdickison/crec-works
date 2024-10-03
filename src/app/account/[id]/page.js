import Link from "next/link";

export default async function Account() {

  return (
    <div className="pt-20 w-full">
      <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
        <div className="flex flex-col items-center gap-4">
          <h1 className="mb-5 text-4xl font-semibold md:mb-6 md:text-7xl lg:text-8xl">Account Settings</h1>
          <p className="md:text-3xl">
            Coming soon...
          </p>
          <div className="flex gap-4">
            <Link href="/create-listing" className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded w-48 text-center">
              Create a Listing
            </Link>
            <Link href="/" className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded w-48 text-center">
              Home
            </Link>

          </div>
        </div>
      </section>
    </div>
  )
}
