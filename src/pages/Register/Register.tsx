// src/pages/Register/Register.tsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./register.module.css";
import { registrarUsuario } from "../../api/usuarios.api";
import toast from "react-hot-toast";
import Logo from "../Login/Logo";

const Register: React.FC = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await registrarUsuario(nombre, email, password);
      if (data) {
        toast.success('Cuenta creada exitosamente');
         setTimeout(() => {
           navigate("/login");
         }, 1500);
        
      }
    } catch (err) {
      toast.error('Hubo un error al registrar el usuario. Intenta de nuevo.');
      console.log(err);
    }
  };

  const IniciarSesion = () => {
    navigate("/login");
  };

  return (
    <div className={styles["container-login"]}>
      <div className={styles["login-row-img"]}>
        <div className={styles["login-col-img"]}>
          <Logo />
        </div>
      </div>
  
      <div className={styles["login-row"]}>
        <div className={styles["login-col-izquierda"]}>
          <p>
            <i className="bi-person-circle"></i>
          </p>
          <h3>Registro de Usuario</h3>
          <p>¿Ya tienes una cuenta?</p>
          <a onClick={IniciarSesion} className={styles["redirect"]}>
            Inicia sesión
          </a>
        </div>
        <div className={styles["login-col-derecha"]}>
          <form className={styles["form-login"]} onSubmit={handleSubmit}>
            <div className={styles["form-inputs"]}>
              <label htmlFor="nombre" className={styles["form-label"]}>
                Nombre de Usuario
              </label>
              <input
                type="text"
                className={styles["form-control-login"]} 
                id="nombre"
                placeholder="Ingresa tu nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </div>
            <div className={styles["form-inputs"]}>
              <label htmlFor="email" className={styles["form-label"]}>
                Correo Electrónico
              </label>
              <input
                type="email"
                className={styles["form-control-login"]}
                id="email"
                placeholder="Ingresa tu correo"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className={styles["form-inputs"]}>
              <label htmlFor="password" className={styles["form-label"]}>
                Contraseña
              </label>
              <input
                type="password"
                className={styles["form-control-login"]}
                id="password"
                placeholder="Ingresa tu contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && <p className={styles["error-message"]}>{error}</p>}
            <button type="submit" className={styles["btn-login"]}>
              Registrarse
            </button>
          </form>
        </div>
      </div>
    </div>
  );
  
};

export default Register;