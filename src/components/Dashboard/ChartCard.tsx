import { Card, CardContent, Typography, Box } from '@mui/material'
import type { ReactNode } from 'react'

interface ChartCardProps {
  title: string
  children: ReactNode
  height?: number
}

export default function ChartCard({ title, children, height = 300 }: ChartCardProps) {
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Box sx={{ height, mt: 2 }}>
          {children}
        </Box>
      </CardContent>
    </Card>
  )
} 