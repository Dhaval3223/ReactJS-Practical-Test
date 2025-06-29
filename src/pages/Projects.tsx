import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Button, Dialog, DialogTitle, DialogContent, Typography } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import type { RootState, AppDispatch } from '../redux/store'
import ProjectTable from '../features/projects/ProjectTable'
import ProjectFilterBar from '../features/projects/ProjectFilterBar'
import Pagination from '../components/Pagination'
import ProjectForm from '../features/projects/ProjectForm'
import ConfirmDialog from '../components/ConfirmDialog'
import {
  fetchProjects, createProject, updateProject, deleteProject, setPage, setFilters, setSelected
} from '../features/projects/projectSlice'
import type { Project, ProjectFilters } from '../features/projects/types'

export default function ProjectsPage() {
  const { t } = useTranslation()
  const dispatch = useDispatch<AppDispatch>()
  const { items, total, page, pageSize, filters, loading, selected } = useSelector((state: RootState) => state.projects)
  const [hiddenColumns, setHiddenColumns] = useState<string[]>([])
  const [formOpen, setFormOpen] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<Project | null>(null)

  useEffect(() => {
    dispatch(fetchProjects())
  }, [dispatch, page, pageSize, filters])

  const handleAdd = () => {
    setEditMode(false)
    dispatch(setSelected(null))
    setFormOpen(true)
  }

  const handleEdit = (project: Project) => {
    setEditMode(true)
    dispatch(setSelected(project))
    setFormOpen(true)
  }

  const handleDelete = (project: Project) => {
    setDeleteTarget(project)
  }

  const handleFormSubmit = async (values: Omit<Project, 'id'> | Partial<Project>) => {
    if (editMode && selected) {
      await dispatch(updateProject({ id: selected.id, project: values as Partial<Project> }))
    } else {
      await dispatch(createProject(values as Omit<Project, 'id'>))
    }
    setFormOpen(false)
    dispatch(fetchProjects())
  }

  const handleDeleteConfirm = async () => {
    if (deleteTarget) {
      await dispatch(deleteProject(deleteTarget.id))
      setDeleteTarget(null)
      dispatch(fetchProjects())
    }
  }

  const handlePageChange = (newPage: number) => {
    dispatch(setPage(newPage))
  }

  const handleFilterChange = (newFilters: ProjectFilters) => {
    dispatch(setFilters(newFilters))
  }

  const handleResetFilters = () => {
    dispatch(setFilters({}))
    setHiddenColumns([])
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
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5">{t('projects.title')}</Typography>
        <Button variant="contained" onClick={handleAdd}>{t('projects.addProject')}</Button>
      </Box>
      <ProjectFilterBar
        filters={filters}
        hiddenColumns={hiddenColumns}
        onChangeFilters={handleFilterChange}
        onChangeHiddenColumns={setHiddenColumns}
        onReset={handleResetFilters}
      />
      <Box sx={{ flexGrow: 1, minHeight: 0, overflow: 'auto', display: 'flex', flexDirection: 'column' }}>
        <ProjectTable
          projects={items}
          loading={loading}
          hiddenColumns={hiddenColumns}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
        <Pagination
          page={page}
          pageSize={pageSize}
          total={total}
          onPageChange={handlePageChange}
        />
      </Box>
      {/* Add/Edit Modal */}
      <Dialog open={formOpen} onClose={() => setFormOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>{editMode ? t('projects.editProject') : t('projects.addProject')}</DialogTitle>
        <DialogContent>
          <ProjectForm
            initialValues={editMode && selected ? selected : {}}
            onSubmit={handleFormSubmit}
            onCancel={() => setFormOpen(false)}
            loading={loading}
          />
        </DialogContent>
      </Dialog>
      {/* Delete Confirm Dialog */}
      <ConfirmDialog
        open={!!deleteTarget}
        title={t('projects.editProject')}
        content={`Are you sure you want to delete project "${deleteTarget?.projectName}"?`}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDeleteConfirm}
        confirmText={t('common.delete')}
        cancelText={t('common.cancel')}
      />
    </Box>
  )
} 