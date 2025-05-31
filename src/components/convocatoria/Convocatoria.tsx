import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import ButtonGenerico from "../button-generico/ButtonGenerico";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import "/src/components/convocatoria/convocatoria.css";
import { deleteConvocatoria, putFechaConvocatoria } from "../../api/usuarios.api";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";


interface Props {
  idConvocatoria: string;
  titulo: string;
  descripcion: string;
  fechaInicio: Date;
  fechaFin: Date;
  formato: string;
}

interface Usuario {
  id: number;
  titulo: string;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const location = useLocation();
const [showSuccess, setShowSuccess] = useState(false);

const Convocatoria = ({
  idConvocatoria,
  titulo,
  descripcion,
  fechaInicio,
  fechaFin,
  formato,
}: Props): JSX.Element => {
  const [showModal, setShowModal] = useState(false); // Muestra/oculta el modal
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false); // Modal de confirmación de eliminación
  const [editableFechaFin, setEditableFechaFin] = useState(fechaFin); //Permite modificar la fechaFin
  const [postulados, setPostulados] = useState<Usuario[]>([ //Parte de postulantes mockeado
    { id: 1, titulo: "Ej-Proyecto 1" },
    { id: 2, titulo: "Ej-Proyecto 2" },
    { id: 3, titulo: "Ej-Proyecto 3" },
  ]);
  const [selectedFechaFin, setSelectedFechaFin] = useState<Date | null>(null);
  const [showConfirmationUpdate, setShowConfirmationUpdate] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleShowDeleteConfirmation = () => setShowDeleteConfirmation(true);
  const handleCloseDeleteConfirmation = () => setShowDeleteConfirmation(false);

  const handleDelete = async () => {
    try {
      await deleteConvocatoria(idConvocatoria); 
      toast.success("Convocatoria eliminada correctamente.");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      toast.error("Error al eliminar la convocatoria. Intenta nuevamente.");
    } finally {
      setShowDeleteConfirmation(false); 
      setShowModal(false); 
    }
  };


  const handleFechaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nuevaFecha = new Date(event.target.value);
    setSelectedFechaFin(nuevaFecha);
    setShowConfirmationUpdate(true);
  };

 

  return (
    <Card className="card-convocatoria">
      <Card.Body className="card-body">
        <Card.Title>{titulo}</Card.Title>
        <Card.Text>{descripcion}</Card.Text>
        <Card.Subtitle>
          Inscripción hasta: {editableFechaFin.toLocaleDateString()}
        </Card.Subtitle>
        <div className="btn-card-convocatoria">
          <ButtonGenerico
            accion={handleShowModal}
            className="btn-inscribirse btn-prueba"
            nombre="Ver más"
          />
        </div>
      </Card.Body>

      {/* Modal de información de la convocatoria */}
      <Modal
        show={showModal}
        onHide={handleCloseModal}
        centered
        dialogClassName="custom-modal"
      >
        <Modal.Header closeButton className="custom-modal-header">
          <Modal.Title>{titulo}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="convocatoria-descripcion">{descripcion}</p>

          <div className="convocatoria-fechas">
            <p>
              Fecha inicio de la convocatoria: {fechaInicio.toLocaleString()}
            </p>
            <form>
              <p>
                Fecha fin de la convocatoria:{" "}
                <input
                  type="datetime-local"
                  value={editableFechaFin.toISOString().slice(0, 16)}
                  onChange={(event) => {
                    handleFechaChange(event);
                    event.target.blur();
                  }}
                  className="fecha-fin-input"
                  min={fechaInicio.toISOString().slice(0, 16)}
                />
              </p>
            </form>
            {showConfirmationUpdate && (
              <div className="confirmation-modal">
                <p>
                  ¿Desea cambiar la fecha de finalización a{" "}
                  <strong>{selectedFechaFin?.toLocaleString()}</strong>?
                </p>
                <div className="confirmation-buttons">
                  <button
                    onClick={async () => {
                      if (selectedFechaFin) {
                        try {
                          await putFechaConvocatoria(
                            idConvocatoria,
                            selectedFechaFin
                          );
                          setEditableFechaFin(selectedFechaFin);
                          toast.success("Fecha actualizada con éxito");
                        } catch (error) {
                          toast.error("Error al actualizar la fecha");
                        }
                      }
                      setShowConfirmationUpdate(false);
                    }}
                    className="btn-aceptar"
                  >
                    Aceptar
                  </button>
                  <button
                    onClick={() => setShowConfirmationUpdate(false)}
                    className="btn-no-cambiar"
                  >
                    No cambiar
                  </button>
                </div>
              </div>
            )}
          </div>

          <h5>Cantidad de Postulaciones: {postulados.length}</h5>
          <table className="convocatoria-table">
            <thead>
              <tr>
                <th>ID-Proyecto</th>
                <th>Título</th>
              </tr>
            </thead>
            <tbody>
              {postulados.map((usuario) => (
                <tr key={usuario.id}>
                  <td>{usuario.id.toString().slice(-6)}</td>
                  <td>{usuario.titulo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn-cerrar" onClick={() =>
            alert(JSON.stringify(
              {formato},
              null,
              2
            ))
          }>
            Ver formato
          </button>
          <button onClick={handleShowDeleteConfirmation} className="btn-cerrar">
            Eliminar
          </button>
          <button onClick={() => setShowModal(false)} className="btn-cerrar">
            Cerrar
          </button>
        </Modal.Footer>
      </Modal>

      {/* Modal de confirmación de eliminación */}
      <Modal
        show={showDeleteConfirmation}
        onHide={handleCloseDeleteConfirmation}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirmación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>¿Está seguro de que desea eliminar esta convocatoria?</p>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn-cerrar"
            onClick={handleCloseDeleteConfirmation}
          >
            No borrar
          </button>
          <button className="btn-eliminar" onClick={handleDelete}>
            Aceptar
          </button>
        </Modal.Footer>
      </Modal>
    </Card>
  );
};

export default Convocatoria;
