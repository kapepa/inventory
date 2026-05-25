interface GetFirstLetterOptions {
  fallback?: string;
  lowerFirst?: boolean;
}

export const getFirstLetter = (
  name: string | null | undefined,
  options: GetFirstLetterOptions = {}
): string => {
  const { fallback = '', lowerFirst = false } = options;

  if (!name || name.length === 0) return fallback;

  let firstChar = name.charAt(0);

  if (lowerFirst) {
    return firstChar.toLowerCase();
  }

  return firstChar.toUpperCase();
};