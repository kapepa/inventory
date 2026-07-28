import { ImageSizes, MultipleImageSources } from '@/shared'

export const formatResponsiveImage = (uploadResponse: Partial<ImageSizes>): string => {
  return JSON.stringify({
    thumbnail: uploadResponse.thumbnail,
    small: uploadResponse.small,
    medium: uploadResponse.medium,
    large: uploadResponse.large,
    original: uploadResponse.original,
  })
}

export const parseResponsiveImage = (imageString: string): MultipleImageSources | { url: string } | null => {
  if (!imageString) return null

  try {
    // If the string starts with {, it's JSON
    if (imageString.trim().startsWith('{')) {
      const parsed = JSON.parse(imageString)

      // Validation: required fields must be present
      if (!parsed.small || !parsed.medium || !parsed.large) {
        return null
      }

      return {
        thumbnail: parsed.thumbnail,
        small: parsed.small,
        medium: parsed.medium,
        large: parsed.large,
        original: parsed.original,
      }
    }

    // Otherwise, it's a simple URL (old format)
    return { url: imageString }
  } catch (error) {
    console.error('Failed to parse responsive image:', error)
    // Fallback: we assume this is a simple URL
    return { url: imageString }
  }
}

export const getThumbnailUrl = (source: string | null | undefined): string | null => {
  if (!source) return null

  const parsed = parseResponsiveImage(source)
  if (!parsed) return null

  if ('thumbnail' in parsed && parsed.thumbnail) {
    return parsed.thumbnail
  }

  if ('small' in parsed && parsed.small) {
    return parsed.small
  }

  if ('url' in parsed && parsed.url) {
    return parsed.url
  }

  return null
}