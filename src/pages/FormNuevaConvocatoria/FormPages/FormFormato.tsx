import React, { useEffect, useState } from "react";
import FormCrearFormato from "./FormCrearFormato";
import { CustomButton } from "../../../components/CustomButton/CustomButtons";

import styles from "../../Home/formularios.module.css";
import { btnVerdeUnahur, formatSelectorBtn, formNavAnteriorBtn, formNavSiguienteBtn } from "../../../components/CustomButton/buttonStyles";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { IConvocatoria } from "../FormNuevaConvocatoria";
import { Button, List, ListItem, ListItemButton, ListItemText, ListSubheader } from "@mui/material";
import { getFormatos } from "../../../api/formatos.api";
import { FormatoProps } from "../../Formatos/Formatos";
import FormatoDialog from "../../../components/FormatoDialog/FormatoDialog";

interface FormFormatoProps {
    setStep: (step: number) => void;
    savedData: IConvocatoria
    setData: (data: IConvocatoria) => void;
}

const FormFormato = ({ setStep, savedData, setData }: FormFormatoProps) => {
    const [tipoFormulario, setTipoFormulario] = useState<JSX.Element | null>(null);
    const [formato, setFormato] = useState<string | null>(null);

    return (
        <>
            <h2>Definir Formato</h2>
            <div className={styles["btn-select-formato-group"]}>
                <CustomButton
                    nombre="Seleccionar Formato"
                    accion={() => {setTipoFormulario(<SelectorFormato setFormato={setFormato}/>)}}
                    style={formatSelectorBtn}
                />
                <CustomButton
                    nombre="Crear Formato"
                    accion={() => {setTipoFormulario(<FormCrearFormato setFormato={setFormato} />)}}
                    style={formatSelectorBtn}
                />
            </div>
            <hr />

            {tipoFormulario}

            <div className={styles["nav-btn-group"]}>
                <CustomButton
                        nombre="Anterior"
                        iconoIzquierdo={<ArrowBack />}
                        style={formNavAnteriorBtn}
                        accion={() => setStep(1)}
                />
                <CustomButton
                    nombre="Siguiente"
                    iconoDerecho={<ArrowForward />}
                    style={formNavSiguienteBtn}
                    accion={() => {
                        if (!formato) {
                            alert("Por favor selecciona o crea un formato")
                        } else {
                            setStep(3)
                            setData({ ...savedData, formato })
                        }
                    }}
                />
            </div>
        </>
    );
};

export default FormFormato;

interface SelectorFormatoProps {
    setFormato: (data: string) => void;
}

const SelectorFormato = ({ setFormato }: SelectorFormatoProps) => {
    const [listFormatos, setListFormatos] = useState<FormatoProps[]>([])
    const [selectedFormato, setSelectedFormato] = useState<number | null>(null);
    const [showFormatoDialog, setShowFormatoDialog] = useState(false)
    const [dataForFormatoDialog, setDataForFormatoDialog] = useState<FormatoProps>({
        _id: "",
        nombreDelFormato: "",
        campos: [],
    });

    useEffect(() => {
        const getFormatosList = async () => {

            const data = await getFormatos();
            if (Array.isArray(data)) {
                setListFormatos(data);
            }
        };
        getFormatosList()
    }, [])

    const formatos = listFormatos.length ? (
        listFormatos.map((formato, index) => (
            <ListItem key={index}>
                <ListItemButton
                    onClick={() => {
                        setSelectedFormato(index)
                        setFormato(formato._id.toString())
                    }}
                    selected={selectedFormato === index}
                    
                    >
                    <ListItemText primary={formato.nombreDelFormato} />
                </ListItemButton>
                <Button
                    variant="outlined"
                    sx={{
                        ...btnVerdeUnahur,
                        borderRadius: '5px',
                        padding: '5px 10px',
                        fontSize: '0.8rem',
                        margin: 0,
                        color: 'white',
                    }}
                    onClick={() => {
                        setDataForFormatoDialog(formato)
                        setShowFormatoDialog(true)
                    }}
                >Ver Formato</Button>
            </ListItem>
                
        ))
    ) : (
        <>
            <div>
                <h2>No hay formatos</h2>
            </div>
        </>
    );

    return (
        <>
            <h3>Seleccionar Formato</h3>

            <List
                sx={{
                    width: '100%',
                }}
                subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                        Formatos
                    </ListSubheader>
                }
            >
                {formatos}
            </List>
            
            <FormatoDialog
                formatoData={dataForFormatoDialog}
                showDialogState={{ showFormatoDialog, setShowFormatoDialog }}
            />

        </>
    );
};
