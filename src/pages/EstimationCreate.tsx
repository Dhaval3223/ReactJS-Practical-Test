import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import {
  Box, Typography, Container, Paper, Alert
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { IconButton } from '@mui/material'
import type { AppDispatch, RootState } from '../redux/store'
import { createEstimation, clearError } from '../features/estimations/estimationSlice'
import EstimationForm from '../features/estimations/EstimationForm'
import type { EstimationFormInputs } from '../features/estimations/EstimationForm'
import { transformFormToEstimation } from '../helpers/estimationHelpers'
import { ROUTES } from '../constants/routes'

export default function EstimationCreate() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const { createLoading, error } = useSelector((state: RootState) => state.estimations)

  const handleSubmit = async (values: EstimationFormInputs) => {
    try {
      const estimationData = transformFormToEstimation(values)
      await dispatch(createEstimation(estimationData)).unwrap()
      navigate(ROUTES.ESTIMATIONS)
    } catch (error) {
      console.error('Failed to create estimation:', error)
    }
  }

  const handleCancel = () => {
    navigate(ROUTES.ESTIMATIONS)
  }

  const handleCloseError = () => {
    dispatch(clearError())
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
            {t('estimations.addEstimation')}
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
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            loading={createLoading}
          />
        </Paper>
      </Box>
    </Container>
  )
} 