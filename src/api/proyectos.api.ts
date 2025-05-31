import axios from "axios";
import { IFormularioInscripcion } from "../pages/FormInscripcionProyecto/FormInscripcionProyecto";
import { getHeaders } from "./convocatorias.api";

export const postProyecto = async (idConvocatoria: string, formularioInscripcionData: IFormularioInscripcion) => {
    try {
        console.log('Datos que envío:', formularioInscripcionData);
        const response = await axios.post(
        `http://localhost:3000/proyecto/${idConvocatoria}`,
        formularioInscripcionData,
        getHeaders({ "Content-Type": "application/json" })
        );
        console.log('Respuesta backend:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error en postProyecto:', error);
        throw error;
    }
};