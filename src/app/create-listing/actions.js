'use server'

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