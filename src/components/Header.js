'use client'
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation";

const StorefrontIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="#6b7280">
      <path d="M841-518v318q0 33-23.5 56.5T761-120H201q-33 0-56.5-23.5T121-200v-318q-23-21-35.5-54t-.5-72l42-136q8-26 28.5-43t47.5-17h556q27 0 47 16.5t29 43.5l42 136q12 39-.5 71T841-518Zm-272-42q27 0 41-18.5t11-41.5l-22-140h-78v148q0 21 14 36.5t34 15.5Zm-180 0q23 0 37.5-15.5T441-612v-148h-78l-22 140q-4 24 10.5 42t37.5 18Zm-178 0q18 0 31.5-13t16.5-33l22-154h-78l-40 134q-6 20 6.5 43t41.5 23Zm540 0q29 0 42-23t6-43l-42-134h-76l22 154q3 20 16.5 33t31.5 13ZM201-200h560v-282q-5 2-6.5 2H751q-27 0-47.5-9T663-518q-18 18-41 28t-49 10q-27 0-50.5-10T481-518q-17 18-39.5 28T393-480q-29 0-52.5-10T299-518q-21 21-41.5 29.5T211-480h-4.5q-2.5 0-5.5-2v282Zm560 0H201h560Z"/>
    </svg>
  )
}

export default function Header() {
  const { user } = useUser();
  const pathname = usePathname();

  // Hide navigation links on sign-in page
  const showNav = !pathname?.includes('/sign-in');
  const showBackground = !pathname?.includes('/sign-in');

  return <div className={`absolute top-0 left-0 w-full z-10 ${showBackground ? 'bg-gray-600/50' : ''}`}>
    <nav
      className={`flex w-full items-center ${showBackground ? 'border-b border-border-primary' : ''} bg-background-primary lg:min-h-18 lg:px-[5%] py-2`}
    >
      <div className="size-full lg:flex lg:items-center lg:justify-between">
        <div
          className="flex min-h-16 items-center justify-between px-[5%] md:min-h-18 lg:min-h-full lg:px-0"
        >
          <Link href="/">
            <p className="tracking-tighter text-black">
              <span className="font-sans font-normal text-lg xs:text-2xl xl:text-3xl">MyChurch</span>
              <span className="font-serif italic font-normal text-xl xs:text-3xl xl:text-4xl">Works</span>
            </p>
          </Link>
          <button className="-mr-2 flex size-12 flex-col items-center justify-center lg:hidden">
            <span className="my-[3px] h-0.5 w-6 bg-black" style={{willChange: "transform"}}></span>
            <span className="my-[3px] h-0.5 w-6 bg-black"></span>
            <span className="my-[3px] h-0.5 w-6 bg-black" style={{willChange: "transform"}}></span>
          </button>
        </div>
        {showNav && (
          <div
            className="overflow-hidden px-[5%] lg:flex lg:items-center lg:px-0 lg:[--height-closed:auto] lg:[--height-open:auto]"
            style={{height: "var(--height-closed, 0)"}}
          >
            <SignedIn>
              <div className="flex flex-row gap-4 first:pt-4 lg:first:pt-0 items-center">
                <Link href="/search-results">All Listings</Link>
                <Link href="/categories/all">Categories</Link>
                <Link href="/bookmarks">My Saved Listings</Link>
                <p className="py-3 text-md lg:px-4 lg:py-2 lg:text-xl">Welcome, {user?.firstName}</p>
              </div>
            </SignedIn>
            <div className="mt-6 flex flex-col items-center gap-4 lg:ml-4 lg:mt-0 lg:flex-row">
              <SignedIn>
                <UserButton>
                  <UserButton.UserProfilePage label="My Listings" url="custom" labelIcon={<StorefrontIcon />} >
                    <div className="h-full w-full flex flex-col items-center justify-center">
                      <h1>My Listings</h1>
                      <p>This is a custom page</p>
                    </div>
                  </UserButton.UserProfilePage>
                </UserButton>
              </SignedIn>
              <SignedOut>
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
                    bg-transparent
                    border-2
                    rounded-full
                    sm:leading-8
                    text-white
                    border-primary
                    hover:bg-white
                    focus:outline-none
                    hover:text-black
                    sm:text-lg
                    focus:ring-offset-secondary
                  "
                  role="button"
                >
                  Sign In
                </Link>
              </SignedOut>
            </div>
          </div>
        )}
      </div>
    </nav>
  </div>;
}
