import { Client, Account, Users } from "node-appwrite";
import { cookies } from "next/headers";

export async function createSessionClient () {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_API_ENDPOINT)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);

  const session = cookies().get('session');

  if (!session || !session.value) {
    throw new Error('No session found');
  }

  client.setSession(session.value);

  return {
    get account() {
      return new Account(client);
    }
  };
}

export async function createAdminClient () {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_API_ENDPOINT)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID)
    .setKey(process.env.NEXT_APPWRITE_API_KEY);

  return {
    get account() {
      return new Account(client);
    }
  };
}

export async function getLoggedInUser() {
  try {
    const { account } = await createSessionClient();
    return await account.get();
  } catch (error) {
    return null;
  }
}

export async function setUserChurch(userId, church) {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_API_ENDPOINT)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID)
    .setKey(process.env.NEXT_APPWRITE_API_KEY);

  const users = new Users(client);

  const result = await users.updatePrefs(
    userId,
    {
      church: church
    }
  );

  return result;
}
