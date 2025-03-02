/* eslint-disable @next/next/no-img-element */
import BusinessCard from "./BusinessCard";
import { getListings } from "@/app/actions";

export const revalidate = 0;

export default async function SearchResults () {

  const listings = await getListings();

  return (
    <section className="relative pt-24">
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
                />
              </svg>
            </div>
            <input
              className="flex w-full min-h-11 border border-border-primary bg-background-primary py-2 align-middle file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 pl-[2.75rem] pr-3 mr-4"
              placeholder="Search"
            />
          </div>
          <select
            aria-hidden="true"
            tabIndex="-1"
            className="flex min-h-11 items-center justify-between gap-1 whitespace-nowrap border border-border-primary bg-transparent text-text-primary focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 [&amp;&gt;span]:line-clamp-1 [&amp;[data-state=open]&gt;svg]:rotate-180 w-40 md:w-56 px-4 py-2"
            placeholder="Sort by"
          >
            <option value="relevance">Relevance</option>
            <option value="name">Name</option>
            <option value="category">Category</option>
            <option value="bookmarked">Bookmarked</option>
            <option value="liked">Liked</option>
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
