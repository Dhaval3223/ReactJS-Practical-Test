import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Tooltip, Typography
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import type { Project } from './types'
import { PROJECT_COLUMNS } from '../../constants/columns'

interface ProjectTableProps {
  projects: Project[]
  loading?: boolean
  hiddenColumns: string[]
  onEdit: (project: Project) => void
  onDelete: (project: Project) => void
}

export default function ProjectTable({ projects, loading, hiddenColumns, onEdit, onDelete }: ProjectTableProps) {
  const visibleColumns = PROJECT_COLUMNS.filter(col => !hiddenColumns.includes(col.key))

  return (
    <TableContainer component={Paper} sx={{ minWidth: 900 }}>
      <Table size="small">
        <TableHead>
          <TableRow>
            {visibleColumns.map(col => (
              <TableCell key={col.key} sx={{ fontWeight: 'bold' }}>{col.label}</TableCell>
            ))}
            <TableCell align="right" sx={{ fontWeight: 'bold' }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {projects.length === 0 && !loading && (
            <TableRow>
              <TableCell colSpan={visibleColumns.length + 1} align="center">
                <Typography variant="body2" color="text.secondary">No projects found.</Typography>
              </TableCell>
            </TableRow>
          )}
          {projects.map(project => (
            <TableRow key={project.id} hover>
              {visibleColumns.map(col => (
                <TableCell key={col.key}>
                  {project[col.key as keyof Project]}
                </TableCell>
              ))}
              <TableCell align="right">
                <Tooltip title="Edit">
                  <IconButton size="small" onClick={() => onEdit(project)}>
                    <EditIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                  <IconButton size="small" color="error" onClick={() => onDelete(project)}>
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
} 