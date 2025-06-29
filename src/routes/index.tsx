import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import App from '../App'
import Login from '../pages/Login'
import Register from '../pages/Register'
import ForgotPassword from '../pages/ForgotPassword'
import Dashboard from '../pages/Dashboard'
import Projects from '../pages/Projects'
import ProjectCreate from '../pages/ProjectCreate'
import ProjectEdit from '../pages/ProjectEdit'
import Estimations from '../pages/Estimations'
import EstimationCreate from '../pages/EstimationCreate'
import EstimationEdit from '../pages/EstimationEdit'
import ProtectedRoute from './ProtectedRoute'
import MainLayout from '../components/Layout/MainLayout'
import { ROUTES } from '../constants/routes'

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <App>
        <Routes>
          <Route path="/" element={<Navigate to={ROUTES.LOGIN} replace />} />
          <Route path={ROUTES.LOGIN} element={<Login />} />
          <Route path={ROUTES.REGISTER} element={<Register />} />
          <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPassword />} />
          <Route element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
            <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
            <Route path={ROUTES.PROJECTS} element={<Projects />} />
            <Route path={ROUTES.PROJECT_CREATE} element={<ProjectCreate />} />
            <Route path={ROUTES.PROJECT_EDIT} element={<ProjectEdit />} />
            <Route path={ROUTES.ESTIMATIONS} element={<Estimations />} />
            <Route path={ROUTES.ESTIMATION_CREATE} element={<EstimationCreate />} />
            <Route path={ROUTES.ESTIMATION_EDIT} element={<EstimationEdit />} />
          </Route>
        </Routes>
      </App>
    </BrowserRouter>
  )
} 