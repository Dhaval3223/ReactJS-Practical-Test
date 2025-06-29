import type { Project, ProjectFilters, ProjectListResponse } from './types'

const projects: Project[] = [
  {
    id: '1',
    customer: 'Olivia Martin',
    refNumber: '89PQRS6789T1U2V3',
    projectName: 'Sarah Williams',
    projectNumber: 'PQRST9012R',
    manager: 'Sarah Williams',
    areaLocation: 'Telangana',
    address: 'Mumbai, Maharastra',
    dueDate: '2024-08-03',
    contact: '1234567890',
    staff: 'John Doe',
    status: 'Completed',
    email: 'olivia@example.com',
  },
  // ...add more mock projects as needed
]

export async function fetchProjects({ page = 1, pageSize = 10, filters = {} }: { page?: number; pageSize?: number; filters?: ProjectFilters }): Promise<ProjectListResponse> {
  let filtered = [...projects]
  if (filters.search) {
    filtered = filtered.filter(p =>
      p.customer.toLowerCase().includes(filters.search!.toLowerCase()) ||
      p.projectName.toLowerCase().includes(filters.search!.toLowerCase())
    )
  }
  if (filters.status && filters.status.length) {
    filtered = filtered.filter(p => filters.status!.includes(p.status))
  }
  if (filters.date && filters.date.length >= 2 && filters.date[0] && filters.date[1]) {
    const fromDate = new Date(filters.date[0])
    const toDate = new Date(filters.date[1])
    filtered = filtered.filter(p => {
      const projectDate = new Date(p.dueDate)
      return projectDate >= fromDate && projectDate <= toDate
    })
  }
  const total = filtered.length
  const start = (page - 1) * pageSize
  const data = filtered.slice(start, start + pageSize)
  return new Promise(resolve => setTimeout(() => resolve({ data, total, page, pageSize }), 400))
}

export async function createProject(project: Omit<Project, 'id'>): Promise<Project> {
  const newProject: Project = { ...project, id: Date.now().toString() }
  projects.unshift(newProject)
  return new Promise(resolve => setTimeout(() => resolve(newProject), 400))
}

export async function updateProject(id: string, project: Partial<Project>): Promise<Project | null> {
  const idx = projects.findIndex(p => p.id === id)
  if (idx === -1) return null
  projects[idx] = { ...projects[idx], ...project }
  return new Promise(resolve => setTimeout(() => resolve(projects[idx]), 400))
}

export async function deleteProject(id: string): Promise<boolean> {
  const idx = projects.findIndex(p => p.id === id)
  if (idx === -1) return false
  projects.splice(idx, 1)
  return new Promise(resolve => setTimeout(() => resolve(true), 400))
} 