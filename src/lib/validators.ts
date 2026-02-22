/**
 * Validate that a string is a well-formed HTTP(S) URL.
 * Returns the normalized URL string or null if invalid.
 */
export function validateUrl(input: string): string | null {
  let urlString = input.trim();

  // If no protocol, prepend https://
  if (!/^https?:\/\//i.test(urlString)) {
    urlString = `https://${urlString}`;
  }

  try {
    const url = new URL(urlString);

    // Only allow http and https
    if (url.protocol !== "http:" && url.protocol !== "https:") {
      return null;
    }

    // Must have a valid hostname with at least one dot (no localhost for safety)
    if (!url.hostname.includes(".") && url.hostname !== "localhost") {
      return null;
    }

    return url.toString();
  } catch {
    return null;
  }
}
