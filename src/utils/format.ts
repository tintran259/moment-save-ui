/**
 * Compact number for display in tight UI spaces.
 * Examples: 2.5 tỷ | 1.8tr | 100k | 9.999
 *
 * Avoids toLocaleString on the suffix-formatted branches because
 * React Native / Hermes has unreliable vi-VN locale support.
 */
export function formatCompact(value: number): string {
  if (value >= 1_000_000_000) {
    const str = (value / 1_000_000_000).toFixed(3).replace(/\.?0+$/, '');
    return `${str} tỷ`;
  }
  if (value >= 1_000_000) {
    const str = (value / 1_000_000).toFixed(3).replace(/\.?0+$/, '');
    return `${str}tr`;
  }
  if (value >= 10_000) {
    return `${Math.round(value / 1_000)}k`;
  }
  return Math.round(value).toLocaleString('vi-VN');
}

/**
 * Format raw digit string for TextInput display.
 * "3000000" → "3.000.000"
 */
export function formatDigits(digits: string): string {
  if (!digits) return '';
  const num = parseInt(digits, 10);
  if (isNaN(num)) return '';
  return num.toLocaleString('vi-VN');
}
