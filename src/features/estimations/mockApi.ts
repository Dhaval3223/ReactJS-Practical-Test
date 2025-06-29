import axios from 'axios'
import type { Estimation, EstimationFilters, EstimationListResponse } from './types'

const API_BASE_URL = 'http://localhost:3001'

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export async function fetchEstimations({ page = 1, pageSize = 10, filters = {} }: { page?: number; pageSize?: number; filters?: EstimationFilters }): Promise<EstimationListResponse> {
  try {
    let url = `/estimations?_page=${page}&_limit=${pageSize}`
    
    // Add search filter
    if (filters.search) {
      url += `&q=${encodeURIComponent(filters.search)}`
    }
    
    // Add customer filter
    if (filters.customer) {
      url += `&customer=${encodeURIComponent(filters.customer)}`
    }
    
    // Add date filter
    if (filters.date && filters.date.length >= 2 && filters.date[0] && filters.date[1]) {
      url += `&date_gte=${filters.date[0]}&date_lte=${filters.date[1]}`
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
    console.error('Error fetching estimations:', error)
    throw error
  }
}

export async function createEstimation(estimation: Omit<Estimation, 'id'>): Promise<Estimation> {
  try {
    const response = await api.post('/estimations', estimation)
    return response.data
  } catch (error) {
    console.error('Error creating estimation:', error)
    throw error
  }
}

export async function updateEstimation(id: string, estimation: Partial<Estimation>): Promise<Estimation | null> {
  try {
    const response = await api.patch(`/estimations/${id}`, estimation)
    return response.data
  } catch (error) {
    console.error('Error updating estimation:', error)
    throw error
  }
}

export async function deleteEstimation(id: string): Promise<boolean> {
  try {
    await api.delete(`/estimations/${id}`)
    return true
  } catch (error) {
    console.error('Error deleting estimation:', error)
    throw error
  }
} 