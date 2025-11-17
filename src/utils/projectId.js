/**
 * Escapes a project ID to make it safe for use in HTML id attributes and URL hashes.
 * Handles special characters that might appear in project IDs.
 *
 * @param {string} projectId - The raw project ID
 * @returns {string} The escaped project ID safe for HTML and URLs
 */
export function escapeProjectId(projectId) {
  if (!projectId) return '';
  return encodeURIComponent(projectId);
}

/**
 * Unescapes a project ID that was previously escaped with escapeProjectId.
 * Used when reading project IDs from URL hashes or HTML id attributes.
 *
 * @param {string} escapedId - The escaped project ID
 * @returns {string} The original project ID
 */
export function unescapeProjectId(escapedId) {
  if (!escapedId) return '';
  try {
    return decodeURIComponent(escapedId);
  } catch (e) {
    // If decoding fails, return the original string
    console.warn('Failed to decode project ID:', escapedId, e);
    return escapedId;
  }
}
