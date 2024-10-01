/* eslint-disable @next/next/no-img-element */
"use client";
import { useState } from "react";
import { Account, ID, Databases, Client } from "appwrite";
import Link from "next/link";
import { useRouter } from "next/navigation";

const SignUpPage = () => {
  const router = useRouter();
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [church, setChurch] = useState("");

  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_API_URL)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);

  const account = new Account(client)

  const databases = new Databases(client)

  const login = async (email, password) => {
    const session = await account.createEmailPasswordSession(email, password);
    setLoggedInUser(await account.get());
    console.log('session', session);
    await databases.createDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
      process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID,
      ID.unique(),
      {
        user_id: session.userId,
        first_name: firstName,
        last_name: lastName,
        church: church
      }
    );
  
    router.push('/');
  };

  const register = async () => {
    await account.create(ID.unique(), email, password, firstName, lastName, church);
    login(email, password);
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
              <form className="grid grid-cols-1 gap-6">
                <div className="flex gap-x-2">
                  <label htmlFor="firstName" className="sr-only"> First name </label>
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    placeholder="First Name"
                    className="block w-1/2 px-6 py-4 text-base text-center text-gray-900 placeholder-gray-600 bg-white border border-gray-200 rounded-xl focus:bg-white focus:border-blue-600 focus:ring-1 focus:ring-blue-600 focus:outline-none"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  <label htmlFor="lastName" className="sr-only"> Last name </label>
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    placeholder="Last Name"
                    className="block w-1/2 px-6 py-4 text-base text-center text-gray-900 placeholder-gray-600 bg-white border border-gray-200 rounded-xl focus:bg-white focus:border-blue-600 focus:ring-1 focus:ring-blue-600 focus:outline-none"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
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
                      placeholder="Create Password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="church" className="sr-only">
                    Church
                  </label>
                  <select
                    id="church"
                    name="church"
                    className="block w-full px-6 py-4 text-base text-center text-gray-900 placeholder-gray-600 bg-white border border-gray-200 rounded-xl focus:bg-white focus:border-blue-600 focus:ring-1 focus:ring-blue-600 focus:outline-none"
                    required
                    value={church}
                    onChange={(e) => setChurch(e.target.value)}
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
                    type="button"
                    className="focus-visible:ring-border-primary inline-flex gap-3 items-center justify-center whitespace-nowrap ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-border-primary bg-background-alternative text-text-alternative px-6 py-3 hover:bg-gray-900 hover:text-gray-100"
                    onClick={register}
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

export default SignUpPage;
