export default function UserDashboardLayout({children, userAccount, userListings}) {
  return (
    <div className="pt-20">
      {children}
      <div className="flex flex-col lg:flex-row gap-4 px-4 lg:px-[5%]">
        <div className="w-full lg:w-1/3 border-2 border-gray-200 rounded-lg shadow-md h-fit">
          {userAccount}
        </div>
        <div className="w-full lg:w-2/3 border-2 border-gray-200 rounded-lg shadow-md h-fit">
          {userListings}
        </div>
      </div>
    </div>
  )
}