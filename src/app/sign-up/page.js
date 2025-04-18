/* eslint-disable @next/next/no-img-element */
import { ID } from "node-appwrite";
import { createAdminClient } from "@/app/appwrite/config";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function SignUpPage () {

  async function registerNewUser(formData) {
    'use server'
    const data = Object.fromEntries(formData);
    const {email, password, name} = data;
    const { account } = await createAdminClient();

    await account.create(ID.unique(), email, password, name);
    const session = await account.createEmailPasswordSession(email, password);

    (await cookies()).set("session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
      expires: new Date(session.expire)
    });

    if (session) {
      redirect("/welcome");
    } else {
      console.error("Account creation failed:", error);
    }
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
                <h1 className="mb-5 text-5xl md:mb-6 md:text-5xl lg:text-6xl">Sign Up</h1>
                <p className="md:text-md">Create a free account to access the full directory.</p>
              </div>
              <form action={registerNewUser} className="grid grid-cols-1 gap-6">
                <div className="flex gap-x-2">
                  <label htmlFor="first_name" className="sr-only"> First name </label>
                  <input
                    type="text"
                    name="first_name"
                    id="first_name"
                    placeholder="First Name"
                    className="block w-full px-6 py-4 text-base text-center text-gray-900 placeholder-gray-500 bg-white border border-gray-200 rounded-xl focus:bg-white focus:border-blue-600 focus:ring-1 focus:ring-blue-600 focus:outline-none"
                    required
                  />
                </div>
                <div className="flex gap-x-2">
                  <label htmlFor="last_name" className="sr-only"> Last name </label>
                  <input
                    type="text"
                    name="last_name"
                    id="last_name"
                    placeholder="Last Name"
                    className="block w-full px-6 py-4 text-base text-center text-gray-900 placeholder-gray-500 bg-white border border-gray-200 rounded-xl focus:bg-white focus:border-blue-600 focus:ring-1 focus:ring-blue-600 focus:outline-none"
                    required
                  />
                </div>
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
                      className="block w-full px-6 py-4 text-base text-center text-gray-900 placeholder-gray-500 bg-white border border-gray-200 rounded-xl focus:bg-white focus:border-blue-600 focus:ring-1 focus:ring-blue-600 focus:outline-none"
                      id="email"
                      placeholder="Email Address"
                      required
                      name="email"
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
                      className="block w-full px-6 py-4 text-base text-center text-gray-900 placeholder-gray-500 bg-white border border-gray-200 rounded-xl focus:bg-white focus:border-blue-600 focus:ring-1 focus:ring-blue-600 focus:outline-none"
                      id="password"
                      placeholder="Create Password"
                      required
                      name="password"
                    />
                  </div>
                </div>
                <div className="grid-col-1 grid gap-4">
                  <button
                    type="submit"
                    className="border-gray-200 rounded-xl focus-visible:ring-border-primary inline-flex gap-3 items-center justify-center whitespace-nowrap ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-border-primary bg-background-alternative text-text-alternative px-6 py-4 bg-gray-900 text-gray-100 hover:bg-gray-300 hover:text-gray-900"
                  >
                    Sign up
                  </button>
                </div>
              </form>
              <div
                className="mt-5 inline-flex w-full items-center justify-center gap-x-1 text-center md:mt-6"
              >
                <p>Already have an account?</p>
                <Link href="/sign-in" className="underline">Log in</Link>
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
        </div>
      </section>
    </div>
  );
};
