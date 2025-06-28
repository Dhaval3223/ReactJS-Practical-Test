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
      .addCase(createProject.fulfilled, state => {
        state.loading = false
      })
      .addCase(updateProject.fulfilled, state => {
        state.loading = false
      })
      .addCase(deleteProject.fulfilled, state => {
        state.loading = false
      })
  },
})

export const { setPage, setPageSize, setFilters, setSelected } = projectSlice.actions
export default projectSlice.reducer 