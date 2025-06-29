import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useSelector, useDispatch } from 'react-redux'
import { Box, Button, Typography, Paper, Alert } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import type { RootState, AppDispatch } from '../redux/store'
import ProjectForm from '../features/projects/ProjectForm'
import { createProject, clearError } from '../features/projects/projectSlice'
import type { Project } from '../features/projects/types'
import { ROUTES } from '../constants/routes'

export default function ProjectCreatePage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const { createLoading, error } = useSelector((state: RootState) => state.projects)

  const handleSubmit = async (values: Omit<Project, 'id'>) => {
    await dispatch(createProject(values))
    navigate(ROUTES.PROJECTS)
  }

  const handleCancel = () => {
    navigate(ROUTES.PROJECTS)
  }

  const handleCloseError = () => {
    dispatch(clearError())
  }

  return (
    <Box
      sx={{
        height: { xs: 'calc(100vh - 56px)', sm: 'calc(100vh - 64px)' },
        display: 'flex',
        flexDirection: 'column',
        p: { xs: 2, sm: 3 },
        maxWidth: 'calc(100vw - 280px)',
        width: '100%',
      }}
    >
      <Box display="flex" alignItems="center" mb={3}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(ROUTES.PROJECTS)}
          sx={{ mr: 2 }}
        >
          {t('common.back')}
        </Button>
        <Typography variant="h5">{t('projects.addProject')}</Typography>
      </Box>
      
      {error && (
        <Alert severity="error" onClose={handleCloseError} sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      
      <Paper sx={{ p: 3, flexGrow: 1, overflow: 'auto' }}>
        <ProjectForm
          initialValues={{}}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          loading={createLoading}
          submitText={t('projects.addProject')}
        />
      </Paper>
    </Box>
  )
} 