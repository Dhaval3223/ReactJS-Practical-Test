import { Card, CardContent, Typography, Box } from '@mui/material'
import type { SxProps } from '@mui/material'
import type { ReactNode } from 'react'

interface StatCardProps {
  title: string
  value: string | number
  icon: ReactNode
  trend?: {
    value: number
    isPositive: boolean
  }
  color?: string
  sx?: SxProps
}

export default function StatCard({ title, value, icon, trend, color = 'primary.main', sx }: StatCardProps) {
  return (
    <Card sx={{ height: '100%', ...sx }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start">
          <Box>
            <Typography color="text.secondary" gutterBottom variant="body2">
              {title}
            </Typography>
            <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
              {value}
            </Typography>
            {trend && (
              <Typography 
                variant="body2" 
                color={trend.isPositive ? 'success.main' : 'error.main'}
                sx={{ display: 'flex', alignItems: 'center', mt: 1 }}
              >
                {trend.isPositive ? '↗' : '↘'} {Math.abs(trend.value)}%
              </Typography>
            )}
          </Box>
          <Box 
            sx={{ 
              color, 
              p: 1, 
              borderRadius: 1, 
              backgroundColor: `${color}15`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {icon}
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
} 