/**
 * Application routes constants
 */

export const ROUTES = {
  // Public routes
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  
  // Protected routes
  DASHBOARD: '/dashboard',
  PROJECTS: '/projects',
  PROJECT_CREATE: '/projects/create',
  PROJECT_EDIT: '/projects/:id/edit',
  ESTIMATIONS: '/estimations',
  ESTIMATION_CREATE: '/estimations/create',
  ESTIMATION_EDIT: '/estimations/:id/edit',
} as const

export const PUBLIC_ROUTES = [
  ROUTES.LOGIN,
  ROUTES.REGISTER,
  ROUTES.FORGOT_PASSWORD,
] as const

export const PROTECTED_ROUTES = [
  ROUTES.DASHBOARD,
  ROUTES.PROJECTS,
  ROUTES.PROJECT_CREATE,
  ROUTES.PROJECT_EDIT,
  ROUTES.ESTIMATIONS,
  ROUTES.ESTIMATION_CREATE,
  ROUTES.ESTIMATION_EDIT,
] as const 