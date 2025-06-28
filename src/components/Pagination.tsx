import { Box, IconButton, Typography } from '@mui/material'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'

interface PaginationProps {
  page: number
  pageSize: number
  total: number
  onPageChange: (page: number) => void
}

export default function Pagination({ page, pageSize, total, onPageChange }: PaginationProps) {
  const totalPages = Math.ceil(total / pageSize)
  const from = (page - 1) * pageSize + 1
  const to = Math.min(page * pageSize, total)

  return (
    <Box display="flex" alignItems="center" justifyContent="space-between" mt={2}>
      <Typography variant="body2">
        Showing {from}-{to} of {total}
      </Typography>
      <Box>
        <IconButton onClick={() => onPageChange(page - 1)} disabled={page === 1}>
          <ChevronLeftIcon />
        </IconButton>
        <IconButton onClick={() => onPageChange(page + 1)} disabled={page === totalPages}>
          <ChevronRightIcon />
        </IconButton>
      </Box>
    </Box>
  )
} 