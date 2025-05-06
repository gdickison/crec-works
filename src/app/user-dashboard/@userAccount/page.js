import { auth, clerkClient } from "@clerk/nextjs/server";

export default async function UserAccount() {
  const { userId } = await auth();
  const client = await clerkClient();
  const user = await client.users.getUser(userId);

  return (
    <div className="w-full flex flex-col items-start justify-center max-w-lg mx-auto py-20 px-4">
      <h1 className="text-2xl font-bold">My Account</h1>
      <div className="bg-gray-100 p-4 rounded-lg">
        <ul>
          <li>
            <span>Name: </span><span>{user.firstName} {user.lastName}</span>
          </li>
          <li>
            <span>Email: </span><span>{user.emailAddresses[0].emailAddress}</span>
          </li>
          <li>
            <span>Church: </span><span>{user.publicMetadata.church}</span>
          </li>
        </ul>
        <p>Subscription details</p>
      </div>
    </div>
  )
}