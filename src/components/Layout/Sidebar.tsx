import { Drawer, List, Toolbar, useTheme, useMediaQuery } from '@mui/material'
import DashboardIcon from '@mui/icons-material/Dashboard'
import FolderIcon from '@mui/icons-material/Folder'
import CalculateIcon from '@mui/icons-material/Calculate'
import SidebarLink from './SidebarLink'
import { ROUTES } from '../../constants/routes'

const drawerWidth = 220

export default function Sidebar() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Drawer
      variant={isMobile ? 'temporary' : 'permanent'}
      open
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
    >
      <Toolbar />
      <List>
        <SidebarLink to={ROUTES.DASHBOARD} icon={<DashboardIcon />} label="Dashboard" />
        <SidebarLink to={ROUTES.PROJECTS} icon={<FolderIcon />} label="Projects" />
        <SidebarLink to={ROUTES.ESTIMATIONS} icon={<CalculateIcon />} label="Estimations" />
      </List>
    </Drawer>
  )
} 