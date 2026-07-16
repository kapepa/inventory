import { UploadImageError, UploadImageResponse } from '@/entities'
import { uploadFile } from '@/entities/server'
import { apiHandler } from '@/shared/server'
import { NextRequest, NextResponse } from 'next/server'

export const POST = apiHandler(async (request: NextRequest): Promise<NextResponse<UploadImageError | UploadImageResponse>> => {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) return NextResponse.json({ error: 'No file provided' }, { status: 400 })

    const response = await uploadFile(file)
    return NextResponse.json(response)

  } catch (error: unknown) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to upload file' },
      { status: 500 }
    );
  }
})