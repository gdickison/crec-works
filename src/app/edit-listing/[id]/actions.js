'use server'
import { neon } from "@neondatabase/serverless";
import { NextResponse } from "next/server";

export async function uploadListingImage(fileData) {
  const storageZoneName = process.env.BUNNY_STORAGE_ZONE_NAME
  const apiKey = process.env.BUNNY_STORAGE_API_KEY
  const region = process.env.BUNNY_STORAGE_REGION
  const baseHostname = process.env.BUNNY_STORAGE_HOSTNAME
  // Only add region prefix if it exists and isn't empty
  const hostname = region ? `${region}.${baseHostname}` : baseHostname

  try {
    const uniqueFileName = `${Date.now()}-${fileData.name.replace(/[^a-zA-Z0-9.-]/g, '')}`

    // Convert base64 back to Buffer
    const buffer = Buffer.from(fileData.base64, 'base64')

    const response = await fetch(
      `https://${hostname}/${storageZoneName}/${uniqueFileName}`,
      {
        method: 'PUT',
        headers: {
          'AccessKey': apiKey,
          'Content-Type': 'application/octet-stream',
          'Content-Length': buffer.length.toString()
        },
        body: buffer
      }
    )

    if (response.status !== 201) {
      const errorText = await response.text()
      console.error('Upload response:', response.status, errorText)
      throw new Error(`Upload failed: ${response.statusText} - ${errorText}`)
    }

    return uniqueFileName
  } catch (error) {
    console.error('Error uploading to Bunny.net:', error)
    throw error
  }
}

export async function updateListing(request) {
  try {
    const sql = neon(process.env.DATABASE_URL);
    const result = await sql`
      UPDATE listings
      SET
        authority = ${request.authority},
        business_email = ${request.business_email},
        business_name = ${request.business_name},
        business_phone = ${request.business_phone},
        categories = ${JSON.stringify(request.categories)},
        description = ${request.description},
        image_file = ${request.imageFile},
        location = ${JSON.stringify(request.location)},
        owner_name = ${request.owner_name},
        owner_role = ${request.owner_role},
        website_url = ${request.website_url},
        subscription = ${request.subscription}
      WHERE id = ${request.id}
      RETURNING id;
    `;

    return { id: result[0].id };
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to update listing' },
      { status: 500 }
    );
  }
}
