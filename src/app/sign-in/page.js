/* eslint-disable @next/next/no-img-element */
"use client";
import { useState } from "react";
import { account } from "../appwrite";
import Link from "next/link";
import { useRouter } from "next/navigation";

const SignInPage = () => {
  const router = useRouter();
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async (email, password) => {
    const session = await account.createEmailPasswordSession(email, password);
    setLoggedInUser(await account.get());
    router.push('/');
  };

  return (
    <div>
      <section>
        <div
          className="relative grid h-screen grid-cols-1 items-stretch justify-center overflow-auto lg:grid-cols-2"
        >
          <div
            className="relative mx-[5vw] flex items-center justify-center pb-16 pt-20 md:pb-20 md:pt-24 lg:py-20"
          >
            <div className="container max-w-sm">
              <div className="container mb-6 max-w-lg text-center md:mb-8">
                <h1 className="mb-5 text-5xl md:mb-6 md:text-5xl lg:text-6xl">Sign In</h1>
                <p className="md:text-md">Sign in to your account to access the full directory.</p>
              </div>
              <form className="grid grid-cols-1 gap-6">
                <div className="grid w-full items-center">
                  <label
                    className="sr-only"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <div className="relative flex size-full items-center">
                    <input
                      type="email"
                      className="block w-full px-6 py-4 text-base text-center text-gray-900 placeholder-gray-600 bg-white border border-gray-200 rounded-xl focus:bg-white focus:border-blue-600 focus:ring-1 focus:ring-blue-600 focus:outline-none"
                      id="email"
                      placeholder="Email Address"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div className="grid w-full items-center">
                  <label
                    className="sr-only"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <div className="relative flex size-full items-center">
                    <input
                      type="password"
                      className="block w-full px-6 py-4 text-base text-center text-gray-900 placeholder-gray-600 bg-white border border-gray-200 rounded-xl focus:bg-white focus:border-blue-600 focus:ring-1 focus:ring-blue-600 focus:outline-none"
                      id="password"
                      placeholder="Password"
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
                </div>
              </form>
              <div
                className="mt-5 inline-flex w-full items-center justify-center gap-x-1 text-center md:mt-6"
              >
                <p>Don&apos;t have an account?</p>
                <Link href="/sign-up" className="underline">Sign up</Link>
              </div>
            </div>
          </div>
          <div className="hidden bg-background-secondary lg:block">
            <img
              src="/images/hat_store_sm.jpg"
              alt="Relume placeholder image"
              className="h-full w-full object-fit"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default SignInPage;
