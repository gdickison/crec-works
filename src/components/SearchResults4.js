/* eslint-disable @next/next/no-img-element */
import { createSessionClient, getLoggedInUser } from "@/app/appwrite/config";
import { redirect } from "next/navigation";
import { listings } from "@/utils/localdata"
import Link from "next/link"
import Bookmark from "./Bookmark";
import { cookies } from "next/headers";

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
    <section>
      <div
        className="grid auto-cols-fr grid-cols-1 items-end gap-4 pb-5 md:grid-cols-[1fr_max-content] md:gap-6 md:pb-6"
      >
        <div className="w-full max-w-lg">
          <h1 className="text-xl font-bold md:text-2xl">Popular Properties</h1>
          <form action={signOut}>
            <button type="submit">Sign Out</button>
          </form>
          <p className="mt-2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.
          </p>
        </div>
        <div className="flex items-center justify-between md:justify-normal">
          <div className="relative flex size-full items-center">
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
              className="flex size-full min-h-11 border border-border-primary bg-background-primary py-2 align-middle file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 pl-[2.75rem] pr-3 mr-4"
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
            className="flex min-h-11 items-center justify-between gap-1 whitespace-nowrap border border-border-primary bg-transparent text-text-primary focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 [&amp;&gt;span]:line-clamp-1 [&amp;[data-state=open]&gt;svg]:rotate-180 w-[110px] px-4 py-2"
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
      <div className="grid w-full auto-cols-fr grid-cols-1 gap-6 lg:grid-cols-2">
        {listings && listings.map(listing => {
          return (
            <div
              key={listing.id}
              className="grid auto-cols-fr grid-cols-1 items-center border border-border-primary md:grid-cols-[0.5fr_1fr]"
            >
              <div className="size-full overflow-hidden">
                <img
                  src={`https://picsum.photos/id/${Math.floor(Math.random() * 500) + 1}/200`}
                  alt={`Image ${listing.id}`}
                  className="aspect-square size-full object-contain"
                />
              </div>
              <div className="flex flex-col p-6">
                <div className="flex items-center gap-x-4 text-xs">
                    {listing.categories.map(category => {
                      return (
                        <a
                          key={category.title.toLowerCase()}
                          href={category.href}
                          className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                        >
                          {category.title}
                        </a>
                      )
                    })}
                  </div>
                <div className="mb-2 flex items-center justify-between gap-4">
                  <h2 className="text-md font-bold leading-[1.4] md:text-xl">{listing.title}</h2>
                  {/* <div className="p-2">
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      viewBox="0 0 24 24"
                      className="focus-visible:ring-border-primary inline-flex gap-3 items-center justify-center whitespace-nowrap ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-text-primary size-6 cursor-pointer"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M18 2H6c-1.103 0-2 .897-2 2v18l8-4.572L20 22V4c0-1.103-.897-2-2-2zm0 16.553-6-3.428-6 3.428V4h12v14.553z"
                      ></path>
                    </svg>
                  </div> */}
                  <Bookmark/>
                </div>
                <p className="mb-3 md:mb-4">
                  {listing.description}
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2">
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
                        d="M12 14c2.206 0 4-1.794 4-4s-1.794-4-4-4-4 1.794-4 4 1.794 4 4 4zm0-6c1.103 0 2 .897 2 2s-.897 2-2 2-2-.897-2-2 .897-2 2-2z"
                      ></path>
                      <path
                        d="M11.42 21.814a.998.998 0 0 0 1.16 0C12.884 21.599 20.029 16.44 20 10c0-4.411-3.589-8-8-8S4 5.589 4 9.995c-.029 6.445 7.116 11.604 7.42 11.819zM12 4c3.309 0 6 2.691 6 6.005.021 4.438-4.388 8.423-6 9.73-1.611-1.308-6.021-5.294-6-9.735 0-3.309 2.691-6 6-6z"
                      ></path></svg
                    ><span className="text-sm">Location</span>
                  </div>
                  <div className="flex items-center gap-2">
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
                        d="M20 9.557V3h-2v2H6V3H4v6.557C2.81 10.25 2 11.525 2 13v4a1 1 0 0 0 1 1h1v4h2v-4h12v4h2v-4h1a1 1 0 0 0 1-1v-4c0-1.475-.811-2.75-2-3.443zM18 7v2h-5V7h5zM6 7h5v2H6V7zm14 9H4v-3c0-1.103.897-2 2-2h12c1.103 0 2 .897 2 2v3z"
                      ></path></svg
                    ><span className="text-sm">2 Beds</span>
                  </div>
                  <div className="flex items-center gap-2">
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
                        d="M21 10H7V7c0-1.103.897-2 2-2s2 .897 2 2h2c0-2.206-1.794-4-4-4S5 4.794 5 7v3H3a1 1 0 0 0-1 1v2c0 2.606 1.674 4.823 4 5.65V22h2v-3h8v3h2v-3.35c2.326-.827 4-3.044 4-5.65v-2a1 1 0 0 0-1-1zm-1 3c0 2.206-1.794 4-4 4H8c-2.206 0-4-1.794-4-4v-1h16v1z"
                      ></path></svg
                    ><span className="text-sm">1 Bath</span>
                  </div>
                </div>
                <div className="mt-5 flex items-center justify-between gap-4 md:mt-6 flex-col sm:flex-row">
                  <div>
                    <p className="before:content-[&#x27;_&#x27;]">{listing.author.name} / {listing.author.role}</p>
                    <p className="before:content-[&#x27;_&#x27;]">{listing.email} / {listing.phone}</p>
                  </div>
                  <Link
                    href={listing.website}
                    className="focus-visible:ring-border-primary inline-flex gap-3 items-center justify-center whitespace-nowrap ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-border-primary bg-background-alternative text-text-alternative px-5 py-2 hover:bg-blue-500 hover:text-blue-50 rounded-lg"
                  >
                    Website
                  </Link>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
