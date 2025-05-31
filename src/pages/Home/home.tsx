import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { UserContext } from '../Login/userContext';
import { Toolbar, Box } from '@mui/material';
import SideBar from '../../components/drawer/SideBar';

import styles from './home.module.css'



const Home = () => {
    const { usuario } = useContext(UserContext)

    if (!usuario) {
        return <Navigate to="/login" />;
    }

    return (
        <>
            <SideBar />
            <Toolbar />
            <Box 
                component={'main'}
                sx={{
                    marginLeft: { xs: 'none', md: '240px' }
                }}
                className={styles['main-container']}>
                <Outlet />
            </Box>
        </>
    );

};

export default Home