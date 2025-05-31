import React, { useState } from "react";

import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    informacionGeneralSchema,
    InformacionGeneralValues,
} from "../schemas/informacionGeneralSchema";

import dayjs from "dayjs";
import { FormHelperText, TextField } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

import styles from "../../Home/formularios.module.css";
import { CustomButton } from "../../../components/CustomButton/CustomButtons";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { formNavAnteriorBtn, formNavSiguienteBtn } from "../../../components/CustomButton/buttonStyles";
import { IConvocatoria } from "../FormNuevaConvocatoria";

interface InformacionGeneralProps {
    setStep: (step: number) => void;
    savedData: IConvocatoria
    setData: (data: IConvocatoria) => void;
}

const InformacionGeneral = ({ setStep, savedData, setData }: InformacionGeneralProps) => {
    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<InformacionGeneralValues>({
        defaultValues: {
            titulo: savedData.titulo || "",
            descripcion: savedData.descripcion || "",
            fechaInicio: savedData.fechaInicio || new Date(),
            fechaFin: savedData.fechaFin || new Date(),
        },
        resolver: zodResolver(informacionGeneralSchema),
    });

    const [fechaInicioDayjs, setFechaInicioDayjs] = useState<dayjs.Dayjs | null>(
        dayjs()
    );
    const [fechaFinDayjs, setFechaFinDayjs] = useState<dayjs.Dayjs | null>(
        dayjs()
    );

    const onSubmit: SubmitHandler<InformacionGeneralValues> = (data) => {
        console.log(data);
        setData({ ...savedData, ...data });
        setStep(2);
    };

    return (
        <>
            <h2>Informacion General</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                {/*     INPUT TITULO     */}
                <div className={styles['input-field']}>
                    <Controller
                        name="titulo"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                id="titulo"
                                label="Titulo"
                                variant="outlined"
                                //helperText={errors.titulo ? false : "Por favor, ingrese el titulo/nombre de la convocatoria"}
                                helperText="Por favor, ingrese el titulo/nombre de la convocatoria"
                                error={!!errors.titulo}
                                fullWidth
                            />
                        )}
                    />
                    <FormHelperText className={styles['mensaje-error']} error id="titulo">
                        {errors.titulo?.message}
                    </FormHelperText>
                </div>

                {/*     INPUT DESCRIPCION     */}
                <div className={styles['input-field']}>
                    <Controller
                        name="descripcion"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                id="descripcion"
                                label="Descripcion"
                                variant="outlined"
                                helperText="Por favor, ingrese una descripcion de la convocatoria"
                                error={!!errors.descripcion}
                                multiline
                                fullWidth
                            />
                        )}
                    />
                    <FormHelperText className={styles['mensaje-error']} error id="descripcion">
                        {errors.descripcion?.message}
                    </FormHelperText>
                </div>

                <h2>Periodo de Inscripcion a la Convocatoria</h2>
                {/*     INPUT FECHA INICIO     */}
                <div className={styles['input-group']}>
                    <div className={styles['input-field']}>
                        <Controller
                            name="fechaInicio"
                            control={control}
                            render={({ field }) => (
                                <DateTimePicker
                                    {...field}
                                    className="date-time-picker"
                                    name="fechaInicio"
                                    label="Fecha de Inicio"
                                    value={fechaInicioDayjs}
                                    minDateTime={dayjs().subtract(1, "day")}
                                    onChange={(newValue) => {
                                        setFechaInicioDayjs(newValue);
                                        if (newValue) {
                                            setValue("fechaInicio", newValue.toDate());
                                        }
                                    }}
                                /* onError={(newError) => setError(newError)}
                                            slotProps={{
                                              textField: {
                                              helperText: errorMessage,
                                              },
                                            }} */
                                />
                            )}
                        />
                        <FormHelperText id="fechaInicio">
                            Fecha de inicio del periodo de Inscripcion
                        </FormHelperText>
                        <FormHelperText className={styles['mensaje-error']} error id="fechaInicio">
                            {errors.fechaInicio?.message}
                        </FormHelperText>
                    </div>

                    {/*     INPUT FECHA FIN     */}
                    <div className={styles['input-field']}>
                        <Controller
                            name="fechaFin"
                            control={control}
                            render={({ field }) => (
                                <DateTimePicker
                                    {...field}
                                    className="date-time-picker"
                                    name="fechaFin"
                                    label="Fecha Fin"
                                    defaultValue={dayjs()}
                                    value={fechaFinDayjs}
                                    minDateTime={dayjs(fechaInicioDayjs)}
                                    onChange={(newValue) => {
                                        setFechaFinDayjs(newValue);
                                        if (newValue) {
                                            setValue("fechaFin", newValue.toDate());
                                        }
                                    }}
                                />
                            )}
                        />
                        <FormHelperText id="fechaInicio">
                            Fecha de fin del periodo de Inscripcion
                        </FormHelperText>
                        <FormHelperText className={styles['mensaje-error']} error id="fechaFin">
                            {errors.fechaFin?.message}
                        </FormHelperText>
                    </div>
                </div>

                <div className={styles['nav-btn-group']}>
                    <CustomButton
                        nombre="Salir"
                        iconoIzquierdo={<ArrowBack />}
                        style={formNavAnteriorBtn}
                    />
                    <CustomButton
                        nombre="Siguiente"
                        type="submit"
                        iconoDerecho={<ArrowForward />}
                        style={formNavSiguienteBtn}
                    />
                </div>
            </form>
        </>
    );
};

export default InformacionGeneral;

