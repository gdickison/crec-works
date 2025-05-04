'use client';
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
    <div className="h-full w-full flex flex-col items-center justify-center">
      <h1>My Listings</h1>
      <p>This is a custom page</p>
    </div>
  )
}