import { ACTIVITY_STATUS, ACTIVITY_TYPE } from '../constants/enums'

export interface DashboardStats {
  totalProjects: number
  totalEstimations: number
  activeProjects: number
  completedProjects: number
}

export interface ChartData {
  name: string
  value: number
}

export interface ProjectStatus {
  status: string
  count: number
  color: string
}

export interface RecentActivity {
  id: string
  type: typeof ACTIVITY_TYPE[keyof typeof ACTIVITY_TYPE]
  title: string
  description: string
  timestamp: string
  status: typeof ACTIVITY_STATUS[keyof typeof ACTIVITY_STATUS]
}

export const dashboardStats: DashboardStats = {
  totalProjects: 24,
  totalEstimations: 156,
  activeProjects: 8,
  completedProjects: 16,
}

export const monthlyData: ChartData[] = [
  { name: 'Jan', value: 4 },
  { name: 'Feb', value: 6 },
  { name: 'Mar', value: 8 },
  { name: 'Apr', value: 5 },
  { name: 'May', value: 12 },
  { name: 'Jun', value: 9 },
  { name: 'Jul', value: 7 },
  { name: 'Aug', value: 11 },
  { name: 'Sep', value: 13 },
  { name: 'Oct', value: 10 },
  { name: 'Nov', value: 8 },
  { name: 'Dec', value: 15 },
]

export const projectStatusData: ProjectStatus[] = [
  { status: 'Completed', count: 16, color: '#4caf50' },
  { status: 'In Progress', count: 8, color: '#2196f3' },
  { status: 'Pending', count: 4, color: '#ff9800' },
  { status: 'On Hold', count: 2, color: '#f44336' },
]

export const recentActivities: RecentActivity[] = [
  {
    id: '1',
    type: ACTIVITY_TYPE.PROJECT,
    title: 'E-commerce Platform',
    description: 'Project completed successfully',
    timestamp: '2 hours ago',
    status: ACTIVITY_STATUS.COMPLETED,
  },
  {
    id: '2',
    type: ACTIVITY_TYPE.ESTIMATION,
    title: 'Mobile App Development',
    description: 'New estimation created',
    timestamp: '4 hours ago',
    status: ACTIVITY_STATUS.PENDING,
  },
  {
    id: '3',
    type: ACTIVITY_TYPE.PROJECT,
    title: 'CRM System',
    description: 'Development phase started',
    timestamp: '1 day ago',
    status: ACTIVITY_STATUS.IN_PROGRESS,
  },
  {
    id: '4',
    type: ACTIVITY_TYPE.ESTIMATION,
    title: 'Website Redesign',
    description: 'Estimation approved',
    timestamp: '2 days ago',
    status: ACTIVITY_STATUS.COMPLETED,
  },
  {
    id: '5',
    type: ACTIVITY_TYPE.PROJECT,
    title: 'API Integration',
    description: 'Testing phase completed',
    timestamp: '3 days ago',
    status: ACTIVITY_STATUS.COMPLETED,
  },
] 