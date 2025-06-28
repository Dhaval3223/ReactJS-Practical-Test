/**
 * Estimation business logic helpers
 */

import type { Estimation } from '../features/estimations/types'
import type { EstimationFormInputs } from '../features/estimations/EstimationForm'
import { calculateItemTotal } from '../utils/calculations'

/**
 * Transform form data to Estimation type
 * @param formData - Form input data
 * @returns Estimation object without ID
 */
export function transformFormToEstimation(formData: EstimationFormInputs): Omit<Estimation, 'id'> {
  return {
    name: formData.name,
    customer: formData.customer,
    date: formData.date,
    sections: formData.sections.map((section) => ({
      id: `section-${Date.now()}-${Math.random()}`, // Generate temporary ID
      title: section.title,
      items: section.items.map((item) => ({
        id: `item-${Date.now()}-${Math.random()}`, // Generate temporary ID
        title: item.title,
        description: item.description || '',
        unit: item.unit,
        quantity: item.quantity,
        price: item.price,
        margin: item.margin,
      }))
    }))
  }
}

/**
 * Calculate total for a single estimation item
 * @param item - Estimation item
 * @returns Total amount including margin
 */
export function getEstimationItemTotal(item: {
  quantity: number
  price: number
  margin: number
}): number {
  return calculateItemTotal(item.quantity, item.price, item.margin)
}

/**
 * Calculate total for an entire estimation
 * @param estimation - Estimation object
 * @returns Total estimation amount
 */
export function getEstimationTotal(estimation: Estimation): number {
  return estimation.sections.reduce((sum, section) =>
    sum + section.items.reduce((s, item) => {
      return s + getEstimationItemTotal(item)
    }, 0)
  , 0)
}

/**
 * Generate unique ID for estimation items
 * @param prefix - ID prefix
 * @returns Unique ID string
 */
export function generateEstimationId(prefix: string = 'item'): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
} 