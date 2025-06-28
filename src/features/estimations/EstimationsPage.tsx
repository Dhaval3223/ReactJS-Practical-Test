import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import {
  Box, Button, Typography, Dialog, DialogTitle, DialogContent,
  Container, Paper, Alert
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import type { AppDispatch, RootState } from '../../redux/store'
import { fetchEstimations, createEstimation, updateEstimation, deleteEstimation as deleteEstimationAction } from './estimationSlice'
import EstimationTable from './EstimationTable'
import EstimationForm from './EstimationForm'
import type { EstimationFormInputs } from './EstimationForm'
import type { Estimation } from './types'
import ConfirmDialog from '../../components/ConfirmDialog'
import Pagination from '../../components/Pagination'
import { transformFormToEstimation } from '../../helpers/estimationHelpers'
import { PAGINATION } from '../../constants/enums'

export default function EstimationsPage() {
  const { t } = useTranslation()
  const dispatch = useDispatch<AppDispatch>()
  const { items: estimations, loading, error } = useSelector((state: RootState) => state.estimations)
  
  // Local state
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingEstimation, setEditingEstimation] = useState<Estimation | null>(null)
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

  // Form handlers
  const handleCreate = () => {
    setEditingEstimation(null)
    setIsFormOpen(true)
  }

  const handleEdit = (estimation: Estimation) => {
    setEditingEstimation(estimation)
    setIsFormOpen(true)
  }

  const handleDelete = (estimation: Estimation) => {
    setEstimationToDelete(estimation)
  }

  const handleFormSubmit = async (values: EstimationFormInputs) => {
    try {
      const estimationData = transformFormToEstimation(values)
      
      if (editingEstimation) {
        await dispatch(updateEstimation({ 
          id: editingEstimation.id, 
          estimation: estimationData 
        })).unwrap()
      } else {
        await dispatch(createEstimation(estimationData)).unwrap()
      }
      setIsFormOpen(false)
      setEditingEstimation(null)
    } catch (error) {
      console.error('Failed to save estimation:', error)
    }
  }

  const handleFormCancel = () => {
    setIsFormOpen(false)
    setEditingEstimation(null)
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
    <Container maxWidth="xl">
      <Box sx={{ py: 4 }}>
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

        {/* Form Modal */}
        <Dialog
          open={isFormOpen}
          onClose={handleFormCancel}
          maxWidth="xl"
          fullWidth
          PaperProps={{
            sx: { maxHeight: '90vh' }
          }}
        >
          <DialogTitle>
            {editingEstimation ? t('estimations.editEstimation') : t('estimations.addEstimation')}
          </DialogTitle>
          <DialogContent>
            <EstimationForm
              initialValues={editingEstimation || undefined}
              onSubmit={handleFormSubmit}
              onCancel={handleFormCancel}
              loading={loading}
            />
          </DialogContent>
        </Dialog>

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
    </Container>
  )
} 