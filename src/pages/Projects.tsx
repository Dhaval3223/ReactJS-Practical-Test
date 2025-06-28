import { useEffect, useState } from 'react'
import { Box, Button, Dialog, DialogTitle, DialogContent, Typography, CircularProgress } from '@mui/material'
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

  const handleFormSubmit = async (values: any) => {
    if (editMode && selected) {
      await dispatch(updateProject({ id: selected.id, project: values }))
    } else {
      await dispatch(createProject(values))
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
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5">Projects</Typography>
        <Button variant="contained" onClick={handleAdd}>Add Project</Button>
      </Box>
      <ProjectFilterBar
        filters={filters}
        hiddenColumns={hiddenColumns}
        onChangeFilters={handleFilterChange}
        onChangeHiddenColumns={setHiddenColumns}
        onReset={handleResetFilters}
      />
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
      {/* Add/Edit Modal */}
      <Dialog open={formOpen} onClose={() => setFormOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>{editMode ? 'Edit Project' : 'Add New Project'}</DialogTitle>
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
        title="Delete Project"
        content={`Are you sure you want to delete project "${deleteTarget?.projectName}"?`}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDeleteConfirm}
        confirmText="Delete"
        cancelText="Cancel"
      />
    </Box>
  )
} 