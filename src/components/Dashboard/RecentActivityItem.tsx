import { Box, Typography, Chip } from '@mui/material'
import FolderIcon from '@mui/icons-material/Folder'
import CalculateIcon from '@mui/icons-material/Calculate'
import type { RecentActivity } from '../../data/mockDashboardData'
import { ACTIVITY_STATUS, ACTIVITY_TYPE } from '../../constants/enums'

interface RecentActivityItemProps {
  activity: RecentActivity
}

export default function RecentActivityItem({ activity }: RecentActivityItemProps) {
  const getStatusColor = (status: string): 'success' | 'primary' | 'warning' | 'default' => {
    switch (status) {
      case ACTIVITY_STATUS.COMPLETED:
        return 'success'
      case ACTIVITY_STATUS.IN_PROGRESS:
        return 'primary'
      case ACTIVITY_STATUS.PENDING:
        return 'warning'
      default:
        return 'default'
    }
  }

  const getIcon = () => {
    switch (activity.type) {
      case ACTIVITY_TYPE.PROJECT:
        return <FolderIcon fontSize="small" />
      case ACTIVITY_TYPE.ESTIMATION:
        return <CalculateIcon fontSize="small" />
      default:
        return <FolderIcon fontSize="small" />
    }
  }

  return (
    <Box display="flex" alignItems="center" gap={2} p={2} borderBottom="1px solid #eee">
      <Box color="primary.main">
        {getIcon()}
      </Box>
      <Box flex={1}>
        <Typography variant="subtitle2" fontWeight="bold">
          {activity.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {activity.description}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {activity.timestamp}
        </Typography>
      </Box>
      <Chip
        label={activity.status}
        color={getStatusColor(activity.status)}
        size="small"
        variant="outlined"
      />
    </Box>
  )
} 