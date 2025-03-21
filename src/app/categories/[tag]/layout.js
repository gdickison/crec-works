import {categoryOptions} from "@/utils/listingOptions"
import Link from "next/link"

export default function CategoryLayout({ children }) {
  return (
    <div className="pt-24">
      <div className="flex flex-col sm:flex-row w-full max-w-7xl mx-auto px-4 justify-between">
        <div className="flex flex-wrap gap-2">
          {categoryOptions.map((option) => (
            <Link key={option.value} href={option.href} className="bg-gray-100 px-4 py-2 rounded-md">
              {option.label}
            </Link>
          ))}
        </div>
      </div>
      <main>{children}</main>
    </div>
  )
}