import { getListingsByCategory } from "@/app/actions"

export default async function CategoryPage({params}) {
  const {tag} = params
  const listings = await getListingsByCategory(tag)
  console.log('listings', listings)

  return (
    <div className="pt-24 flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">Category Page</h1>
      <p className="text-2xl font-bold">{tag}</p>
    </div>
  )
}