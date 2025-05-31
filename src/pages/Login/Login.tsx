import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "./Logo";
import styles from "./login.module.css";
import { loginUsuario } from "../../api/usuarios.api";
import { UserContext } from "./userContext";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { iniciarSesion } = useContext(UserContext); // Accede al contexto

  const ingresarLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Iniciando sesión");

    try {
      const data = await loginUsuario(email, password);

      if (data && data.access_token) {
        console.log("Token válido");

        iniciarSesion({
          nombre: data.usuario.nombre,
          email: data.usuario.email,
          password: data.usuario.password,
          roles: data.usuario.roles,
          cv: data.usuario.cv
        });

        console.log("roles", data.usuario.roles);

        sessionStorage.setItem("token", data.access_token);
        toast.success('Sesion iniciada correctamente');
        setTimeout(() => {
          navigate("/Convocatorias");
        }, 1500);
        
      } else {
        toast.error("Debe llenar los campos de inicio de sesión.");
        setError("email o contraseña incorrectos");
      }
    } catch (error) {
      toast.error("Error al iniciar sesión:");
      setError("Error al iniciar sesión");
      console.error(error);
    }
  };

  const Registrarse = () => {
    navigate("/Register");
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
          <h3>Iniciar sesión</h3>
          <p>¿No tienes cuenta?</p>
          <a onClick={Registrarse} className={styles["redirect"]}>
            Regístrate
          </a>
        </div>
        <div className={styles["login-col-derecha"]}>
          <form className={styles["form-login"]} onSubmit={ingresarLogin}>
            <div className={styles["form-inputs"]}>
              <label htmlFor="email" className={styles["form-label"]}>
                Email
              </label>
              <input
                type="email"
                className={styles["form-control-login"]}
                id="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError(null);
                }}
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
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError(null);
                }}
              />
            </div>
            {error && <p className={styles["error-message"]}>{error}</p>}
            <div className="mb-5">
              <a href="#" className={styles["redirect"]}>¿Olvidaste tu contraseña? Haz clic aquí</a>
            </div>
            <button type="submit" className={styles["btn-login"]}>
              Ingresar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
