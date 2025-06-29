import { Drawer, List, Box, useTheme, useMediaQuery, Button } from '@mui/material'
import { useTranslation } from 'react-i18next'
import DashboardIcon from '@mui/icons-material/Dashboard'
import FolderIcon from '@mui/icons-material/Folder'
import CalculateIcon from '@mui/icons-material/Calculate'
import SidebarLink from './SidebarLink'
import { ROUTES } from '../../constants/routes'
import Logo from '../../assets/Logo.png'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../redux/authSlice'
import { useNavigate } from 'react-router-dom'

const drawerWidth = 220
const miniWidth = 64

interface SidebarProps {
  mini?: boolean
}

export default function Sidebar({ mini = false }: SidebarProps) {
  const { t } = useTranslation()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const width = mini ? miniWidth : drawerWidth
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const token = useSelector((state: import('../../redux/store').RootState) => state.auth.token)

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login')
  }

  return (
    <Drawer
      variant={isMobile ? 'temporary' : 'permanent'}
      open
      sx={{
        width,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width,
          boxSizing: 'border-box',
          overflowX: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          bgcolor: theme.palette.mode === 'dark' ? '#273142' : 'white',
          color: theme.palette.mode === 'dark' ? 'white' : 'inherit',
        },
      }}
    >
      <Box>
        <Box display="flex" flexDirection="column" alignItems="center" py={3}>
          <img src={Logo} alt="Logo" style={{ width: mini ? 40 : 66, height: mini ? 27 : 27, marginBottom: 16 }} />
        </Box>
        <List>
          <SidebarLink to={ROUTES.DASHBOARD} icon={<DashboardIcon />} label={mini ? '' : t('navigation.dashboard')} />
          <SidebarLink to={ROUTES.PROJECTS} icon={<FolderIcon />} label={mini ? '' : t('navigation.projects')} />
          <SidebarLink to={ROUTES.ESTIMATIONS} icon={<CalculateIcon />} label={mini ? '' : t('navigation.estimations')} />
        </List>
      </Box>
      {token && (
        <Box p={2}>
          <Button
            variant="outlined"
            color="error"
            fullWidth
            onClick={handleLogout}
            sx={{ mt: 2, fontWeight: 600, fontSize: 16 }}
          >
            {t('auth.logout')}
          </Button>
        </Box>
      )}
    </Drawer>
  )
} 