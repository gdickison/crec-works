import { createSessionClient } from "@/app/appwrite/config";
import { cookies } from "next/headers";

export async function GET(req) {
  const sessionCookie = cookies().get("session");

  try {
    const { databases } = await createSessionClient(sessionCookie.value);
    const {documents:users, total} = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
      process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID
    );

    return Response.json({users, total})
  } catch (error) {
    console.error(error.message);
    return Response.json("Access denied", {status: 403})
  }
}