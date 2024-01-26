import { Box, CssBaseline, Typography } from "@mui/material"
import { useState } from "react"
import Navbar from "./nav/Navbar";
import Sidebar, { DrawerHeader } from "./sidebar/Sidebar";
import { Outlet } from "react-router-dom";


const MainLayout = () => {
    const [open, setOpen] = useState(false);
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Navbar open={open} setOpen={setOpen} />
            <Sidebar open={open} setOpen={setOpen} />
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <DrawerHeader />
                <Outlet />
            </Box>
        </Box>
    )
}

export default MainLayout