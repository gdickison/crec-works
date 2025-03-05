/* eslint-disable @next/next/no-img-element */
import { currentUser } from '@clerk/nextjs/server'
import { getBookmarkedListings } from '@/app/actions'
import Bookmark from '@/components/Bookmark'
import Location from '@/components/Location'

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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Your Bookmarked Listings</h1>
      
      {bookmarkedListings.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600">You haven&apos;t bookmarked any listings yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookmarkedListings.map((listing) => (
            <div 
              key={listing.id} 
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200"
            >
              {listing.imageFile && (
                <div className="aspect-video relative">
                  <img
                    src={listing.imageFile}
                    alt={listing.businessName}
                    className="object-cover w-full h-full"
                  />
                </div>
              )}
              
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-xl font-semibold">{listing.businessName}</h2>
                  <Bookmark listingId={listing.id} />
                </div>
                
                {listing.categories && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {listing.categories.map((category, index) => (
                      <span 
                        key={index}
                        className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                )}

                {listing.description && (
                  <p className="text-gray-600 mb-3 line-clamp-2">
                    {listing.description}
                  </p>
                )}

                {listing.location && (
                  <div className="mb-3">
                    <Location location={listing.location} />
                  </div>
                )}

                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                  {listing.businessPhone && (
                    <a 
                      href={`tel:${listing.businessPhone}`}
                      className="hover:text-blue-500"
                    >
                      {listing.businessPhone}
                    </a>
                  )}
                  {listing.websiteUrl && (
                    <a 
                      href={listing.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-blue-500"
                    >
                      Website
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
} 