import { auth, clerkClient } from "@clerk/nextjs/server";

export default async function UserDashboard() {
  const { userId } = await auth();
  const client = await clerkClient();
  const user = await client.users.getUser(userId);

  return (
    <div className="lg:px-[5%]">
      <h1 className="text-2xl font-bold my-4">{`User Dashboard for ${user.firstName} ${user.lastName}`}</h1>
    </div>
  )
}