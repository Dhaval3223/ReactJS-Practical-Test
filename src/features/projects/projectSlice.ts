import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { Project, ProjectFilters } from './types'
import * as api from './mockApi'

interface ProjectState {
  items: Project[]
  total: number
  page: number
  pageSize: number
  filters: ProjectFilters
  loading: boolean
  error: string | null
  selected?: Project | null
  createLoading: boolean
  updateLoading: boolean
  deleteLoading: boolean
}

const initialState: ProjectState = {
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

export const fetchProjects = createAsyncThunk(
  'projects/fetch',
  async (_: void, { getState }) => {
    const state = getState() as { projects: ProjectState }
    const { page, pageSize, filters } = state.projects
    return api.fetchProjects({ page, pageSize, filters })
  }
)

export const createProject = createAsyncThunk(
  'projects/create',
  async (project: Omit<Project, 'id'>) => api.createProject(project)
)

export const updateProject = createAsyncThunk(
  'projects/update',
  async ({ id, project }: { id: string; project: Partial<Project> }) => api.updateProject(id, project)
)

export const deleteProject = createAsyncThunk(
  'projects/delete',
  async (id: string) => api.deleteProject(id)
)

const projectSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload
    },
    setPageSize(state, action: PayloadAction<number>) {
      state.pageSize = action.payload
    },
    setFilters(state, action: PayloadAction<ProjectFilters>) {
      state.filters = action.payload
      state.page = 1
    },
    setSelected(state, action: PayloadAction<Project | null>) {
      state.selected = action.payload
    },
    clearError(state) {
      state.error = null
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchProjects.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload.data
        state.total = action.payload.total
        state.page = action.payload.page
        state.pageSize = action.payload.pageSize
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch projects'
      })
      .addCase(createProject.pending, state => {
        state.createLoading = true
        state.error = null
      })
      .addCase(createProject.fulfilled, state => {
        state.createLoading = false
      })
      .addCase(createProject.rejected, (state, action) => {
        state.createLoading = false
        state.error = action.error.message || 'Failed to create project'
      })
      .addCase(updateProject.pending, state => {
        state.updateLoading = true
        state.error = null
      })
      .addCase(updateProject.fulfilled, state => {
        state.updateLoading = false
      })
      .addCase(updateProject.rejected, (state, action) => {
        state.updateLoading = false
        state.error = action.error.message || 'Failed to update project'
      })
      .addCase(deleteProject.pending, state => {
        state.deleteLoading = true
        state.error = null
      })
      .addCase(deleteProject.fulfilled, state => {
        state.deleteLoading = false
      })
      .addCase(deleteProject.rejected, (state, action) => {
        state.deleteLoading = false
        state.error = action.error.message || 'Failed to delete project'
      })
  },
})

export const { setPage, setPageSize, setFilters, setSelected, clearError } = projectSlice.actions
export default projectSlice.reducer 