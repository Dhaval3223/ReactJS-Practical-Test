import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import {
  Box, Button, Typography, Paper, Alert
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import type { AppDispatch, RootState } from '../../redux/store'
import { fetchEstimations, deleteEstimation as deleteEstimationAction } from './estimationSlice'
import EstimationTable from './EstimationTable'
import type { Estimation } from './types'
import ConfirmDialog from '../../components/ConfirmDialog'
import Pagination from '../../components/Pagination'
import { PAGINATION } from '../../constants/enums'
import { ROUTES } from '../../constants/routes'

export default function EstimationsPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const { items: estimations, loading, error } = useSelector((state: RootState) => state.estimations)
  
  // Local state
  const [estimationToDelete, setEstimationToDelete] = useState<Estimation | null>(null)
  const [currentPage, setCurrentPage] = useState(PAGINATION.DEFAULT_PAGE)
  const [itemsPerPage] = useState(PAGINATION.DEFAULT_PAGE_SIZE)

  // Fetch estimations on component mount
  useEffect(() => {
    dispatch(fetchEstimations())
  }, [dispatch])

  // Calculate pagination
  const totalPages = Math.ceil(estimations.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentEstimations = estimations.slice(startIndex, endIndex)

  // Navigation handlers
  const handleCreate = () => {
    navigate(ROUTES.ESTIMATION_CREATE)
  }

  const handleEdit = (estimation: Estimation) => {
    navigate(`${ROUTES.ESTIMATION_EDIT.replace(':id', estimation.id)}`)
  }

  const handleDelete = (estimation: Estimation) => {
    setEstimationToDelete(estimation)
  }

  const handleConfirmDelete = async () => {
    if (estimationToDelete) {
      try {
        await dispatch(deleteEstimationAction(estimationToDelete.id)).unwrap()
        setEstimationToDelete(null)
      } catch (error) {
        console.error('Failed to delete estimation:', error)
      }
    }
  }

  const handleCancelDelete = () => {
    setEstimationToDelete(null)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <Box sx={{ p: 2 }} width="100%" height="100%">
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" component="h1">
          {t('estimations.title')}
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleCreate}
        >
          {t('estimations.addEstimation')}
        </Button>
      </Box>

      {/* Error Alert */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* Table */}
      <Paper sx={{ mb: 3 }}>
        <EstimationTable
          estimations={currentEstimations}
          loading={loading}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </Paper>

      {/* Pagination */}
      {totalPages > 1 && (
        <Box display="flex" justifyContent="center" mb={3}>
          <Pagination
            page={currentPage}
            pageSize={itemsPerPage}
            total={estimations.length}
            onPageChange={handlePageChange}
          />
        </Box>
      )}

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        open={!!estimationToDelete}
        title={t('estimations.editEstimation')}
        content={`Are you sure you want to delete "${estimationToDelete?.name}"? This action cannot be undone.`}
        onConfirm={handleConfirmDelete}
        onClose={handleCancelDelete}
        confirmText={t('common.delete')}
        cancelText={t('common.cancel')}
      />
    </Box>
  )
} 