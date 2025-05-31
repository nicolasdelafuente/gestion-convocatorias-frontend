import React, { useContext, useState } from "react";
import { UserContext } from "../Login/userContext";
import { useNavigate } from "react-router-dom";
import { deleteUsuario, updateContrasenia } from "../../api/usuarios.api";
import styles from "./miperfil.module.css";
import toast from "react-hot-toast";
import CvUploader from "../../components/FileUploader/CvUploader";

const MiPerfil: React.FC = () => {
  const { usuario, cerrarSesion } = useContext(UserContext);
  const navigate = useNavigate();
  const [showConfirmation, setShowConfirmation] = useState(false); // Modal de confirmación, controla el estado para mostrarlo o no.
  const [nuevaContra, setNuevaContra] = useState("");
  const [confirmarContra, setConfirmarContra] = useState("");

  const handleDeleteAccount = async () => {
    if (!usuario || !usuario.email) {
      toast.error("Error al eliminar la cuenta, intenta nuevamente");
      return;
    }

    try {
      await deleteUsuario(usuario.email);
      toast.success("Cuenta eliminada exitosamente");
      setTimeout(() => {
        cerrarSesion();
        navigate("/Login");
      }, 2000);
    } catch (error) {
      toast.error(
        "Hubo un problema al eliminar la cuenta. Inténtalo de nuevo."
      );
    }
  };

  const handleUpdatePassword = async () => {
    if (nuevaContra !== confirmarContra) {
      toast.error("Las contraseñas no coinciden");
      return;
    }

    /* if (nuevaContra.length < 6) {
      toast.error("La contraseña debe tener al menos 6 carácteres");
      return;
    } */

    try {
      if (usuario && usuario.email) {
        const response = await updateContrasenia(usuario.email, nuevaContra);
        toast.success("Contraseña actualizada correctamente");
        setNuevaContra("");
        setConfirmarContra("");
      }
    } catch (error) {
      toast.error("Error al actualizar la contraseña");
      console.log(error);
    }
  };

  return (
    <div className={styles["page"]}>
      <div className={styles["container"]}>
        <div className={styles["sidebar"]}>
          <button
            type="button"
            className={styles["backButton"]}
            onClick={() => navigate(-1)}
          >
            ← Volver
          </button>
          <p>Bienvenido {usuario?.nombre}</p>
        </div>
        <div className={styles["formContainer"]}>
          <h2 className={styles["title"]}>Configuración del perfil</h2>
          <form className={styles["form"]}>
            <label className={styles["label"]}>Nombre:</label>
            {usuario?.nombre}
            <label className={styles["label"]}>Email:</label>
            {usuario?.email}
            <label className={styles["label"]}>Currículum Vitae</label>
            <CvUploader />            
            <label className={styles["label"]}>Nueva contraseña:</label>
            <input
              className={styles["input"]}
              type="password"
              placeholder="Enter new password"
              value={nuevaContra}
              onChange={(e) => setNuevaContra(e.target.value)}
            />
            <label className={styles["label"]}>Confirmar Contraseña</label>
            <input
              className={styles["input"]}
              type="password"
              placeholder="Confirme la nueva contraseña"
              value={confirmarContra}
              onChange={(e) => setConfirmarContra(e.target.value)}
            />
            <button
              type="button"
              className={styles["button"]}
              onClick={handleUpdatePassword}
            >
              Cambiar contraseña
            </button>
            {/* Botón para eliminar cuenta */}
            <button
              type="button"
              className={`${styles["button"]} ${styles["deleteButton"]}`}
              onClick={() => setShowConfirmation(true)} 
            >
              Eliminar cuenta
            </button>
          </form>
        </div>
      </div>

      {/* Modal de confirmación como ventana emergente */}
      {showConfirmation && (
        <div className={styles["overlay"]}>
          <div className={styles["modal"]}>
            <div className={styles["modalContent"]}>
              <p>¿Está seguro de que desea eliminar la cuenta?</p>
              <div className={styles["modalActions"]}>
                <button
                  className={styles["button"]}
                  onClick={handleDeleteAccount}
                >
                  Sí, eliminar
                </button>
                <button
                  className={styles["button"]}
                  onClick={() => setShowConfirmation(false)}
                >
                  No, no eliminar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MiPerfil;
