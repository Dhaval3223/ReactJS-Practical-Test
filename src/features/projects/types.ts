export interface Project {
  id: string
  customer: string
  refNumber: string
  projectName: string
  projectNumber: string
  manager: string
  areaLocation: string
  address: string
  dueDate: string
  contact: string
  staff: string
  status: string
  email: string
}

export interface ProjectFilters {
  search?: string
  status?: string[]
  date?: string[]
}

export interface ProjectListResponse {
  data: Project[]
  total: number
  page: number
  pageSize: number
} 