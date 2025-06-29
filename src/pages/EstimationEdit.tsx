import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'
import {
  Box, Typography, Container, Paper, Alert, CircularProgress
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { IconButton } from '@mui/material'
import type { AppDispatch, RootState } from '../redux/store'
import { updateEstimation, fetchEstimations, clearError } from '../features/estimations/estimationSlice'
import EstimationForm from '../features/estimations/EstimationForm'
import type { EstimationFormInputs } from '../features/estimations/EstimationForm'
import { transformFormToEstimation } from '../helpers/estimationHelpers'
import { ROUTES } from '../constants/routes'

export default function EstimationEdit() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const dispatch = useDispatch<AppDispatch>()
  const { items: estimations, loading, updateLoading, error } = useSelector((state: RootState) => state.estimations)

  // Find the estimation to edit
  const estimation = estimations.find(est => est.id === id)

  // Fetch estimations if not already loaded
  useEffect(() => {
    if (estimations.length === 0) {
      dispatch(fetchEstimations())
    }
  }, [dispatch, estimations.length])

  const handleSubmit = async (values: EstimationFormInputs) => {
    if (!id) return
    
    try {
      const estimationData = transformFormToEstimation(values)
      await dispatch(updateEstimation({ 
        id, 
        estimation: estimationData 
      })).unwrap()
      navigate(ROUTES.ESTIMATIONS)
    } catch (error) {
      console.error('Failed to update estimation:', error)
    }
  }

  const handleCancel = () => {
    navigate(ROUTES.ESTIMATIONS)
  }

  const handleCloseError = () => {
    dispatch(clearError())
  }

  // Show loading if estimations are being fetched
  if (loading && estimations.length === 0) {
    return (
      <Container maxWidth="xl">
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
          <CircularProgress />
        </Box>
      </Container>
    )
  }

  // Show error if estimation not found
  if (!estimation) {
    return (
      <Container maxWidth="xl">
        <Box sx={{ p: 2 }} width="100%" height="100%">
          <Box display="flex" alignItems="center" mb={3}>
            <IconButton onClick={() => navigate(ROUTES.ESTIMATIONS)} sx={{ mr: 2 }}>
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h4" component="h1">
              {t('estimations.editEstimation')}
            </Typography>
          </Box>
          <Alert severity="error">
            Estimation not found.
          </Alert>
        </Box>
      </Container>
    )
  }

  return (
    <Container maxWidth="xl">
      <Box sx={{ p: 2 }} width="100%" height="100%">
        {/* Header */}
        <Box display="flex" alignItems="center" mb={3}>
          <IconButton onClick={() => navigate(ROUTES.ESTIMATIONS)} sx={{ mr: 2 }}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h4" component="h1">
            {t('estimations.editEstimation')}
          </Typography>
        </Box>

        {/* Error Alert */}
        {error && (
          <Alert severity="error" onClose={handleCloseError} sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {/* Form */}
        <Paper sx={{ p: 3 }}>
          <EstimationForm
            initialValues={estimation}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            loading={updateLoading}
          />
        </Paper>
      </Box>
    </Container>
  )
} 