import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { FunctionControlDeAcceso } from "./ControlDeAcceso";
import { UserContext } from "../../pages/Login/userContext";

interface PrivateRouteProps {
    rolesPermitidos: string[];
}

const PrivateRoute = ({ rolesPermitidos }: PrivateRouteProps) => {
    const { usuario } = useContext(UserContext);
    if (!usuario) {
        return <Navigate to="/Login" replace/>;
    }
    const tienePermiso = FunctionControlDeAcceso(rolesPermitidos, usuario.roles?? []);

    if (!tienePermiso) {
        return <Navigate to="/Convocatorias" replace/>;
    }

    return <Outlet />;
}

export default PrivateRoute;