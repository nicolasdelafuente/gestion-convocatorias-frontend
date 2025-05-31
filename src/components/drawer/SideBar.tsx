import { AppBar, Avatar, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography, Box, Container, Drawer, List, ListItem, ListItemIcon, ListItemText, ListItemButton } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import React from "react";
import UserDropdown from "../MUIUserDropdown/UserDropdown";
import logoSimple from "../../assets/Unahur_logoSimple.png";
import SideBarList from "./SideBarList";

const SideBar = () => {

    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [isClosing, setIsClosing] = React.useState(false);

    const handleDrawerClose = () => {
        setIsClosing(true);
        setMobileOpen(false);
    };

    const handleDrawerTransitionEnd = () => {
        setIsClosing(false);
    };

    const handleDrawerToggle = () => {
        if (!isClosing) {
            setMobileOpen(!mobileOpen);
        }
    };

    return (
        <>
            <AppBar position="fixed"
                color="inherit"
                sx={{
                    borderBottom: '0.2em solid #56A42C',
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                    boxShadow: 'none',
                }}
            >
                <Container maxWidth={false} sx={{ maxWidth: '100%' }}>
                    <Toolbar variant="dense" sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        padding: '0.5em'
                    }}>

                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }} >
                            <img src="https://i.postimg.cc/X7Qgdnc4/Unahur-logo2.png" alt="" style={{
                                aspectRatio: 'auto',
                                maxHeight: '3em',
                            }} />
                        </Box>

                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                onClick={handleDrawerToggle}
                            >
                                <MenuIcon />
                            </IconButton>
                        </Box>

                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }} >
                            <img src={logoSimple} alt="" style={{
                                aspectRatio: 'auto',
                                maxHeight: '2em',
                            }} />
                        </Box>

                        <Box sx={{ flexGrow: 0 }} >
                            <UserDropdown />
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: 240 }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onTransitionEnd={handleDrawerTransitionEnd}
                    onClose={handleDrawerClose}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', md: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
                    }}
                >
                    <SideBarList />
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', md: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
                    }}
                    open
                >
                    <SideBarList />
                </Drawer>
            </Box>
        </>
    )
};

export default SideBar;