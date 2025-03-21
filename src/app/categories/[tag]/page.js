import { getListingsByCategory } from "@/app/actions"
import BusinessCard from "@/components/BusinessCard"

export default async function CategoryPage({params}) {
  const {tag} = params
  const listings = await getListingsByCategory(tag)
  console.log('listings', listings)

  return (
    <section className="pt-24">
      <div className="flex flex-col sm:flex-row w-full max-w-7xl mx-auto px-4 justify-between">
        <h1 className="text-4xl font-bold">{tag.charAt(0).toUpperCase() + tag.slice(1)}</h1>
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