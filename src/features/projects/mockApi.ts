import axios from 'axios'
import type { Project, ProjectFilters, ProjectListResponse } from './types'

const API_BASE_URL = 'http://localhost:3001'

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export async function fetchProjects({ page = 1, pageSize = 10, filters = {} }: { page?: number; pageSize?: number; filters?: ProjectFilters }): Promise<ProjectListResponse> {
  try {
    let url = `/projects?_page=${page}&_limit=${pageSize}`
    
    // Add search filter
    if (filters.search) {
      url += `&q=${encodeURIComponent(filters.search)}`
    }
    
    // Add status filter
    if (filters.status && filters.status.length) {
      filters.status.forEach(status => {
        url += `&status=${encodeURIComponent(status)}`
      })
    }
    
    // Add date filter
    if (filters.date && filters.date.length >= 2 && filters.date[0] && filters.date[1]) {
      url += `&dueDate_gte=${filters.date[0]}&dueDate_lte=${filters.date[1]}`
    }
    
    const response = await api.get(url)
    const total = response.headers['x-total-count'] ? parseInt(response.headers['x-total-count']) : response.data.length
    
    return {
      data: response.data,
      total,
      page,
      pageSize,
    }
  } catch (error) {
    console.error('Error fetching projects:', error)
    throw error
  }
}

export async function createProject(project: Omit<Project, 'id'>): Promise<Project> {
  try {
    const response = await api.post('/projects', project)
    return response.data
  } catch (error) {
    console.error('Error creating project:', error)
    throw error
  }
}

export async function updateProject(id: string, project: Partial<Project>): Promise<Project | null> {
  try {
    const response = await api.patch(`/projects/${id}`, project)
    return response.data
  } catch (error) {
    console.error('Error updating project:', error)
    throw error
  }
}

export async function deleteProject(id: string): Promise<boolean> {
  try {
    await api.delete(`/projects/${id}`)
    return true
  } catch (error) {
    console.error('Error deleting project:', error)
    throw error
  }
} 