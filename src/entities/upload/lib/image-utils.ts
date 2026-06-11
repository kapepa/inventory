import { UploadResponse } from '../model/types/types'

export const formatResponsiveImage = (uploadResponse: UploadResponse): string => {
  return JSON.stringify({
    thumbnail: uploadResponse.small,
    small: uploadResponse.small,
    medium: uploadResponse.medium,
    large: uploadResponse.large,
    original: uploadResponse.original,
  })
}