import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'
import projectsReducer from '../features/projects/projectSlice'
import estimationsReducer from '../features/estimations/estimationSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    projects: projectsReducer,
    estimations: estimationsReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch 