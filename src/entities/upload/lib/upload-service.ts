import { ImageSizes } from '@/shared/types'
import { UploadImageResponse } from '../model/types'
import { validateFile } from './validate-file'
import { extractPublicId } from './extract-public-id'


// Dynamic import for Cloudinary to avoid fs module in client bundles
const getCloudinary = async () => {
  // Dynamic import - Cloudinary will only be imported on the server
  const cloudinaryModule = await import('../config/cloudinary')
  return cloudinaryModule.getCloudinary()
}

export const uploadFile = async (file: File): Promise<UploadImageResponse> => {
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

export const deleteFile = async (urlOrId: string | ImageSizes): Promise<{ result: string }> => {
  try {
    const publicId = extractPublicId(urlOrId);
    if (!publicId) throw new Error('Invalid public_id: could not extract');

    const cloudinary = await getCloudinary();
    const deleteResponse = await cloudinary.uploader.destroy(publicId, {
      resource_type: 'image',
      invalidate: true,
    });

    if (deleteResponse.result !== "ok" && deleteResponse.result !== "not found") {
      throw new Error(`Failed to delete image: ${deleteResponse.result}`);
    }

    return deleteResponse;
  } catch (error) {
    console.error('Cloudinary Error in deleteFile:', error);
    throw error;
  }
}

export const deleteFiles = async (urlOrIds: string[]): Promise<{ deleted: Record<string, string> }> => {
  try {
    // Extract public_ids from URLs, filter out invalid ones
    const publicIds = urlOrIds
      .map(item => item.startsWith('http') ? extractPublicId(item) : item)
      .filter((id): id is string => id !== null)

    if (publicIds.length === 0) {
      throw new Error('No valid public_ids to delete')
    }

    const cloudinary = await getCloudinary()

    const deleteResponse = await cloudinary.api.delete_resources(publicIds, {
      resource_type: 'image',
      invalidate: true,
    })

    return deleteResponse
  } catch (error) {
    console.error('Cloudinary Error in deleteFiles:', error)
    throw error
  }
}