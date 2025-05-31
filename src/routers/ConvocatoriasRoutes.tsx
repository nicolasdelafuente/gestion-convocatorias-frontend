import React, { useContext } from "react";
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "../pages/Login/Login";
import Home from "../pages/Home/home";
import FormNuevaConvocatoria from "../pages/FormNuevaConvocatoria/FormNuevaConvocatoria";
import Register from "../pages/Register/Register";
import MiPerfil from "../pages/PerfilDeUsuario/MiPerfil";
import ConvocatoriasPage from "../pages/ConvocatoriasPage/ConvocatoriasPage"
import Formatos from "../pages/Formatos/Formatos";
import FormInscripcionProyectos from "../pages/FormInscripcionProyecto/FormInscripcionProyecto";
import Usuarios from "../pages/Usuarios/Usuarios"
import PrivateRoute from "../components/ControlDeAcceso/PrivateRoute";

export const ConvocatoriasRoutes = () => {
    return (
      <>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} >
                <Route path="/Convocatorias" element={<ConvocatoriasPage />} />
                <Route
                    element={
                        <PrivateRoute
                            rolesPermitidos={["admin", "super_admin"]}
                        />
                    }
                >
                    <Route path="/Formatos" element={<Formatos />} />
                    <Route path="/Form" element={<FormNuevaConvocatoria />} />
                    <Route path="/usuarios" element={<Usuarios />} />
                </Route>
                <Route path="/Convocatorias/:id/inscripcion/:formato" element={<FormInscripcionProyectos />} />
            </ Route>
            <Route path="/Login" element={<Login />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/mi-perfil" element={<MiPerfil />} />
          </Routes>
        </Router>
      </>
    );
}