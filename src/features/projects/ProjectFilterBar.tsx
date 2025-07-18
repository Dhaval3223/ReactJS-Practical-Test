import { useState } from 'react'
import {
  Box, Button, TextField, Chip, Popover, Typography, Checkbox, FormControlLabel
} from '@mui/material'
import FilterListIcon from '@mui/icons-material/FilterList'
import ViewColumnIcon from '@mui/icons-material/ViewColumn'
import RefreshIcon from '@mui/icons-material/Refresh'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import type { ProjectFilters } from './types'
import { PROJECT_COLUMNS } from '../../constants/columns'
import { PROJECT_STATUS_OPTIONS } from '../../constants/enums'

interface ProjectFilterBarProps {
  filters: ProjectFilters
  hiddenColumns: string[]
  onChangeFilters: (filters: ProjectFilters) => void
  onChangeHiddenColumns: (cols: string[]) => void
  onReset: () => void
}

export default function ProjectFilterBar({ filters, hiddenColumns, onChangeFilters, onChangeHiddenColumns, onReset }: ProjectFilterBarProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [colAnchorEl, setColAnchorEl] = useState<null | HTMLElement>(null)
  const [statusAnchorEl, setStatusAnchorEl] = useState<null | HTMLElement>(null)
  const [dateAnchorEl, setDateAnchorEl] = useState<null | HTMLElement>(null)
  const [search, setSearch] = useState(filters.search || '')
  const [selectedStatus, setSelectedStatus] = useState<string[]>(filters.status || [])
  const [selectedCols, setSelectedCols] = useState<string[]>(hiddenColumns)
  const [selectedDates, setSelectedDates] = useState<string[]>(filters.date || [])

  // Filter popover
  const handleFilterClick = (e: React.MouseEvent<HTMLElement>) => setAnchorEl(e.currentTarget)
  const handleFilterClose = () => setAnchorEl(null)

  // Columns popover
  const handleColClick = (e: React.MouseEvent<HTMLElement>) => setColAnchorEl(e.currentTarget)
  const handleColClose = () => setColAnchorEl(null)

  // Status popover
  const handleStatusClick = (e: React.MouseEvent<HTMLElement>) => setStatusAnchorEl(e.currentTarget)
  const handleStatusClose = () => setStatusAnchorEl(null)

  // Date popover
  const handleDateClick = (e: React.MouseEvent<HTMLElement>) => setDateAnchorEl(e.currentTarget)
  const handleDateClose = () => setDateAnchorEl(null)

  const handleApplyFilters = () => {
    onChangeFilters({ ...filters, search, status: selectedStatus, date: selectedDates })
    handleFilterClose()
    handleStatusClose()
    handleDateClose()
  }

  const handleApplyCols = () => {
    onChangeHiddenColumns(selectedCols)
    handleColClose()
  }

  const handleReset = () => {
    setSearch('')
    setSelectedStatus([])
    setSelectedCols([])
    setSelectedDates([])
    onReset()
  }

  return (
    <Box display="flex" alignItems="center" gap={2} mb={2}>
      {/* Filter By */}
      <Button startIcon={<FilterListIcon />} onClick={handleFilterClick} variant="outlined">
        Filter By
      </Button>
      <Popover open={!!anchorEl} anchorEl={anchorEl} onClose={handleFilterClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}>
        <Box p={2} minWidth={250}>
          <Typography variant="subtitle2" mb={1}>Search</Typography>
          <TextField
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by customer or project name"
            fullWidth
            size="small"
            sx={{ mb: 2 }}
          />
          <Button onClick={handleApplyFilters} variant="contained" fullWidth>Apply Now</Button>
        </Box>
      </Popover>

      {/* Status */}
      <Button onClick={handleStatusClick} variant="outlined">
        Status
      </Button>
      <Popover open={!!statusAnchorEl} anchorEl={statusAnchorEl} onClose={handleStatusClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}>
        <Box p={2} minWidth={250}>
          <Typography variant="subtitle2" mb={1}>Select Status</Typography>
          <Box display="flex" flexWrap="wrap" gap={1} mb={2}>
            {PROJECT_STATUS_OPTIONS.map(status => (
              <Chip
                key={status}
                label={status}
                color={selectedStatus.includes(status) ? 'primary' : 'default'}
                onClick={() => setSelectedStatus(selectedStatus.includes(status)
                  ? selectedStatus.filter(s => s !== status)
                  : [...selectedStatus, status])}
              />
            ))}
          </Box>
          <Button onClick={handleApplyFilters} variant="contained" fullWidth>Apply Now</Button>
        </Box>
      </Popover>

      {/* Date Filter */}
      <Button startIcon={<CalendarTodayIcon />} onClick={handleDateClick} variant="outlined">
        Date
      </Button>
      <Popover open={!!dateAnchorEl} anchorEl={dateAnchorEl} onClose={handleDateClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}>
        <Box p={2} minWidth={250}>
          <Typography variant="subtitle2" mb={1}>Select Date Range</Typography>
          <Box display="flex" flexDirection="column" gap={2} mb={2}>
            <TextField
              type="date"
              label="From Date"
              value={selectedDates[0] || ''}
              onChange={e => {
                const newDates = [...selectedDates]
                newDates[0] = e.target.value
                setSelectedDates(newDates)
              }}
              fullWidth
              size="small"
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              type="date"
              label="To Date"
              value={selectedDates[1] || ''}
              onChange={e => {
                const newDates = [...selectedDates]
                newDates[1] = e.target.value
                setSelectedDates(newDates)
              }}
              fullWidth
              size="small"
              InputLabelProps={{ shrink: true }}
            />
          </Box>
          <Button onClick={handleApplyFilters} variant="contained" fullWidth>Apply Now</Button>
        </Box>
      </Popover>

      {/* Hide Columns */}
      <Button startIcon={<ViewColumnIcon />} onClick={handleColClick} variant="outlined">
        Hide Columns
      </Button>
      <Popover open={!!colAnchorEl} anchorEl={colAnchorEl} onClose={handleColClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}>
        <Box p={2} minWidth={250}>
          <Typography variant="subtitle2" mb={1}>Select Columns</Typography>
          <Box display="flex" flexDirection="column" gap={1} mb={2}>
            {PROJECT_COLUMNS.map(col => (
              <FormControlLabel
                key={col.key}
                control={
                  <Checkbox
                    checked={!selectedCols.includes(col.key)}
                    onChange={() => setSelectedCols(selectedCols.includes(col.key)
                      ? selectedCols.filter(c => c !== col.key)
                      : [...selectedCols, col.key])}
                  />
                }
                label={col.label}
              />
            ))}
            <FormControlLabel
              control={<Checkbox checked disabled />}
              label="Actions"
              sx={{ opacity: 0.7, fontStyle: 'italic' }}
            />
          </Box>
          <Button onClick={handleApplyCols} variant="contained" fullWidth>Apply Now</Button>
        </Box>
      </Popover>

      {/* Reset Filter */}
      <Button startIcon={<RefreshIcon />} color="error" variant="outlined" onClick={handleReset}>
        Reset Filter
      </Button>
    </Box>
  )
} 