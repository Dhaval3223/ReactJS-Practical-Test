import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Card, CardContent, Typography, List, Box } from '@mui/material'
import FolderIcon from '@mui/icons-material/Folder'
import CalculateIcon from '@mui/icons-material/Calculate'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import StatCard from '../components/Dashboard/StatCard'
import ChartCard from '../components/Dashboard/ChartCard'
import RecentActivityItem from '../components/Dashboard/RecentActivityItem'
import { 
  dashboardStats, 
  monthlyData, 
  projectStatusData, 
  recentActivities 
} from '../data/mockDashboardData'

export default function Dashboard() {
  const { t } = useTranslation()
  const [loading, setLoading] = useState(true)

  // Simulate API call
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <Typography>{t('dashboard.loadingDashboard')}</Typography>
      </Box>
    )
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        {t('dashboard.title')}
      </Typography>
      
      {/* Summary Cards */}
      <Box 
        display="grid" 
        gridTemplateColumns={{ xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }}
        gap={3} 
        mb={4}
      >
        <StatCard
          title={t('dashboard.totalProjects')}
          value={dashboardStats.totalProjects}
          icon={<FolderIcon />}
          color="#2196f3"
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard
          title={t('dashboard.totalEstimations')}
          value={dashboardStats.totalEstimations}
          icon={<CalculateIcon />}
          color="#ff9800"
          trend={{ value: 8, isPositive: true }}
        />
        <StatCard
          title={t('dashboard.activeProjects')}
          value={dashboardStats.activeProjects}
          icon={<TrendingUpIcon />}
          color="#4caf50"
          trend={{ value: 5, isPositive: true }}
        />
        <StatCard
          title={t('dashboard.completedProjects')}
          value={dashboardStats.completedProjects}
          icon={<CheckCircleIcon />}
          color="#9c27b0"
          trend={{ value: 15, isPositive: true }}
        />
      </Box>

      {/* Charts and Recent Activities */}
      <Box display="grid" gridTemplateColumns={{ xs: '1fr', lg: '2fr 1fr' }} gap={3} mb={3}>
        {/* Monthly Projects Chart */}
        <ChartCard title={t('dashboard.monthlyProjects')}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#2196f3" 
                strokeWidth={2}
                dot={{ fill: '#2196f3', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Project Status Pie Chart */}
        <ChartCard title={t('dashboard.projectStatus')} height={300}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={projectStatusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ status, percent }) => `${status} ${percent ? (percent * 100).toFixed(0) : 0}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="count"
              >
                {projectStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </Box>

      {/* Recent Activities */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {t('dashboard.recentActivities')}
          </Typography>
          <List>
            {recentActivities.map((activity) => (
              <RecentActivityItem key={activity.id} activity={activity} />
            ))}
          </List>
        </CardContent>
      </Card>
    </Box>
  )
} 