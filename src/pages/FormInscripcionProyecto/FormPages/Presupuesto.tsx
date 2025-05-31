import { Alert, Button, TextField } from "@mui/material";
import React, { useState, forwardRef } from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import { IFormularioInscripcion } from "../FormInscripcionProyecto";
import styles from "../../Home/formularios.module.css";
import { CustomButton } from "../../../components/CustomButton/CustomButtons";
import { btnRojo, formNavAnteriorBtn,formNavSiguienteBtn,} from "../../../components/CustomButton/buttonStyles";
import { postProyecto } from "../../../api/proyectos.api";
import { useNavigate, useParams } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";

const MuiAlert = forwardRef(function MuiAlert(props: any, ref) {
     return <Alert elevation={6} ref={ref} variant="filled" {...props} />; 
});

interface Props {
    irSiguiente: (step: number) => void;
    irAtras: (step: number) => void;
    datosDelFormulario: IFormularioInscripcion;
    setDatosDelFormulario: (datos: IFormularioInscripcion) => void;
}

type Presupuesto = {
    gastosCapital: Gasto[];
    gastosCorrientes: Gasto[];
};

type Gasto = {
    rubro: string;
    coste: number;
    descripcion: string;
};

function Presupuesto({
    irSiguiente,
    irAtras,
    datosDelFormulario,
    setDatosDelFormulario,
    }: Props) {
    const { id } = useParams();
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const navigate = useNavigate();

    const {
        register,
        formState: { errors },
        control,
        handleSubmit,
    } = useForm<Presupuesto>({
        defaultValues: {
        gastosCapital: datosDelFormulario.presupuesto?.gastosCapital.length
            ? datosDelFormulario.presupuesto.gastosCapital
            : [{ rubro: "", coste: 0, descripcion: "" }],
        gastosCorrientes: datosDelFormulario.presupuesto?.gastosCorrientes.length
            ? datosDelFormulario.presupuesto.gastosCorrientes
            : [{ rubro: "", coste: 0, descripcion: "" }],
        },
    });

    const {
        fields: capitalFields,
        append: appendCapital,
        remove: removeCapital,
    } = useFieldArray({
        name: "gastosCapital",
        control,
    });

    const {
        fields: corrientesFields,
        append: appendCorrientes,
        remove: removeCorrientes,
    } = useFieldArray({
        name: "gastosCorrientes",
        control,
    });

    const onSubmit: SubmitHandler<Presupuesto> = async (data) => {
        setDatosDelFormulario({
        ...datosDelFormulario,
        presupuesto: data,
        });

        if (id) {
        const datosParaEnviar = {
            ...datosDelFormulario,
            presupuesto: data,
        };
        try {
            await postProyecto(id, datosParaEnviar);
            setOpenSnackbar(true);
            setTimeout(() => {
            navigate("/Convocatorias", { state: { success: true } });
            }, 2000);
        } catch (error) {
            console.error("Error al enviar la solicitud:", error);
        }
        }
    };

    return (
        <>
        <h2>Presupuesto</h2>
        <hr />
        <h3>Gastos de capital</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
            {capitalFields.map((field, index) => (
            <div key={field.id} style={{ marginBottom: "1.5em" }}>
                <Box display="flex" gap={2}>
                <TextField
                    {...register(`gastosCapital.${index}.rubro`, {
                    required: "Rubro es requerido",
                    })}
                    variant="outlined"
                    label="Rubro"
                    size="small"
                    placeholder="Rubro"
                    sx={{ flex: 7 }}
                    error={!!errors.gastosCapital?.[index]?.rubro}
                    helperText={errors.gastosCapital?.[index]?.rubro?.message}
                />
                <TextField
                    {...register(`gastosCapital.${index}.coste`, {
                    required: "Coste es requerido",
                    valueAsNumber: true,
                    min: { value: 0, message: "Debe ser mayor o igual a 0" },
                    })}
                    variant="outlined"
                    label="Coste"
                    size="small"
                    placeholder="Coste"
                    type="number"
                    sx={{ flex: 4 }}
                    error={!!errors.gastosCapital?.[index]?.coste}
                    helperText={errors.gastosCapital?.[index]?.coste?.message}
                />
                <Button
                    color="error"
                    variant="outlined"
                    onClick={() => removeCapital(index)}
                    sx={{ minWidth: "auto" }}
                >
                    <DeleteIcon />
                </Button>
                </Box>

                <TextField
                {...register(`gastosCapital.${index}.descripcion`, {
                    required: "Descripción es requerida",
                })}
                variant="outlined"
                label="Descripción"
                multiline
                rows={3}
                fullWidth
                size="small"
                placeholder="Descripción"
                margin="normal"
                error={!!errors.gastosCapital?.[index]?.descripcion}
                helperText={errors.gastosCapital?.[index]?.descripcion?.message}
                />
            </div>
            ))}

            <Button
            variant="contained"
            onClick={() =>
                appendCapital({ rubro: "", coste: 0, descripcion: "" })
            }
            startIcon={<AddIcon />}
            sx={{
                marginTop: "1em",
                marginBottom: "2em",
                backgroundColor: "#56A42C",
            }}
            >
            Nuevo gasto
            </Button>

            <hr />
            <h3>Gastos corrientes</h3>

            {corrientesFields.map((field, index) => (
            <div key={field.id} style={{ marginBottom: "1.5em" }}>
                <Box display="flex" gap={2}>
                <TextField
                    {...register(`gastosCorrientes.${index}.rubro`, {
                    required: "Rubro es requerido",
                    })}
                    variant="outlined"
                    label="Rubro"
                    size="small"
                    placeholder="Rubro"
                    sx={{ flex: 7 }}
                    error={!!errors.gastosCorrientes?.[index]?.rubro}
                    helperText={errors.gastosCorrientes?.[index]?.rubro?.message}
                />
                <TextField
                    {...register(`gastosCorrientes.${index}.coste`, {
                    required: "Coste es requerido",
                    valueAsNumber: true,
                    min: { value: 0, message: "Debe ser mayor o igual a 0" },
                    })}
                    variant="outlined"
                    label="Coste"
                    size="small"
                    placeholder="Coste"
                    type="number"
                    sx={{ flex: 4 }}
                    error={!!errors.gastosCorrientes?.[index]?.coste}
                    helperText={errors.gastosCorrientes?.[index]?.coste?.message}
                />
                <Button
                    color="error"
                    variant="outlined"
                    onClick={() => removeCorrientes(index)}
                    sx={{ minWidth: "auto" }}
                >
                    <DeleteIcon />
                </Button>
                </Box>

                <TextField
                {...register(`gastosCorrientes.${index}.descripcion`, {
                    required: "Descripción es requerida",
                })}
                variant="outlined"
                label="Descripción"
                multiline
                rows={3}
                fullWidth
                size="small"
                placeholder="Descripción"
                margin="normal"
                error={!!errors.gastosCorrientes?.[index]?.descripcion}
                helperText={errors.gastosCorrientes?.[index]?.descripcion?.message}
                />
            </div>
            ))}

            <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() =>
                appendCorrientes({ rubro: "", coste: 0, descripcion: "" })
            }
            sx={{
                marginTop: "1em",
                marginBottom: "2em",
                backgroundColor: "#56A42C",
            }}
            >
            Nuevo gasto
            </Button>

            <div className={styles["nav-btn-group"]}>
            <Button
                sx={{
                ...formNavAnteriorBtn,
                color: "white",
                backgroundColor: "#D94A3A",
                }}
                onClick={() => irAtras(2)}
            >
                <ArrowBack /> Volver
            </Button>
            <CustomButton
                nombre="Enviar solicitud"
                type="submit"
                iconoDerecho={<ArrowForward />}
                style={formNavSiguienteBtn}
            />
            </div>

            <Snackbar
            open={openSnackbar}
            autoHideDuration={2000}
            onClose={() => setOpenSnackbar(false)}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
            <MuiAlert severity="success" sx={{ width: "100%" }}>
                Postulación enviada correctamente
            </MuiAlert>
            </Snackbar>
        </form>
        </>
    );
}

export default Presupuesto;
