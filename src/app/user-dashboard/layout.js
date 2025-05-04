export default function UserDashboardLayout({children, userAccount, userListings}) {
  return (
    <div className="pt-20">
      {children}
      <div className="flex gap-4 mx-4">
        <div className="w-1/3 border-2 border-gray-200 rounded-lg shadow-md h-fit">
          {userAccount}
        </div>
        <div className="w-2/3 border-2 border-gray-200 rounded-lg shadow-md h-fit">
          {userListings}
        </div>
      </div>
    </div>
  )
}