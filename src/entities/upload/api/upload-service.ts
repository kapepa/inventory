import { UploadResponse } from '../model'
import { validateFile } from '../lib'

// Dynamic import for Cloudinary to avoid fs module in client bundles
const getCloudinary = async () => {
  // Dynamic import - Cloudinary will only be imported on the server
  const cloudinaryModule = await import('../config')
  return cloudinaryModule.getCloudinary()
}

export const uploadFile = async (file: File): Promise<UploadResponse> => {
  try {
    // 1. Validate file first
    validateFile(file)

    const cloudinary = await getCloudinary()

    // Convert File to Buffer
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // 2. Upload with eager transformations for better performance
    const uploadResponse = await new Promise<any>((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          folder: 'inventory-products',
          resource_type: 'image',
        },
        (error, result) => {
          if (error) reject(error)
          else resolve(result)
        }
      ).end(buffer)
    })

    // 3. Improved transformation URL generator
    const publicId = uploadResponse.public_id
    const baseUrl = uploadResponse.secure_url.split('/upload/')[0] + '/upload/'

    const generateTransformationUrl = (width: number, height?: number, format?: string) => {
      const transformations = [`w_${width}`, 'c_limit', 'q_auto:eco']

      if (height) transformations.push(`h_${height}`)
      if (format) transformations.push(`f_${format}`)
      else transformations.push('f_auto') // auto format (webp/avif for supported browsers)

      return `${baseUrl}${transformations.join(',')}/${publicId}`
    }

    console.log("uploadFileuploadFileuploadFileuploadFile", {
      // Return multiple sizes for ResponsiveImage component
      thumbnail: generateTransformationUrl(150),
      small: generateTransformationUrl(640),
      medium: generateTransformationUrl(1024),
      large: generateTransformationUrl(1920),
      original: generateTransformationUrl(2560),

      // Also return single URL for backwards compatibility
      url: uploadResponse.secure_url,
    })
    return {
      // Return multiple sizes for ResponsiveImage component
      thumbnail: generateTransformationUrl(150),
      small: generateTransformationUrl(640),
      medium: generateTransformationUrl(1024),
      large: generateTransformationUrl(1920),
      original: generateTransformationUrl(2560),

      // Also return single URL for backwards compatibility
      url: uploadResponse.secure_url,
    }
  } catch (error) {
    console.error('Cloudinary Error in uploadFile:', error);
    throw error;
  }
}