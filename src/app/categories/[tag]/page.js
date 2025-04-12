import { getListingsByCategory } from "@/app/actions"
import BusinessCard from "@/components/BusinessCard"

export default async function CategoryPage(props) {
  const params = await props.params;
  const {tag} = params
  const listings = await getListingsByCategory(tag)

  return (
    <section className="">
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