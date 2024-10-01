"use client";
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { account } from "../app/appwrite";
import { useState, useEffect } from "react";

const Header = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await account.get();
      setLoggedInUser(user);
    };
    fetchUser();
  }, []);

  const logout = async () => {
    const session = await account.deleteSession("current");
    setLoggedInUser(null);
  };

  return <div className="absolute top-0 left-0 w-full z-10 bg-gray-600/50">
    <nav
      className="flex w-full items-center border-b border-border-primary bg-background-primary lg:min-h-18 lg:px-[5%] py-2"
    >
      <div className="size-full lg:flex lg:items-center lg:justify-between">
        <div
          className="flex min-h-16 items-center justify-between px-[5%] md:min-h-18 lg:min-h-full lg:px-0"
        >
          <Link href="/">
            <p className="tracking-tighter text-black">
              <span className="font-sans font-normal text-lg xs:text-2xl xl:text-3xl">CREC</span>
              <span className="font-serif italic font-normal text-xl xs:text-3xl xl:text-4xl">Works</span>
            </p>
          </Link>
          <button className="-mr-2 flex size-12 flex-col items-center justify-center lg:hidden">
            <span className="my-[3px] h-0.5 w-6 bg-black" style={{willChange: "transform"}}></span>
            <span className="my-[3px] h-0.5 w-6 bg-black"></span>
            <span className="my-[3px] h-0.5 w-6 bg-black" style={{willChange: "transform"}}></span>
          </button>
        </div>
        <div
          className="overflow-hidden px-[5%] lg:flex lg:items-center lg:px-0 lg:[--height-closed:auto] lg:[--height-open:auto]"
          style={{height: "var(--height-closed, 0)"}}
        >
          <div className="first:pt-4 lg:first:pt-0">
            <a href={`/account/${loggedInUser?.$id}`} className="block py-3 text-md lg:px-4 lg:py-2 lg:text-xl">Welcome, {loggedInUser?.name}</a>
          </div>
          <div className="mt-6 flex flex-col items-center gap-4 lg:ml-4 lg:mt-0 lg:flex-row">
            {loggedInUser ? (
              <button
                type="button"
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
                onClick={logout}
              >
                Logout
              </button>
            ) :
            (
              <>
                <Link
                  href="/sign-up"
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
                  Sign Up
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
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  </div>;
};

export default Header;
