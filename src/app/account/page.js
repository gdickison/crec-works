import { account } from "@/app/appwrite";

export default async function Account() {
  console.log('account', account.get())
  return (
    <div>
      <h1>Account</h1>
    </div>
  )
}
