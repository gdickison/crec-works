/* eslint-disable @next/next/no-img-element */
import { createSessionClient, getLoggedInUser } from "@/app/appwrite/config";
import { redirect } from "next/navigation";
import { listings } from "@/utils/localdata"
import { cookies } from "next/headers";
import Header from "./Header";
import BusinessCard from "./BusinessCard";

async function signOut() {
  'use server'
  const { account } = await createSessionClient();
  cookies().delete('session');
  await account.deleteSession("current");
  redirect("/sign-in");
}

export default async function SearchResults () {

  const user = await getLoggedInUser();
  if (!user) {
    redirect('/sign-in');
  }

  return (
    <section className="relative pt-24">
      <Header
        user={user}
      />
      <div
        className="flex flex-col sm:flex-row w-full max-w-7xl mx-auto px-4 justify-between"
      >
        <div className="flex items-center">
          <h1 className="text-xl font-bold md:text-2xl">Popular Listings</h1>
        </div>
        <div className="flex items-center justify-between md:justify-normal">
          <div className="relative flex md:w-[40rem] items-center">
            <div className="absolute left-3">
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
                  d="M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z"
                ></path>
              </svg>
            </div>
            <input
              className="flex w-full min-h-11 border border-border-primary bg-background-primary py-2 align-middle file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 pl-[2.75rem] pr-3 mr-4"
              placeholder="Search"
            />
          </div>
          <button
            type="button"
            role="combobox"
            aria-controls="radix-:R19:"
            aria-expanded="false"
            aria-autocomplete="none"
            dir="ltr"
            data-state="closed"
            data-placeholder=""
            className="flex min-h-11 items-center justify-between gap-1 whitespace-nowrap border border-border-primary bg-transparent text-text-primary focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 [&amp;&gt;span]:line-clamp-1 [&amp;[data-state=open]&gt;svg]:rotate-180 w-40 md:w-56 px-4 py-2"
          >
            <span>Sort by</span
            ><svg
              stroke="currentColor"
              fill="none"
              strokeWidth="0"
              viewBox="0 0 15 15"
              className="size-5 transition-transform duration-300"
              aria-hidden="true"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z"
                fill="currentColor"
              ></path>
            </svg></button
          ><select
            aria-hidden="true"
            tabIndex="-1"
            style={{
              position: "absolute",
              border: 0,
              width: "1px",
              height: "1px",
              padding: 0,
              margin: "-1px",
              overflow: "hidden",
              clip: "rect(0, 0, 0, 0)",
              whiteSpace: "nowrap",
              wordWrap: "normal"
            }}
          >
            <option value=""></option>
          </select>
        </div>
      </div>
      <div className="grid w-full auto-cols-fr grid-cols-1 gap-6 lg:grid-cols-2 m-4 max-w-7xl mx-auto">
      {listings && listings.map(listing => {
        return (
          <BusinessCard
            key={listing.id}
            listing={listing}
          />
        )
      })}
      </div>
    </section>
  )
}
