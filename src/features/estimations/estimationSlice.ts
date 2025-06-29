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
  createLoading: boolean
  updateLoading: boolean
  deleteLoading: boolean
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
  createLoading: false,
  updateLoading: false,
  deleteLoading: false,
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
    clearError(state) {
      state.error = null
    },
  },
  extraReducers: builder => {
    builder
      // Fetch estimations
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
      // Create estimation
      .addCase(createEstimation.pending, state => {
        state.createLoading = true
        state.error = null
      })
      .addCase(createEstimation.fulfilled, state => {
        state.createLoading = false
      })
      .addCase(createEstimation.rejected, (state, action) => {
        state.createLoading = false
        state.error = action.error.message || 'Failed to create estimation'
      })
      // Update estimation
      .addCase(updateEstimation.pending, state => {
        state.updateLoading = true
        state.error = null
      })
      .addCase(updateEstimation.fulfilled, state => {
        state.updateLoading = false
      })
      .addCase(updateEstimation.rejected, (state, action) => {
        state.updateLoading = false
        state.error = action.error.message || 'Failed to update estimation'
      })
      // Delete estimation
      .addCase(deleteEstimation.pending, state => {
        state.deleteLoading = true
        state.error = null
      })
      .addCase(deleteEstimation.fulfilled, state => {
        state.deleteLoading = false
      })
      .addCase(deleteEstimation.rejected, (state, action) => {
        state.deleteLoading = false
        state.error = action.error.message || 'Failed to delete estimation'
      })
  },
})

export const { setPage, setPageSize, setFilters, setSelected, clearError } = estimationSlice.actions
export default estimationSlice.reducer 