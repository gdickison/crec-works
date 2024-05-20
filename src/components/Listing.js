/* eslint-disable @next/next/no-img-element */
const listings = [
  {
    id: 1,
    title: 'Soli Deo Financial Services',
    href: '#',
    description:
      'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel iusto corrupti dicta laboris incididunt.',
    imageUrl:
      'https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80',
    date: 'Mar 16, 2020',
    datetime: '2020-03-16',
    categories: [
      { title: 'Marketing', href: '#' },
      { title: 'Accounting', href: '#' },
      { title: 'Finance', href: '#' },
    ],
    author: {
      name: 'Michael Foster',
      role: 'Co-Founder / CTO',
      href: '#',
      imageUrl:
        'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    email: 'info@solideofinancial.com',
    phone: '555-555-5555',
    website: 'https://solideofinancial.com'
  },
  {
    id: 2,
    title: 'Semper Fide Carpentry',
    href: '#',
    description:
      'We do custom construction and remodels in the Florida panhandle. Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel iusto corrupti dicta laboris incididunt.',
    imageUrl:
      '/images/carpenter_tools.jpg',
    date: 'Mar 16, 2020',
    datetime: '2020-03-16',
    categories: [
      { title: 'Carpentry', href: '#' },
      { title: 'Building', href: '#' },
      { title: 'Construction', href: '#' },
    ],
    author: {
      name: 'John Phelps',
      role: 'Co-Founder / CTO',
      href: '#',
      imageUrl:
        'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    email: 'info@solideofinancial.com',
    phone: '555-555-5555',
    website: 'https://solideofinancial.com'
  },
  {
    id: 3,
    title: 'Stewardship Investments',
    href: '#',
    description:
      'We provide investment services in all 50 states. Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel iusto corrupti dicta laboris incididunt.',
    imageUrl:
      '/images/money_plant.jpg',
    date: 'Mar 16, 2020',
    datetime: '2020-03-16',
    categories: [
      { title: 'Investment', href: '#' },
      { title: 'Retirement', href: '#' },
      { title: 'Wealth Management', href: '#' },
    ],
    author: {
      name: 'Michael Foster',
      role: 'Co-Founder / CTO',
      href: '#',
      imageUrl:
        'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    email: 'info@solideofinancial.com',
    phone: '555-555-5555',
    website: 'https://solideofinancial.com'
  },
]

export default function Listing() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-4xl">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Search Results</h2>
          {/* <p className="mt-2 text-lg leading-8 text-gray-600">
            Learn how to grow your business with our expert advice.
          </p> */}
          <div className="mt-16 space-y-20 lg:mt-20 lg:space-y-20">
            {listings.map((listing) => (
              <article key={listing.id} className="relative isolate flex flex-col gap-8 lg:flex-row">
                <div className="relative aspect-[16/9] sm:aspect-[2/1] lg:aspect-square lg:w-64 lg:shrink-0">
                  <img
                    src={listing.imageUrl}
                    alt=""
                    className="absolute inset-0 h-full w-full rounded-2xl bg-gray-50 object-cover"
                  />
                  <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
                </div>
                <div>
                  <div className="flex items-center gap-x-4 text-xs">
                    {/* <time dateTime={listing.datetime} className="text-gray-500">
                      {listing.date}
                    </time> */}
                    {listing.categories.map(category => {
                      return (
                        <a
                          key={category.title.toLowerCase()}
                          href={category.href}
                          className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                        >
                          {category.title}
                        </a>
                      )
                    })}
                  </div>
                  <div className="group relative max-w-xl">
                    <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                      <a href={listing.href}>
                        <span className="absolute inset-0" />
                        {listing.title}
                      </a>
                    </h3>
                    <p className="mt-5 text-sm leading-6 text-gray-600">{listing.description}</p>
                  </div>
                  <div className="mt-6 flex border-t border-gray-900/5 pt-6 justify-between align-top">
                    <div className="relative flex items-center gap-x-4">
                      <img src={listing.author.imageUrl} alt="" className="h-10 w-10 rounded-full bg-gray-50" />
                      <div className="text-sm leading-6">
                        <p className="font-semibold text-gray-900">
                          <a href={listing.author.href}>
                            <span className="absolute inset-0" />
                            {listing.author.name}
                          </a>
                        </p>
                        <p className="text-gray-600">{listing.author.role}</p>
                      </div>
                    </div>
                    <div className="text-sm leading-6 text-gray-600">
                      <a href={`mailto:${listing.email}`}><span className="font-semibold">Email:</span> {listing.email}</a>
                      <p><span className="font-semibold">Phone:</span> {listing.phone}</p>
                      <a href={listing.website} target="_blank"><span className="font-semibold">Website:</span> {listing.website}</a>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
