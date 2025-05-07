/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { getUserListings } from "@/app/actions";
import { auth } from "@clerk/nextjs/server";

export default async function UserListings() {
  const { userId } = await auth();
  const listings = await getUserListings(userId);

  return (
    <div className="w-full flex flex-col items-start justify-center max-w-5xl mx-auto py-20 px-4">
      <h1 className="text-2xl font-bold">My Listings</h1>
      {listings.length === 0 ? (
        <p className="text-gray-500 my-4">You have no listings</p>
      ) : (
        <ul role="list" className="w-full">
          {listings.map((listing) => (
            <Link href={`/edit-listing/${listing.id}`} key={listing.id}>
              <li className="my-4 hover:scale-[101%] transition-all duration-300">
                <div className="flex items-center gap-12 w-full h-24 bg-white rounded-lg shadow-md p-4">
                  <img
                    src={`${listing.image_file ? `https://my-church-works-images.b-cdn.net/${listing.image_file}` : `https://picsum.photos/id/${Math.floor(Math.random() * 500) + 1}/200`}`}
                    alt={`Image ${listing.id}`}
                    className="object-contain h-full rounded-md"
                  />
                  <h2 className="text-base/7 font-semibold tracking-tight text-gray-900">{listing.business_name}</h2>
                </div>
              </li>
            </Link>
          ))}
        </ul>
      )}
    </div>
  )
}
