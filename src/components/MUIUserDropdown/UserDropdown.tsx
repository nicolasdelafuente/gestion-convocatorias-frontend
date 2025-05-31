import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../pages/Login/userContext";
import { Avatar, IconButton, Menu, MenuItem, Tooltip, Typography } from "@mui/material";

const UserDropdown = () => {
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
      };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
      };

    const { usuario, cerrarSesion } = useContext(UserContext);
    const navigate = useNavigate();
    const navigateLogin = () => {
        navigate("/Login");
    };
    const navigateMiPerfil = () => {
        navigate("/mi-perfil");
    };

    return (
        <>
            <Tooltip title="Mi Perfil">
                <IconButton onClick={handleOpenUserMenu} sx={{ borderRadius: '0'}}>
                    <Typography variant="h6" color="inherit" noWrap sx={{ display: { xs: 'none', md: 'block' }}}>
                    {usuario ? usuario.nombre : "Usuario"}
                    </Typography>
                    <Avatar alt={usuario? usuario.nombre : "Usuario"} sx={{ color: "#56A42C", background: "transparent" }} />
                </IconButton>
            </Tooltip>
            <Menu
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}  
                sx={{
                    marginTop: "3em",
                }}  
            >
                <MenuItem onClick={navigateMiPerfil}>Mi Perfil</MenuItem>
                <MenuItem onClick={navigateLogin}>Cerrar Sesión</MenuItem>
            </Menu>
        </>
    );
};

export default UserDropdown;