import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Only JPEG, PNG, WebP and GIF are allowed' },
        { status: 400 }
      )
    }

    // Validate file size (5MB max)
    const maxSize = 5 * 1024 * 1024
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File size must be less than 5MB' },
        { status: 400 }
      )
    }

    // TODO: Upload to cloud storage (Cloudinary, Uploadthing, S3, etc.)
    // For now, we'll just return a mock URL
    // In production, replace this with actual upload logic

    // Example Cloudinary upload:
    // const buffer = Buffer.from(await file.arrayBuffer())
    // const cloudinaryResponse = await uploadToCloudinary(buffer)
    // return NextResponse.json({ url: cloudinaryResponse.secure_url })

    // Mock response - replace with actual upload
    const mockUrl = `https://via.placeholder.com/400x300?text=${encodeURIComponent(file.name)}`

    return NextResponse.json({
      url: mockUrl,
      filename: file.name,
      size: file.size,
      type: file.type
    })

  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    )
  }
}
