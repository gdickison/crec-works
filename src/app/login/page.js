/* eslint-disable @next/next/no-img-element */
"use client";
import { useState } from "react";
import { account, ID } from "../appwrite";
import Link from "next/link";
const LoginPage = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const login = async (email, password) => {
    const session = await account.createEmailPasswordSession(email, password);
    setLoggedInUser(await account.get());
  };

  const register = async () => {
    await account.create(ID.unique(), email, password, name);
    login(email, password);
  };

  const logout = async () => {
    await account.deleteSession("current");
    setLoggedInUser(null);
  };
  if (loggedInUser) {
    console.log('loggedInUser', loggedInUser)
    return (
      <div>
        <p>Logged in as {loggedInUser.name}</p>
        <button type="button" onClick={logout}>
          Logout
        </button>
      </div>
    );
  }

  return (
    <div>
      <section>
        <div
          className="relative grid h-screen grid-cols-1 items-stretch justify-center overflow-auto lg:grid-cols-2"
        >
          <div
            className="absolute bottom-auto left-0 right-0 top-0 z-10 flex h-16 w-full items-center justify-center px-[5%] md:h-18 lg:justify-between"
          >
            <Link href="/">
              <p className="mt-2 md:mt-4 lg:mt-6 tracking-tighter text-black">
                <span className="font-sans font-normal text-2xl xs:text-4xl xl:text-5xl">CREC</span>
              <span className="font-serif italic font-normal text-3xl xs:text-5xl xl:text-6xl">Works</span>
            </p>
            </Link>
          </div>
          <div
            className="relative mx-[5vw] flex items-center justify-center pb-16 pt-20 md:pb-20 md:pt-24 lg:py-20"
          >
            <div className="container max-w-sm">
              <div className="container mb-6 max-w-lg text-center md:mb-8">
                <h1 className="mb-5 text-5xl font-semibold md:mb-6 md:text-7xl lg:text-8xl">Sign Up</h1>
                <p className="md:text-md">Sign in to your account to access the full directory.</p>
              </div>
              <form className="grid grid-cols-1 gap-6">
                <div className="grid w-full items-center">
                  <label className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2" htmlFor="name">
                    Name*
                  </label>
                  <div className="relative flex size-full items-center">
                    <input
                      type="text"
                      className="flex size-full min-h-11 border border-border-primary bg-background-primary py-2 align-middle file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 px-3"
                      id="text"
                      // required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="grid w-full items-center">
                  <label
                    className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2"
                    htmlFor="email"
                  >
                    Email*
                  </label>
                  <div className="relative flex size-full items-center">
                    <input
                      type="email"
                      className="flex size-full min-h-11 border border-border-primary bg-background-primary py-2 align-middle file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 px-3"
                      id="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div className="grid w-full items-center">
                  <label
                    className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2"
                    htmlFor="password"
                  >
                    Password*
                  </label>
                  <div className="relative flex size-full items-center">
                    <input
                      type="password"
                      className="flex size-full min-h-11 border border-border-primary bg-background-primary py-2 align-middle file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 px-3"
                      id="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
                <div className="grid-col-1 grid gap-4">
                  <button
                    type="button"
                    className="focus-visible:ring-border-primary inline-flex gap-3 items-center justify-center whitespace-nowrap ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-border-primary bg-background-alternative text-text-alternative px-6 py-3 hover:bg-gray-900 hover:text-gray-100"
                    onClick={() => login(email, password)}
                  >
                    Sign in
                  </button>
                  <button
                    type="button"
                    className="focus-visible:ring-border-primary inline-flex gap-3 items-center justify-center whitespace-nowrap ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-border-primary bg-background-alternative text-text-alternative px-6 py-3 hover:bg-gray-900 hover:text-gray-100"
                    onClick={register}
                  >
                    Sign up
                  </button>
                  {/* <button
                    type="button"
                    className="focus-visible:ring-border-primary inline-flex gap-3 items-center justify-center whitespace-nowrap ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-border-primary text-text-primary bg-background-primary px-6 py-3 gap-x-3"
                  >
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      viewBox="0 0 24 24"
                      className="size-6"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"
                      ></path>
                    </svg>
                      Sign up with Google
                  </button> */}
                </div>
              </form>
              <div
                className="mt-5 inline-flex w-full items-center justify-center gap-x-1 text-center md:mt-6"
              >
                <p>Already have an account?</p>
                <a href="#" className="underline">Log in</a>
              </div>
            </div>
          </div>
          <div className="hidden bg-background-secondary lg:block">
            <img
              src="/images/business_open_sm.jpg"
              alt="Relume placeholder image"
              className="h-full w-full object-fit"
            />
          </div>
          {/* <footer
            className="absolute bottom-0 left-0 right-0 top-auto flex h-16 w-full items-center justify-center pr-[5%] md:h-18 lg:justify-start lg:px-[5%]"
          >
            <p className="text-sm">© 2024 Relume</p>
          </footer> */}
        </div>
      </section>
    </div>
  );
};

export default LoginPage;
