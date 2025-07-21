/**
 * Format a file size in bytes to a human-readable string. (KB, MB, GB)
 * @param {number} bytes - The file size in bytes.
 * @param {number} [decimals=2] - The number of decimal places to include in the result.
 * @returns {string} A human-readable file size string.
 * @returns A formatted String with appropriate unit
 */

export function formatSize(bytes: number): string {
  if (bytes === 0) return "0 bytes";
  const k = 1024;
  const sizes = ["bytes", "KB", "MB", "GB", "TB"];
  // Determine the appropriate unit by calculating the log
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  // format with 2decimal places and round
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

export const generateUUID = () => crypto.randomUUID();