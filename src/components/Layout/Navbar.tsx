import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../redux/authSlice'
import type { RootState } from '../../redux/store'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../constants/routes'

export default function Navbar() {
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
          Admin Panel
        </Typography>
        {token && (
          <Box>
            <Button color="inherit" onClick={handleLogout}>Logout</Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  )
} 