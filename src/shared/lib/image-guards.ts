import { ImageSource, MultipleImageSources, SingleImageSource } from "../types";

// Type guard to check if the source has multiple sizes
export const isMultipleSources = (source: ImageSource): source is MultipleImageSources => {
  return typeof source === "object" &&
    "small" in source &&
    "medium" in source &&
    "large" in source &&
    (!("thumbnail" in source) || typeof source.thumbnail === "string") &&
    (!("original" in source) || typeof source.original === "string");
}

// Type guard to check if the source has a single URL
export const isSingleSource = (source: ImageSource): source is SingleImageSource => {
  if (typeof source !== "object" || source === null) return false;

  // Must have url field
  if (!("url" in source)) return false;

  // Must NOT have any of the multiple source required fields
  const hasMultipleFields =
    "small" in source ||
    "medium" in source ||
    "large" in source;

  return !hasMultipleFields;
}