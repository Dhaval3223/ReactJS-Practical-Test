/**
 * Application enums and status constants
 */

export const PROJECT_STATUS = {
  COMPLETED: 'Completed',
  PROCESSING: 'Processing',
  REJECTED: 'Rejected',
  ON_HOLD: 'On Hold',
  IN_TRANSIT: 'In Transit',
} as const

export const PROJECT_STATUS_OPTIONS = [
  PROJECT_STATUS.COMPLETED,
  PROJECT_STATUS.PROCESSING,
  PROJECT_STATUS.REJECTED,
  PROJECT_STATUS.ON_HOLD,
  PROJECT_STATUS.IN_TRANSIT,
] as const

export const ACTIVITY_STATUS = {
  COMPLETED: 'completed',
  IN_PROGRESS: 'in-progress',
  PENDING: 'pending',
} as const

export const ACTIVITY_TYPE = {
  PROJECT: 'project',
  ESTIMATION: 'estimation',
} as const

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  DEFAULT_PAGE: 1,
} 