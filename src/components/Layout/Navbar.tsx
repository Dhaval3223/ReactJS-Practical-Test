import { AppBar, Toolbar, Box, IconButton, InputBase, alpha, Badge, Avatar, Menu, MenuItem, Typography, ListItemIcon, Divider, useTheme } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import NotificationsIcon from '@mui/icons-material/Notifications'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import LanguageSelector from '../LanguageSelector'
import DarkModeToggle from '../DarkModeToggle'
import { useState } from 'react'

export default function Navbar({ onToggleSidebar }: { onToggleSidebar: () => void }) {
  const { t } = useTranslation()
  const token = useSelector((state: import('../../redux/store').RootState) => state.auth.token)
  const [search, setSearch] = useState('')
  const [profileAnchorEl, setProfileAnchorEl] = useState<null | HTMLElement>(null)
  const theme = useTheme()

  // Hardcoded user info for now
  const user = {
    name: 'Harley',
    role: 'Admin',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
  }

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setProfileAnchorEl(event.currentTarget)
  }
  const handleProfileMenuClose = () => {
    setProfileAnchorEl(null)
  }

  return (
    <AppBar
      position="sticky"
      sx={{
        top: 0,
        zIndex: (theme) => theme.zIndex.drawer + 1,
        bgcolor: theme.palette.mode === 'dark' ? '#273142' : 'white',
        color: theme.palette.mode === 'dark' ? 'white' : 'primary.main',
        boxShadow: 1,
      }}
    >
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" onClick={onToggleSidebar} sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton>
        <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
          <InputBase
            placeholder={t('common.search') || 'Search...'}
            value={search}
            onChange={e => setSearch(e.target.value)}
            sx={{
              ml: 1,
              flex: 1,
              bgcolor: alpha('#000', 0.04),
              px: 2,
              py: 0.5,
              borderRadius: 2,
              fontSize: 16,
              width: '100%',
              maxWidth: 350,
            }}
            inputProps={{ 'aria-label': 'search' }}
          />
        </Box>
        {token && (
          <Box display="flex" alignItems="center" gap={2}>
            {/* Notification Bell */}
            <IconButton color="inherit">
              <Badge badgeContent={6} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            {/* Language Selector */}
            <LanguageSelector />
            {/* Profile Menu */}
            <Box display="flex" alignItems="center">
              <IconButton onClick={handleProfileMenuOpen} sx={{ p: 0, ml: 1 }}>
                <Avatar src={user.avatar} alt={user.name} />
              </IconButton>
              <Box sx={{ display: { xs: 'none', sm: 'flex' }, flexDirection: 'column', alignItems: 'flex-start', ml: 1 }}>
                <Typography variant="body1" fontWeight={600} sx={{ lineHeight: 1 }}>{user.name}</Typography>
                <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1 }}>{user.role}</Typography>
              </Box>
              <Menu
                anchorEl={profileAnchorEl}
                open={Boolean(profileAnchorEl)}
                onClose={handleProfileMenuClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              >
                <MenuItem onClick={handleProfileMenuClose}>
                  <ListItemIcon>
                    <Avatar src={user.avatar} alt={user.name} sx={{ width: 32, height: 32 }} />
                  </ListItemIcon>
                  <Box ml={1}>
                    <Typography variant="body1">{user.name}</Typography>
                    <Typography variant="caption" color="text.secondary">{user.role}</Typography>
                  </Box>
                </MenuItem>
                <Divider />
                {/* Add more profile actions here if needed */}
              </Menu>
            </Box>
            {/* Dark/Light Toggle */}
            <DarkModeToggle />
          </Box>
        )}
      </Toolbar>
    </AppBar>
  )
} 