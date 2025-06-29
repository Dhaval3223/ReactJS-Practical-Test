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
  hiddenColumns?: string[]
  onEdit: (project: Project) => void
  onDelete: (project: Project) => void
}

const GROUPS = [
  { label: 'CUSTOMER', keys: ['customer'] },
  { label: 'REF NUMBER', keys: ['refNumber'] },
  { label: 'PROJECT REFERENCE', keys: ['projectName', 'projectNumber'] },
  { label: 'PROJECT LOCATION', keys: ['areaLocation', 'address'] },
]

export default function ProjectTable({ projects, loading, hiddenColumns = [], onEdit, onDelete }: ProjectTableProps) {
  // For each group, filter out hidden columns
  const visibleGroups = GROUPS.map(group => ({
    ...group,
    visibleKeys: group.keys.filter(key => !hiddenColumns.includes(key)),
  })).filter(group => group.visibleKeys.length > 0)

  // Flat list of visible columns in order
  const visibleColumns = visibleGroups.flatMap(group => group.visibleKeys)

  return (
    <TableContainer component={Paper} sx={{ width: '100%', overflow: 'auto' }}>
      <Table size="small" sx={{ minWidth: 900 }}>
        <TableHead>
          <TableRow>
            {visibleGroups.map(group => (
              group.visibleKeys.length === 1 ? (
                <TableCell
                  key={group.label}
                  rowSpan={2}
                  sx={{ fontWeight: 'bold', verticalAlign: 'middle', minWidth: 120 }}
                >
                  {group.label}
                </TableCell>
              ) : (
                <TableCell
                  key={group.label}
                  align="center"
                  colSpan={group.visibleKeys.length}
                  sx={{ fontWeight: 'bold', verticalAlign: 'middle', minWidth: 120 }}
                >
                  {group.label}
                </TableCell>
              )
            ))}
            <TableCell align="right" rowSpan={2} sx={{ fontWeight: 'bold', verticalAlign: 'middle' }}>Actions</TableCell>
          </TableRow>
          <TableRow>
            {visibleGroups.map(group =>
              group.visibleKeys.length > 1
                ? group.visibleKeys.map(key => (
                    <TableCell key={key} sx={{ fontWeight: 'bold', minWidth: 110 }}>
                      {PROJECT_COLUMNS.find(col => col.key === key)?.label.toUpperCase()}
                    </TableCell>
                  ))
                : null // For single columns, skip sub-header
            )}
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
              {visibleColumns.map(key => (
                <TableCell key={key}>{project[key as keyof Project]}</TableCell>
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