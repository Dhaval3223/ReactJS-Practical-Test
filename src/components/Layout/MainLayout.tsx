import { Box, useTheme } from "@mui/material";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import { useState } from 'react';

export default function MainLayout() {
  const [mini, setMini] = useState(false);
  const handleToggleSidebar = () => setMini(m => !m);
  const theme = useTheme();
  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Sidebar mini={mini} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          minHeight: "100vh",
          height: "100vh",
          overflow: 'auto',
          display: "flex",
          flexDirection: "column",
          p: 0,
          width: mini ? 'calc(100vw - 64px)' : 'calc(100vw - 220px)',
          bgcolor: theme.palette.mode === 'dark' ? '#1B2431' : '#F5F6FA',
        }}
      >
        <Navbar onToggleSidebar={handleToggleSidebar} />
        <Outlet />
      </Box>
    </Box>
  );
}
