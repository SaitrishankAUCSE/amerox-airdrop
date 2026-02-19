/**
 * Normalizes text for strict comparison by:
 * - Converting CRLF to LF
 * - Removing zero-width characters
 * - Collapsing multiple spaces into single space
 * - Trimming whitespace
 * - Normalizing Unicode using NFC
 * 
 * @param {string} text - The text to normalize
 * @returns {string} - The normalized text
 */
const normalizeText = (text) => {
    if (!text) return "";

    return text
        .replace(/\r\n/g, "\n") // Convert CRLF to LF
        // eslint-disable-next-line no-control-regex
        .replace(/[\u200B-\u200D\uFEFF]/g, "") // Remove zero-width characters
        .replace(/\s+/g, " ") // Collapse multiple spaces
        .trim() // Trim whitespace
        .normalize("NFC"); // Normalize Unicode
};

module.exports = { normalizeText };
