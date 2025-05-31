import React, { MouseEventHandler } from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

interface CustomButtonProps {
    nombre: string;
    style?: any;
    type?: 'button' | 'submit' | 'reset';
    accion?: MouseEventHandler;
    iconoDerecho?: React.ReactNode;
    iconoIzquierdo?: React.ReactNode;
    disabled?: boolean
}

export const CustomButton = ({ nombre, style, type, accion, iconoDerecho, iconoIzquierdo, disabled }: CustomButtonProps) => {
    return (
        <Button 
            variant="contained"
            startIcon={iconoIzquierdo} 
            endIcon={iconoDerecho}
            sx={style}
            onClick={accion}
            type={type}
            disabled={disabled}
        >
            {nombre} 
        </Button >
    )
};

interface NavButtonProps extends CustomButtonProps{
    navigateTo: string;
}

export const NavButton: React.FC<NavButtonProps> = ({ nombre, style, type, accion, iconoDerecho, iconoIzquierdo, navigateTo }: NavButtonProps) => {
    return (
        <Button 
            component={Link} to={navigateTo}
            variant="contained" 
            startIcon={iconoIzquierdo} 
            endIcon={iconoDerecho}
            sx={style}
            onClick={accion}
            type={type}
        >
            {nombre} 
        </Button >
    )
};