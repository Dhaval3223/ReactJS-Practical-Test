import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Tooltip, Typography
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import type { Estimation } from './types'
import { formatCurrency } from '../../utils/currency'
import { getEstimationTotal } from '../../helpers/estimationHelpers'

interface EstimationTableProps {
  estimations: Estimation[]
  loading: boolean
  onEdit: (estimation: Estimation) => void
  onDelete: (estimation: Estimation) => void
}

export default function EstimationTable({ estimations, loading, onEdit, onDelete }: EstimationTableProps) {
  return (
    <TableContainer component={Paper} sx={{ minWidth: 700 }}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Customer</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Date</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Total</TableCell>
            <TableCell align="right" sx={{ fontWeight: 'bold' }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {estimations.length === 0 && !loading && (
            <TableRow>
              <TableCell colSpan={5} align="center">
                <Typography variant="body2" color="text.secondary">No estimations found.</Typography>
              </TableCell>
            </TableRow>
          )}
          {estimations.map(estimation => (
            <TableRow key={estimation.id} hover>
              <TableCell>{estimation.name}</TableCell>
              <TableCell>{estimation.customer}</TableCell>
              <TableCell>{estimation.date}</TableCell>
              <TableCell>{formatCurrency(getEstimationTotal(estimation))}</TableCell>
              <TableCell align="right">
                <Tooltip title="Edit">
                  <IconButton size="small" onClick={() => onEdit(estimation)}>
                    <EditIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                  <IconButton size="small" color="error" onClick={() => onDelete(estimation)}>
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