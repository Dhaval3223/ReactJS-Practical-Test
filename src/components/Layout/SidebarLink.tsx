import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { NavLink, useLocation } from 'react-router-dom'
import type { ReactNode } from 'react'

interface SidebarLinkProps {
  to: string
  icon: ReactNode
  label: string
}

export default function SidebarLink({ to, icon, label }: SidebarLinkProps) {
  const location = useLocation()
  const isActive = location.pathname === to
  return (
    <ListItemButton
      component={NavLink}
      to={to}
      selected={isActive}
      sx={{
        '&.active, &.Mui-selected': {
          backgroundColor: 'primary.main',
          color: 'white',
        },
      }}
    >
      <ListItemIcon sx={{ color: isActive ? 'white' : 'inherit' }}>{icon}</ListItemIcon>
      <ListItemText primary={label} />
    </ListItemButton>
  )
} 