'use client'
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation";

const StorefrontIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="#6b7280">
      <path d="M520-600v-240h320v240H520ZM120-440v-400h320v400H120Zm400 320v-400h320v400H520Zm-400 0v-240h320v240H120Zm80-400h160v-240H200v240Zm400 320h160v-240H600v240Zm0-480h160v-80H600v80ZM200-200h160v-80H200v80Zm160-320Zm240-160Zm0 240ZM360-280Z"/>
    </svg>
  )
}

export default function Header({children}) {
  const { user } = useUser();
  const pathname = usePathname();

  // Hide navigation links on sign-in page
  const showNav = !pathname?.includes('/sign-in');
  const showBackground = !pathname?.includes('/sign-in');

  return (
    <div className={`absolute top-0 left-0 w-full z-10 ${showBackground ? 'bg-gray-600/50' : ''}`}>
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
                    <UserButton.UserProfileLink label="My Dashboard" url="/user-dashboard" labelIcon={<StorefrontIcon />} />
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
    </div>
  );
}
