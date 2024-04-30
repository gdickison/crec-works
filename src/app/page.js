/* eslint-disable @next/next/no-img-element */

export default function Home() {
  return (
    <div class="relative pt-48 pb-12 bg-black xl:pt-60 sm:pb-16 lg:pb-32 xl:pb-48 2xl:pb-56">
      <div class="absolute inset-0">
        <img class="object-cover w-full h-full opacity-[65%]" src="/images/farm_work.jpg" alt="" />
      </div>

      <div class="relative">
        <div class="px-6 mx-auto sm:px-8 lg:px-12 max-w-7xl">
          <div class="w-full lg:w-2/3">
            <h1 class="font-sans text-base font-normal tracking-tight text-white text-opacity-70">The business directory for members of the Communion of Reformed Evangelical Churches</h1>
            <p class="mt-6 tracking-tighter text-white">
              <span class="font-sans font-normal text-7xl">CREC</span><br />
              <span class="font-serif italic font-normal text-8xl">Works</span>
            </p>
            <p class="mt-12 font-sans text-xl font-normal leading-7 text-white text-opacity-70">Search for a business</p>
            <p class="mt-8 font-sans text-xl font-normal text-white">List from $0 to $5.00/month. Search for free.</p>

            <div class="flex items-center mt-5 space-x-3 sm:space-x-4">
              <a
                href="#"
                title=""
                class="
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
              </a>

              <a
                href="#"
                title=""
                class="
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
                  bg-transparent
                  border-2
                  rounded-full
                  sm:leading-8
                  text-white
                  border-primary
                  hover:bg-white
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary
                  hover:text-black
                  sm:text-lg
                  focus:ring-offset-secondary
                "
                role="button"
              >
                Sign In / Sign Up
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
