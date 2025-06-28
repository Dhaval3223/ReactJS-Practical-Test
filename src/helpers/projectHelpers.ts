/**
 * Project business logic helpers
 */

import type { Project } from '../features/projects/types'

/**
 * Filter projects based on search criteria
 * @param projects - Array of projects
 * @param search - Search term
 * @returns Filtered projects
 */
export function filterProjectsBySearch(projects: Project[], search: string): Project[] {
  if (!search.trim()) return projects
  
  const searchLower = search.toLowerCase()
  return projects.filter(project =>
    project.customer.toLowerCase().includes(searchLower) ||
    project.projectName.toLowerCase().includes(searchLower) ||
    project.refNumber.toLowerCase().includes(searchLower)
  )
}

/**
 * Filter projects by status
 * @param projects - Array of projects
 * @param statuses - Array of status values to filter by
 * @returns Filtered projects
 */
export function filterProjectsByStatus(projects: Project[], statuses: string[]): Project[] {
  if (statuses.length === 0) return projects
  
  return projects.filter(project => statuses.includes(project.status))
}

/**
 * Sort projects by a specific field
 * @param projects - Array of projects
 * @param field - Field to sort by
 * @param direction - Sort direction ('asc' or 'desc')
 * @returns Sorted projects
 */
export function sortProjects(projects: Project[], field: keyof Project, direction: 'asc' | 'desc' = 'asc'): Project[] {
  return [...projects].sort((a, b) => {
    const aValue = a[field]
    const bValue = b[field]
    
    if (aValue < bValue) return direction === 'asc' ? -1 : 1
    if (aValue > bValue) return direction === 'asc' ? 1 : -1
    return 0
  })
}

/**
 * Get project status color
 * @param status - Project status
 * @returns Color string
 */
export function getProjectStatusColor(status: string): string {
  const statusColors: Record<string, string> = {
    'Completed': '#4caf50',
    'Processing': '#2196f3',
    'Rejected': '#f44336',
    'On Hold': '#ff9800',
    'In Transit': '#9c27b0',
  }
  
  return statusColors[status] || '#757575'
} 