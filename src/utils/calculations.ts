/**
 * Mathematical calculation utilities
 */

/**
 * Calculate the total for an estimation item including margin
 * @param quantity - The quantity
 * @param price - The unit price
 * @param margin - The margin percentage
 * @returns Total amount including margin
 */
export function calculateItemTotal(quantity: number, price: number, margin: number): number {
  const base = quantity * price
  const marginAmount = (margin / 100) * base
  return base + marginAmount
}

/**
 * Calculate the total for an estimation including all sections and items
 * @param sections - Array of estimation sections
 * @returns Total estimation amount
 */
export function calculateEstimationTotal(sections: Array<{
  items: Array<{
    quantity: number
    price: number
    margin: number
  }>
}>): number {
  return sections.reduce((sum, section) =>
    sum + section.items.reduce((sectionSum, item) => {
      return sectionSum + calculateItemTotal(item.quantity, item.price, item.margin)
    }, 0)
  , 0)
}

/**
 * Calculate percentage
 * @param value - The value
 * @param total - The total value
 * @returns Percentage as a number
 */
export function calculatePercentage(value: number, total: number): number {
  if (total === 0) return 0
  return (value / total) * 100
}

/**
 * Round a number to specified decimal places
 * @param value - The value to round
 * @param decimals - Number of decimal places (default: 2)
 * @returns Rounded number
 */
export function roundToDecimals(value: number, decimals: number = 2): number {
  return Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals)
} 