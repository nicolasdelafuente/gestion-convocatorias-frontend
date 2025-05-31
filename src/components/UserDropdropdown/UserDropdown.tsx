import React, { useContext } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import "./UserDropdown.css";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../pages/Login/userContext";

const UserDropdown = () => {
  const navigate = useNavigate();
  const { usuario, cerrarSesion } = useContext(UserContext);
  const navigateLogin = () => {
    navigate("/Login");
  };
  const navigateMiPerfil = () => {
    navigate("/mi-perfil");
  };

  return (
    <Dropdown className="user-dropdown">
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        <i className="bi bi-person-fill"></i>
        {usuario ? usuario.nombre : "Usuario"}{" "}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {usuario ? (  //Mostrará el nombre de usuario.
          <>
            {" "}
            
            <Dropdown.Item onClick={navigateMiPerfil}>Mi perfil</Dropdown.Item>
            <Dropdown.Item onClick={cerrarSesion}>Cerrar Sesión</Dropdown.Item>
          </>
        ) : (
          <Dropdown.Item onClick={navigateLogin}>Iniciar Sesión</Dropdown.Item>
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default UserDropdown;
