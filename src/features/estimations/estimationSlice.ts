import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { Estimation, EstimationFilters } from './types'
import * as api from './mockApi'

interface EstimationState {
  items: Estimation[]
  total: number
  page: number
  pageSize: number
  filters: EstimationFilters
  loading: boolean
  error: string | null
  selected?: Estimation | null
}

const initialState: EstimationState = {
  items: [],
  total: 0,
  page: 1,
  pageSize: 10,
  filters: {},
  loading: false,
  error: null,
  selected: null,
}

export const fetchEstimations = createAsyncThunk(
  'estimations/fetch',
  async (_: void, { getState }) => {
    const state = getState() as { estimations: EstimationState }
    const { page, pageSize, filters } = state.estimations
    return api.fetchEstimations({ page, pageSize, filters })
  }
)

export const createEstimation = createAsyncThunk(
  'estimations/create',
  async (estimation: Omit<Estimation, 'id'>) => api.createEstimation(estimation)
)

export const updateEstimation = createAsyncThunk(
  'estimations/update',
  async ({ id, estimation }: { id: string; estimation: Partial<Estimation> }) => api.updateEstimation(id, estimation)
)

export const deleteEstimation = createAsyncThunk(
  'estimations/delete',
  async (id: string) => api.deleteEstimation(id)
)

const estimationSlice = createSlice({
  name: 'estimations',
  initialState,
  reducers: {
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload
    },
    setPageSize(state, action: PayloadAction<number>) {
      state.pageSize = action.payload
    },
    setFilters(state, action: PayloadAction<EstimationFilters>) {
      state.filters = action.payload
      state.page = 1
    },
    setSelected(state, action: PayloadAction<Estimation | null>) {
      state.selected = action.payload
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchEstimations.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchEstimations.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload.data
        state.total = action.payload.total
        state.page = action.payload.page
        state.pageSize = action.payload.pageSize
      })
      .addCase(fetchEstimations.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch estimations'
      })
      .addCase(createEstimation.fulfilled, state => {
        state.loading = false
      })
      .addCase(updateEstimation.fulfilled, state => {
        state.loading = false
      })
      .addCase(deleteEstimation.fulfilled, state => {
        state.loading = false
      })
  },
})

export const { setPage, setPageSize, setFilters, setSelected } = estimationSlice.actions
export default estimationSlice.reducer 