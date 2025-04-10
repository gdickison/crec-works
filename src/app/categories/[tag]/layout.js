import {categoryOptions} from "@/utils/listingOptions"
import Link from "next/link"

export default async function CategoryLayout(props) {
  const params = await props.params;

  const {
    children
  } = props;

  const { tag } = params

  return (
    <div className="pt-24">
      <div className="flex flex-col sm:flex-row w-full max-w-7xl mx-auto px-4 justify-between">
        <div className="flex flex-wrap gap-2">
          {categoryOptions.map((option) => (
            <Link
              key={option.value}
              href={option.href}
              className={`px-4 py-2 rounded-md text-xs ${
                option.value === tag
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              {option.label}
            </Link>
          ))}
        </div>
      </div>
      <main>{children}</main>
    </div>
  )
}