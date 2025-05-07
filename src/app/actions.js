// app/actions.ts
"use server";
import { neon } from "@neondatabase/serverless";
import { auth, clerkClient } from '@clerk/nextjs/server'

export async function getData() {
    const sql = neon(process.env.DATABASE_URL);
    const data = await sql`select version()`;
    return data;
}

export async function getListings() {
  try {
    const sql = neon(process.env.DATABASE_URL);

    const result = await sql`
      SELECT
        id,
        business_email,
        business_name,
        business_phone,
        categories,
        description,
        image_file,
        location,
        owner_name,
        owner_role,
        website_url
      FROM listings
      ORDER BY business_name ASC;
    `;

    // Convert the result to plain objects
    const listings = result.map(listing => ({
      id: listing.id,
      businessEmail: listing.business_email,
      businessName: listing.business_name,
      businessPhone: listing.business_phone,
      categories: listing.categories,
      description: listing.description,
      imageFile: listing.image_file,
      location: listing.location,
      ownerName: listing.owner_name,
      ownerRole: listing.owner_role,
      websiteUrl: listing.website_url
    }));

    return listings;

  } catch (error) {
    console.error('Database error:', error);
    throw new Error('Failed to fetch listings');
  }
}

export const completeOnboarding = async (data) => {
  const { userId } = await auth()

  if (!userId) {
    return { message: 'No Logged In User' }
  }

  const client = await clerkClient()

  try {
    const res = await client.users.updateUser(userId, {
      publicMetadata: {
        onboardingComplete: true,
        firstName: data.firstName,
        lastName: data.lastName,
        church: data.church,
        churchId: data.churchId,
        churchCity: data.churchCity,
        churchState: data.churchState,
      },
    })

    return { message: res.publicMetadata }
  } catch (err) {
    return { error: 'There was an error updating the user metadata.' }
  }
}

export const getChurches = async () => {
  try {
    const sql = neon(process.env.DATABASE_URL);
    const churches = await sql`
      SELECT
        id,
        name,
        city,
        state
      FROM churches
      ORDER BY name ASC;
    `;

    return churches;

  } catch (error) {
    console.error('Database error:', error);
    throw new Error('Failed to fetch churches');
  }
}

export async function toggleBookmark(userId, listingId) {
  try {
    const sql = neon(process.env.DATABASE_URL);

    // Check if bookmark exists
    const existingBookmark = await sql`
      SELECT * FROM bookmarks
      WHERE user_id = ${userId} AND listing_id = ${listingId}
    `;

    if (existingBookmark.length > 0) {
      // Remove bookmark
      await sql`
        DELETE FROM bookmarks
        WHERE user_id = ${userId} AND listing_id = ${listingId}
      `;
      return { message: 'Bookmark removed' };
    } else {
      // Add bookmark
      await sql`
        INSERT INTO bookmarks (user_id, listing_id)
        VALUES (${userId}, ${listingId})
      `;
      return { message: 'Bookmark added' };
    }
  } catch (error) {
    console.error('Error toggling bookmark:', error);
    return { error: 'Failed to update bookmark' };
  }
}

export async function getBookmarks(userId) {
  try {
    const sql = neon(process.env.DATABASE_URL);
    const result = await sql`
      SELECT listing_id
      FROM bookmarks
      WHERE user_id = ${userId}
    `;
    return result.map(row => row.listing_id);
  } catch (error) {
    console.error('Error getting bookmarks:', error);
    return [];
  }
}

export async function isBookmarked(userId, listingId) {
  try {
    const sql = neon(process.env.DATABASE_URL);
    const result = await sql`
      SELECT EXISTS(
        SELECT 1
        FROM bookmarks
        WHERE user_id = ${userId} AND listing_id = ${listingId}
      ) as exists
    `;
    return result[0].exists;
  } catch (error) {
    console.error('Error checking bookmark:', error);
    return false;
  }
}

export async function getBookmarkedListings(userId) {
  try {
    const sql = neon(process.env.DATABASE_URL);
    const result = await sql`
      SELECT
        l.id,
        l.business_email,
        l.business_name,
        l.business_phone,
        l.categories,
        l.description,
        l.image_file,
        l.location,
        l.owner_name,
        l.owner_role,
        l.website_url,
        b.created_at as bookmarked_at
      FROM bookmarks b
      JOIN listings l ON b.listing_id::uuid = l.id
      WHERE CAST(b.user_id AS text) = CAST(${userId} AS text)
      ORDER BY b.created_at DESC;
    `;

    return result.map(listing => ({
      id: listing.id,
      businessEmail: listing.business_email,
      businessName: listing.business_name,
      businessPhone: listing.business_phone,
      categories: listing.categories,
      description: listing.description,
      imageFile: listing.image_file,
      location: listing.location,
      ownerName: listing.owner_name,
      ownerRole: listing.owner_role,
      websiteUrl: listing.website_url,
      bookmarkedAt: listing.bookmarked_at
    }));
  } catch (error) {
    console.error('Error fetching bookmarked listings:', error);
    return [];
  }
}

export async function getListingsByCategory(tag) {
  try {
    const sql = neon(process.env.DATABASE_URL);

    const result = await sql`
      SELECT
        id,
        business_email,
        business_name,
        business_phone,
        categories,
        description,
        image_file,
        location,
        owner_name,
        owner_role,
        website_url
      FROM listings
      WHERE categories @> jsonb_build_array(jsonb_build_object('value', ${tag}::text))
      ORDER BY business_name ASC;
    `;

    // Convert the result to plain objects
    const listings = result.map(listing => ({
      id: listing.id,
      businessEmail: listing.business_email,
      businessName: listing.business_name,
      businessPhone: listing.business_phone,
      categories: listing.categories,
      description: listing.description,
      imageFile: listing.image_file,
      location: listing.location,
      ownerName: listing.owner_name,
      ownerRole: listing.owner_role,
      websiteUrl: listing.website_url
    }));

    return listings;

  } catch (error) {
    console.error('Database error:', error);
    throw new Error('Failed to fetch listings');
  }
}

export async function getUserListings(userId) {
  try {
    const sql = neon(process.env.DATABASE_URL);
    const result = await sql`
      SELECT
        id,
        business_name,
        image_file
      FROM listings
      WHERE user_id = ${userId}
    `;

    return result;

  } catch (error) {
    console.error('Database error:', error);
    throw new Error('Failed to fetch user listings');
  }
}

export async function getSingleListing(id) {
  try {
    const sql = neon(process.env.DATABASE_URL);

    const result = await sql`
      SELECT
        id,
        business_email,
        business_name,
        business_phone,
        categories,
        description,
        image_file,
        location,
        owner_name,
        owner_role,
        website_url
      FROM listings
      WHERE id = ${id}
    `;

    return result;

  } catch (error) {
    console.error('Database error:', error);
    throw new Error('Failed to fetch listings');
  }
}
