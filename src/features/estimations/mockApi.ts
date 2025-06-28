import type { Estimation, EstimationFilters, EstimationListResponse } from './types'

const estimations: Estimation[] = [
  {
    id: '1',
    name: 'Website Redesign',
    customer: 'Acme Corp',
    date: '2024-07-01',
    sections: [
      {
        id: 's1',
        title: 'Design',
        items: [
          {
            id: 'i1',
            title: 'UI Mockups',
            description: 'Create UI mockups',
            unit: 'hour',
            quantity: 10,
            price: 50,
            margin: 10,
          },
        ],
      },
    ],
  },
]

export async function fetchEstimations({ page = 1, pageSize = 10, filters = {} }: { page?: number; pageSize?: number; filters?: EstimationFilters }): Promise<EstimationListResponse> {
  let filtered = [...estimations]
  if (filters.search) {
    filtered = filtered.filter(e =>
      e.name.toLowerCase().includes(filters.search!.toLowerCase()) ||
      e.customer.toLowerCase().includes(filters.search!.toLowerCase())
    )
  }
  const total = filtered.length
  const start = (page - 1) * pageSize
  const data = filtered.slice(start, start + pageSize)
  return new Promise(resolve => setTimeout(() => resolve({ data, total, page, pageSize }), 400))
}

export async function createEstimation(estimation: Omit<Estimation, 'id'>): Promise<Estimation> {
  const newEstimation: Estimation = { ...estimation, id: Date.now().toString() }
  estimations.unshift(newEstimation)
  return new Promise(resolve => setTimeout(() => resolve(newEstimation), 400))
}

export async function updateEstimation(id: string, estimation: Partial<Estimation>): Promise<Estimation | null> {
  const idx = estimations.findIndex(e => e.id === id)
  if (idx === -1) return null
  estimations[idx] = { ...estimations[idx], ...estimation }
  return new Promise(resolve => setTimeout(() => resolve(estimations[idx]), 400))
}

export async function deleteEstimation(id: string): Promise<boolean> {
  const idx = estimations.findIndex(e => e.id === id)
  if (idx === -1) return false
  estimations.splice(idx, 1)
  return new Promise(resolve => setTimeout(() => resolve(true), 400))
} 