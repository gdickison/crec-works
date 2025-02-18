// app/actions.ts
"use server";
import { neon } from "@neondatabase/serverless";

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
