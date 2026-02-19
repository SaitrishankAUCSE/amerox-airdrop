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
export const normalizeText = (text) => {
    if (!text) return "";

    return text
        .replace(/\r\n/g, "\n") // Convert CRLF to LF
        // eslint-disable-next-line no-control-regex
        .replace(/[\u200B-\u200D\uFEFF]/g, "") // Remove zero-width characters
        .replace(/\s+/g, " ") // Collapse multiple spaces
        .trim() // Trim whitespace
        .normalize("NFC"); // Normalize Unicode
};

// export const normalizeText = ... (ES module syntax if project uses ES modules primarily)
// But since Next.js API routes use CommonJS (require), module.exports is best for API routes.
// For client side, we might need ES modules.
// Let's use ES module syntax if we are importing in .js files via `import` but API routes run Node.js.
// Since package.json has `"type": "module"` missing (defaults to CJS), but Next.js supports ES modules.
// Let's stick to CommonJS for utilities used by server-side logic (API routes).
