export default function CategoryPage({params}) {
  const {tag} = params
  return (
    <div className="pt-24 flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">Category Page</h1>
      <p className="text-2xl font-bold">{tag}</p>
    </div>
  )
}