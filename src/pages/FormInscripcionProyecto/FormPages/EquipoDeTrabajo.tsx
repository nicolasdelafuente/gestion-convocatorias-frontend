import { Button, FormHelperText, TextField } from "@mui/material";
import React, { useContext, useState } from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { equipoDeTrabajoSchema, EquipoDeTrabajoValues, getUserEmailForZod } from "../schemas/equipoDeTrabajoSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "../../Home/formularios.module.css"
import { CustomButton } from "../../../components/CustomButton/CustomButtons";
import { btnRojo, formNavAnteriorBtn, formNavSiguienteBtn } from "../../../components/CustomButton/buttonStyles";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from '@mui/material/Box';
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { UserContext } from "../../Login/userContext";
import { IFormularioInscripcion } from "../FormInscripcionProyecto";

interface EquipoDeTrabajoProps {
    irSiguiente: (step: number) => void;
    datosDelFormulario: IFormularioInscripcion;
    setDatosDelFormulario: (datos: IFormularioInscripcion) => void;
}

const EquipoDeTrabajo = ({ irSiguiente, datosDelFormulario, setDatosDelFormulario }: EquipoDeTrabajoProps) => {

    const { usuario } = useContext(UserContext)
    if (usuario)
        getUserEmailForZod(usuario.email)

    const {
        control,
        register,   
        handleSubmit,
        formState: { errors },
    } = useForm<EquipoDeTrabajoValues>({
        resolver: zodResolver(equipoDeTrabajoSchema),
        defaultValues: {
            invitados: [
                { invitado: '' }
            ]
        }
    })

    const { fields, append, remove } = useFieldArray({
        name: "invitados",
        control
    })

    /* const { usuario } = useContext(UserContext)
    const [ ownMailError, setOwnMailError ] = useState(false)

    const checkError = (lista: {invitado: string}[]) => {
        const stringList = lista.map(i => i.invitado)

        if (usuario && stringList.includes(usuario.email)) {
            setOwnMailError(true)
        } else {
            setOwnMailError(false)
        }
    }*/

    const soloListaDeMails = (data: EquipoDeTrabajoValues) => {
        return data.invitados.map((i) => i.invitado)
    }

    const onSubmit: SubmitHandler<EquipoDeTrabajoValues> = (data) => {
        setDatosDelFormulario({...datosDelFormulario, invitados: soloListaDeMails(data)})
        irSiguiente(2)
    }

    return (
        <>
            <h2>Equipo de Trabajo</h2>
            <hr />
            <Box
                sx={{
                    backgroundColor: "#e3f5da",
                    borderRadius: 2,
                    border: '2px solid #56A42C',
                    margin: '1em',
                    padding: '1em'
                }}
            >
                Por favor ingrese a continuacion los mails de aquellos que desea invitar al proyecto
            </Box>
            <h3>Invitados:</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
                {fields.map((field, index) => {
                    return (
                        <div
                            className={`${styles['input-field']} ${styles['input-field-dinamic']}`}
                            key={field.id}
                        >
                            <TextField
                                {...register(`invitados.${index}.invitado`)}
                                id={`invitados.${index}.invitado`}
                                variant="outlined"
                                label="Invitado"
                                fullWidth
                                size="small"
                                placeholder="ejemplo@gmail.com"
                                error={!!errors.invitados?.[index]?.invitado}
                            />
                            <FormHelperText sx={{marginTop: '4em'}} className={styles['mensaje-error']} error id={`invitados.${index}.invitado`}>
                                {errors.invitados?.[index]?.invitado?.message}
                            </FormHelperText>

                            <CustomButton
                                nombre="Borrar"
                                accion={() => remove(index)}
                                iconoIzquierdo={<DeleteIcon />}
                                style={{
                                    ...btnRojo,
                                    marginLeft: '1em',
                                }}
                            />
                        </div>
                    )
                })}

                <FormHelperText error className={styles['mensaje-error']}>
                    {errors.invitados?.root?.message}
                </FormHelperText>

                <Button
                    variant="contained"
                    fullWidth
                    onClick={() => append({
                        invitado: ""
                    })}
                    sx={{
                        marginTop: '2em'
                    }}
                >Nuevo Invitado</Button>

                <div className={styles['nav-btn-group']}>
                    <Button
                        sx={{ ...formNavAnteriorBtn, color: 'white' }}
                        component={Link} to='/Convocatorias'
                    ><ArrowBack />Salir</Button>
                    <CustomButton
                        nombre="Siguiente"
                        type="submit"
                        iconoDerecho={<ArrowForward />}
                        style={formNavSiguienteBtn}
                    />
                </div>
            </form>
        </>
    )
}

export default EquipoDeTrabajo;
