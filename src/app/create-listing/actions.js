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

export async function createListing(request) {
  console.log('request', request);
  try {
    const sql = neon(process.env.DATABASE_URL);
    const result = await sql`
      INSERT INTO listings (
        authority,
        business_email,
        business_name,
        business_phone,
        categories,
        created_date,
        description,
        image_file,
        location,
        owner_name,
        owner_role,
        user_id,
        website_url
      ) VALUES (
        ${request.authority},
        ${request.business_email},
        ${request.business_name},
        ${request.business_phone},
        ${JSON.stringify(request.categories)},
        ${request.created_date},
        ${request.description},
        ${request.imageFile},
        ${JSON.stringify(request.location)},
        ${request.owner_name},
        ${request.owner_role},
        ${request.userId},
        ${request.website_url}
      )
      RETURNING id;
    `;

    return { id: result[0].id };
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to create listing' },
      { status: 500 }
    );
  }
}