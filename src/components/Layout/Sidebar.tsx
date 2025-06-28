import { Drawer, List, Toolbar, useTheme, useMediaQuery } from '@mui/material'
import { useTranslation } from 'react-i18next'
import DashboardIcon from '@mui/icons-material/Dashboard'
import FolderIcon from '@mui/icons-material/Folder'
import CalculateIcon from '@mui/icons-material/Calculate'
import SidebarLink from './SidebarLink'
import { ROUTES } from '../../constants/routes'

const drawerWidth = 220

export default function Sidebar() {
  const { t } = useTranslation()
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
        <SidebarLink to={ROUTES.DASHBOARD} icon={<DashboardIcon />} label={t('navigation.dashboard')} />
        <SidebarLink to={ROUTES.PROJECTS} icon={<FolderIcon />} label={t('navigation.projects')} />
        <SidebarLink to={ROUTES.ESTIMATIONS} icon={<CalculateIcon />} label={t('navigation.estimations')} />
      </List>
    </Drawer>
  )
} 