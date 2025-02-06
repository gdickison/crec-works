import Link from "next/link";

function CallToAction() {
  return (
    <div className='flex flex-col mx-auto gap-4'>
      <p className="font-sans text-xl font-normal text-white flex flex-col sm:flex-row sm:gap-2 items-center justify-center"><span>List from $0 to $5.00/month. </span><span>Search for free.</span></p>
      <div className="flex flex-col sm:flex-row justify-center items-center gap-2">
        <Link
          href="/sign-in"
          title=""
          className="
            inline-flex
            items-center
            justify-center
            px-5
            py-2
            font-sans
            text-base
            font-semibold
            transition-all
            duration-200
            border-2 border-transparent
            rounded-full
            sm:leading-8
            bg-white
            sm:text-lg
            text-black
            hover:bg-opacity-90
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary focus:ring-offset-secondary
          "
          role="button"
        >
          List Your Business
        </Link>
        <Link
          href="/sign-in"
          title=""
          className="
            inline-flex
            items-center
            justify-center
            px-5
            py-2
            font-sans
            text-base
            font-semibold
            transition-all
            duration-200
            border-2 border-transparent
            rounded-full
            sm:leading-8
            bg-white
            sm:text-lg
            text-black
            hover:bg-opacity-90
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary focus:ring-offset-secondary
          "
          role="button"
        >
          Create a Free Account
        </Link>
      </div>
    </div>
  )
}

export default CallToAction
