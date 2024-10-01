import { account } from "@/app/appwrite";

export default async function Account() {
  console.log('account', account.get())
  return (
    <div className="pt-20">
      <h1>Account</h1>
    </div>
  )
}
