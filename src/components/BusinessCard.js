/* eslint-disable @next/next/no-img-element */
import Bookmark from "./Bookmark"
import Location from "./Location"
import Share from "./Share"
import Like from "./Like"
import Link from "next/link"


export default function BusinessCard ({listing}) {
  return (
    <div
      key={listing.id}
      className="m-2 border border-gray-100 rounded-lg shadow-xl"
    >
      <div className="flex justify-between px-2">
        <div className="flex flex-wrap items-center gap-2 text-xs grid-cols-2 py-2 sm:py-0">
          {listing.categories.map(category => {
            return (
              <Link
                key={category.title.toLowerCase()}
                href={category.href}
                className="relative z-10 rounded-full bg-gray-100 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-200"
              >
                {category.title}
              </Link>
            )
          })}
        </div>
        <Bookmark/>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 px-0 sm:px-2">
        <div className="w-full sm:w-72 md:w-60 h-full sm:h-72 md:h-60">
          <img
            src={`${listing.imageUrl ? listing.imageUrl : `https://picsum.photos/id/${Math.floor(Math.random() * 500) + 1}/200`}`}
            alt={`Image ${listing.id}`}
            className="object-contain w-full h-full"
          />
        </div>
        <div className="flex-1 px-2 sm:px-0">
          <div className="mb-2 flex items-center justify-between gap-4">
            <h2 className="text-md font-bold leading-[1.4] md:text-xl">
              <Link href={`/business-listing/${listing.id}?name=${listing.title}`}>{listing.title}</Link>
            </h2>
          </div>
          <p className="mb-3 md:mb-4 line-clamp-6">
            {listing.description}
          </p>
          <div className="flex flex-wrap gap-4">
            <Location/>
            <Share/>
            <Like/>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between gap-4 flex-col sm:flex-row p-2">
        <div>
          <p className="before:content-[&#x27;_&#x27;]"><span className="font-semibold">{listing.author.name}</span> / {listing.author.role}</p>
          <p className="before:content-[&#x27;_&#x27;]"><Link href={`mailto:${listing.email}`} className="text-gray-600 hover:text-blue-600">{listing.email}</Link> / <Link href={`tel:+${listing.phone}`} className="text-gray-600 hover:text-blue-600">{listing.phone}</Link></p>
        </div>
        <Link
          href={listing.website}
          target="_blank"
          className="focus-visible:ring-border-primary inline-flex gap-3 items-center justify-center whitespace-nowrap ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-gray-600 hover:border-blue-500 bg-background-alternative text-text-alternative px-5 py-2 hover:bg-blue-500 text-gray-600 hover:text-blue-50 rounded-lg"
        >
          Website
        </Link>
      </div>
    </div>
  )
}