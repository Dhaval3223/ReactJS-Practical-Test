/**
 * Currency formatting utilities
 */

export const CURRENCY_CONFIG = {
  style: 'currency' as const,
  currency: 'USD' as const,
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
}

/**
 * Format a number as USD currency
 * @param amount - The amount to format
 * @returns Formatted currency string
 */
export function formatCurrency(amount: number): string {
  return amount.toLocaleString(undefined, CURRENCY_CONFIG)
}

/**
 * Format a number as USD currency with custom options
 * @param amount - The amount to format
 * @param options - Custom formatting options
 * @returns Formatted currency string
 */
export function formatCurrencyWithOptions(
  amount: number, 
  options: Partial<typeof CURRENCY_CONFIG> = {}
): string {
  return amount.toLocaleString(undefined, { ...CURRENCY_CONFIG, ...options })
} 