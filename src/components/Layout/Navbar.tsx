import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { logout } from '../../redux/authSlice'
import type { RootState } from '../../redux/store'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../constants/routes'
import LanguageSelector from '../LanguageSelector'
import DarkModeToggle from '../DarkModeToggle'

export default function Navbar() {
  const { t } = useTranslation()
  const token = useSelector((state: RootState) => state.auth.token)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout())
    navigate(ROUTES.LOGIN)
  }

  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          {t('navigation.adminPanel')}
        </Typography>
        {token && (
          <Box display="flex" alignItems="center">
            <LanguageSelector />
            <DarkModeToggle />
            <Button color="inherit" onClick={handleLogout}>
              {t('auth.logout')}
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  )
} 