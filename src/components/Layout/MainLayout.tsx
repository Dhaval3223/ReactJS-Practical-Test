import { Box, Toolbar } from "@mui/material";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <Box sx={{ display: "flex" }}>
      <Navbar />
      <Sidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          minHeight: "100vh",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          p: 0,
          width: 'calc(100vw - 280px)',
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}
