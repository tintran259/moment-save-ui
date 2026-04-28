/**
 * Compact number for display in tight UI spaces.
 * Examples: 2.000 tỷ | 36,5 triệu | 100k | 9.999
 */
export function formatCompact(value: number): string {
  if (value >= 1_000_000_000) {
    const v = value / 1_000_000_000;
    return `${parseFloat(v.toFixed(1)).toLocaleString('vi-VN')} tỷ`;
  }
  if (value >= 1_000_000) {
    const v = value / 1_000_000;
    return `${parseFloat(v.toFixed(1)).toLocaleString('vi-VN')} triệu`;
  }
  if (value >= 10_000) {
    return `${Math.round(value / 1_000)}k`;
  }
  return value.toLocaleString('vi-VN');
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
