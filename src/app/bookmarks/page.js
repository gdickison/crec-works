/* eslint-disable @next/next/no-img-element */
import { currentUser } from '@clerk/nextjs/server'
import { getBookmarkedListings } from '@/app/actions'
import BusinessCard from '@/components/BusinessCard'

export default async function BookmarksPage() {
  const user = await currentUser()
  
  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <h1 className="text-2xl font-bold mb-4">Please sign in to view your bookmarks</h1>
      </div>
    )
  }

  const bookmarkedListings = await getBookmarkedListings(user.id)

  return (
    <div className="container mx-auto px-4 py-8 pt-20">
      <h1 className="text-2xl font-bold mb-6">Your Bookmarked Listings</h1>

      <div className="grid w-full auto-cols-fr grid-cols-1 gap-6 lg:grid-cols-2 m-4 max-w-7xl mx-auto">
        {bookmarkedListings && bookmarkedListings.map(listing => {
          return (
            <BusinessCard
              key={listing.id}
              listing={listing}
            />
          )
        })}
      </div>
    </div>
  )
} 