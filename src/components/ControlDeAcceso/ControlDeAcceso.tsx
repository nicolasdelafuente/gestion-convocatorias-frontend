import React from "react";
import { UserContext } from "../../pages/Login/userContext";
import { Navigate } from "react-router-dom";

type RequireRoleProps = {
    rolesPermitidos: string[];
    children: React.ReactNode;
}

export const ControlDeAcceso = ({ rolesPermitidos, children }: RequireRoleProps) => {

        const { usuario } = React.useContext(UserContext);
        if (!usuario) {
            return <Navigate to="/Login"/>
        }

        return FunctionControlDeAcceso(rolesPermitidos, usuario.roles) ? <>{children}</> : null
}

export const FunctionControlDeAcceso = (rolesPermitidos: string[], rolesDeUsuario: string[]) => {
    const tienePermiso = rolesPermitidos.some(rol => rolesDeUsuario.includes(rol));
    return tienePermiso
}