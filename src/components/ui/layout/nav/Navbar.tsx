import { Box, Button, IconButton, Toolbar, Typography } from '@mui/material';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { styled } from '@mui/material/styles';
import { Menu as MenuIcon } from '@mui/icons-material';
import { drawerWidth } from '../../../../utils/sidebarConstants';
import { useAppDispatch } from '../../../../redux/store';
import { logout } from '../../../../redux/features/auth/authSlice';
import { useNavigate } from 'react-router-dom';


interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
    backgroundColor: "#120c41"
}));


interface NavbarProps {
    open: boolean;
    setOpen(value: boolean): void;
}

const Navbar = ({ open, setOpen }: NavbarProps) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
    }

    return (
        <AppBar position="fixed" open={open}>
            <Toolbar sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "20px" }}>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={() => setOpen(true)}
                    edge="start"
                    sx={{
                        marginRight: 5,
                        ...(open && { display: 'none' }),
                    }}
                >
                    <MenuIcon />
                </IconButton>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "20px", width: "100%" }}>
                    <Typography variant="h6" noWrap component="div" >
                        Let's Comment
                    </Typography>
                    <Button
                        variant='contained'
                        onClick={handleLogout}
                    >
                        Logout
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    )
}

export default Navbar