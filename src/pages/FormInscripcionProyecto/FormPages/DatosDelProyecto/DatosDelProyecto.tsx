import React, { useEffect, useState } from 'react';
import { CampoFormato, IFormularioInscripcion } from '../../FormInscripcionProyecto';
import styles from "../../../Home/formularios.module.css";
import { formNavAnteriorBtn, formNavSiguienteBtn } from '../../../../components/CustomButton/buttonStyles';
import { CustomButton } from '../../../../components/CustomButton/CustomButtons';
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { Button, TextField, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import { getConvocatoriaById } from '../../../../api/convocatorias.api';
import { getFormatoById } from '../../../../api/formatos.api';

interface Props {
    irSiguiente: (n: number) => void;
    irAtras: (n: number) => void;
    datosDelFormulario: IFormularioInscripcion;
    setDatosDelFormulario: React.Dispatch<React.SetStateAction<IFormularioInscripcion>>;
    campos: CampoFormato[];
}

const DatosDelProyecto = ({
    irSiguiente,
    irAtras,
    datosDelFormulario,
    setDatosDelFormulario,
    campos
    }: Props) => {
    const handleChange = (clave: string, valor: string) => {
        setDatosDelFormulario(prev => ({
            ...prev,
            camposExtra: {
                ...(prev.camposExtra || {}),
                [clave]: valor
            }
        }));
    };

    return (
        <form className={styles["form-card"]}>
            <h2 className={styles["form-title"]}>Datos del Proyecto</h2>
            <hr />
            <div className={styles["form-fields"]}>
                {campos.map((campo, index) => (
                    <div key={index} className={styles["form-group"]} style={{ marginBottom: '1.5rem' }}>
                        {campo.tipo === "texto" && (
                            <TextField
                                label={campo.label}
                                value={datosDelFormulario.camposExtra?.[campo.clave] || ""}
                                onChange={(e) => handleChange(campo.clave, e.target.value)}
                                fullWidth
                                variant="outlined"
                                size="small"
                            />
                        )}

                        {campo.tipo === "selector" && (
                            <FormControl fullWidth size="small">
                                <InputLabel>{campo.label}</InputLabel>
                                <Select
                                    label={campo.label}
                                    value={datosDelFormulario.camposExtra?.[campo.clave] || ""}
                                    onChange={(e) => handleChange(campo.clave, e.target.value)}
                                >
                                    {campo.opciones?.map((opcion, i) => (
                                        <MenuItem key={i} value={opcion}>{opcion}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        )}
                    </div>
                ))}
            </div>

            <div className={styles["nav-btn-group"]}>
                <Button
                    sx={formNavAnteriorBtn}
                    onClick={() => irAtras(1)}
                    startIcon={<ArrowBack />}
                >
                    Anterior
                </Button>

                <CustomButton
                    nombre="Siguiente"
                    accion={() => irSiguiente(3)}
                    iconoDerecho={<ArrowForward />}
                    style={formNavSiguienteBtn}
                />
            </div>
        </form>
    );
};
export default DatosDelProyecto