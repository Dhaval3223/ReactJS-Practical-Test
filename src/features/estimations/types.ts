export interface EstimationItem {
  id: string
  title: string
  description: string
  unit: string
  quantity: number
  price: number
  margin: number // percent
}

export interface EstimationSection {
  id: string
  title: string
  items: EstimationItem[]
}

export interface Estimation {
  id: string
  name: string
  customer: string
  date: string
  sections: EstimationSection[]
}

export interface EstimationFilters {
  search?: string
  customer?: string
  date?: string[]
}

export interface EstimationListResponse {
  data: Estimation[]
  total: number
  page: number
  pageSize: number
} 