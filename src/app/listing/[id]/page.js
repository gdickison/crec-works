import React from 'react'
import Reviews1 from '@/components/Reviews1'
import { getSingleListing } from '@/app/actions'

async function Listing({params}) {
  const { id } = await params;
  const listing = await getSingleListing(id);
  console.log('listing',listing);

  return (
    <div className="bg-white pt-20 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold my-4">{listing[0].business_name}</h1>
      <div>
        {JSON.stringify(listing)}
      </div>
    </div>
  )
}

export default Listing;
