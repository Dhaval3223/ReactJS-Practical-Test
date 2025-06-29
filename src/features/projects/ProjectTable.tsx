import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Tooltip, Typography
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import type { Project } from './types'

interface ProjectTableProps {
  projects: Project[]
  loading?: boolean
  onEdit: (project: Project) => void
  onDelete: (project: Project) => void
}

export default function ProjectTable({ projects, loading, onEdit, onDelete }: ProjectTableProps) {
  return (
    <TableContainer component={Paper} sx={{ width: '100%', overflow: 'auto' }}>
      <Table size="small" sx={{ minWidth: 900 }}>
        <TableHead>
          <TableRow>
            <TableCell rowSpan={2} sx={{ fontWeight: 'bold', verticalAlign: 'middle', minWidth: 120 }}>CUSTOMER</TableCell>
            <TableCell rowSpan={2} sx={{ fontWeight: 'bold', verticalAlign: 'middle', minWidth: 120 }}>REF NUMBER</TableCell>
            <TableCell colSpan={2} align="center" sx={{ fontWeight: 'bold', minWidth: 220 }}>PROJECT REFERENCE</TableCell>
            <TableCell colSpan={2} align="center" sx={{ fontWeight: 'bold', minWidth: 220 }}>PROJECT LOCATION</TableCell>
            <TableCell rowSpan={2} align="right" sx={{ fontWeight: 'bold', verticalAlign: 'middle' }}>Actions</TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold', minWidth: 110 }}>PROJECT NAME</TableCell>
            <TableCell sx={{ fontWeight: 'bold', minWidth: 110 }}>PROJECT NUMBER</TableCell>
            <TableCell sx={{ fontWeight: 'bold', minWidth: 110 }}>AREA LOCATION</TableCell>
            <TableCell sx={{ fontWeight: 'bold', minWidth: 110 }}>ADDRESS</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {projects.length === 0 && !loading && (
            <TableRow>
              <TableCell colSpan={7} align="center">
                <Typography variant="body2" color="text.secondary">No projects found.</Typography>
              </TableCell>
            </TableRow>
          )}
          {projects.map(project => (
            <TableRow key={project.id} hover>
              <TableCell>{project.customer}</TableCell>
              <TableCell>{project.refNumber}</TableCell>
              <TableCell>{project.projectName}</TableCell>
              <TableCell>{project.projectNumber}</TableCell>
              <TableCell>{project.areaLocation}</TableCell>
              <TableCell>{project.address}</TableCell>
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