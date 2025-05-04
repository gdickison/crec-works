/* eslint-disable @next/next/no-img-element */
'use client';

import Link from "next/link";
import { useState, useEffect } from "react";
import { getUserListings } from "@/app/actions";

export default function UserListings({user}) {
  console.log('user',user);
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const fetchListings = async () => {
      const listings = await getUserListings('user_2tm13qfEsSNAkhxDuIqaZunvU8b');
      setListings(listings);
    };
    fetchListings();
  }, [user.id]);

  console.log('listings',listings);

  return (
    <div className="h-full w-full flex flex-col items-start justify-center">
      <h1 className="text-2xl font-bold">My Listings</h1>
      {listings.length === 0 ? (
        <p className="text-gray-500 my-4">You have no listings</p>
      ) : (
        <ul role="list" className="w-full">
          {listings.map((listing) => (
            <Link href={`/listings/${listing.id}`} key={listing.id}>
              <li key={listing.id} className="my-4 hover:scale-105 transition-all duration-300">
                <div className="flex items-center gap-12 w-full h-24 bg-white rounded-lg shadow-md p-4">
                  <img
                    src={`${listing.imageFile ? `https://my-church-works-images.b-cdn.net/${listing.imageFile}` : `https://picsum.photos/id/${Math.floor(Math.random() * 500) + 1}/200`}`}
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