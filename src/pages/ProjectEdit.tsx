import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useSelector, useDispatch } from 'react-redux'
import { Box, Button, Typography, Paper, CircularProgress } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import type { RootState, AppDispatch } from '../redux/store'
import ProjectForm from '../features/projects/ProjectForm'
import { updateProject, fetchProjects, setSelected } from '../features/projects/projectSlice'
import type { Project } from '../features/projects/types'
import { ROUTES } from '../constants/routes'

export default function ProjectEditPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const dispatch = useDispatch<AppDispatch>()
  const { items, loading, selected } = useSelector((state: RootState) => state.projects)

  useEffect(() => {
    if (id) {
      // Find the project in the current items or fetch it
      const project = items.find(p => p.id === id)
      if (project) {
        dispatch(setSelected(project))
      } else {
        // If project not found in current items, fetch all projects
        dispatch(fetchProjects())
      }
    }
  }, [id, items, dispatch])

  const handleSubmit = async (values: Partial<Project>) => {
    if (id) {
      await dispatch(updateProject({ id, project: values }))
      navigate(ROUTES.PROJECTS)
    }
  }

  const handleCancel = () => {
    navigate(ROUTES.PROJECTS)
  }

  if (loading && !selected) {
    return (
      <Box
        sx={{
          height: { xs: 'calc(100vh - 56px)', sm: 'calc(100vh - 64px)' },
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CircularProgress />
      </Box>
    )
  }

  if (!selected) {
    return (
      <Box
        sx={{
          height: { xs: 'calc(100vh - 56px)', sm: 'calc(100vh - 64px)' },
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          p: { xs: 2, sm: 3 },
        }}
      >
        <Typography variant="h6" color="text.secondary" mb={2}>
          Project not found
        </Typography>
        <Button variant="contained" onClick={() => navigate(ROUTES.PROJECTS)}>
          {t('common.back')}
        </Button>
      </Box>
    )
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
        <Typography variant="h5">{t('projects.editProject')}</Typography>
      </Box>
      
      <Paper sx={{ p: 3, flexGrow: 1, overflow: 'auto' }}>
        <ProjectForm
          initialValues={selected}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          loading={loading}
          submitText={t('projects.editProject')}
        />
      </Paper>
    </Box>
  )
} 