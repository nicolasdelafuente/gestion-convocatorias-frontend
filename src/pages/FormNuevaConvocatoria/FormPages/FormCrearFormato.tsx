import React from "react";
import {
    SubmitHandler,
    useForm,
    Controller,
    useFieldArray
} from "react-hook-form";
import {
    nuevoFormatoSchema,
    NuevoFormatoValues,
} from "../schemas/nuevoFormatoSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextField } from "@mui/material";
import styles from "../../Home/formularios.module.css";
import DeleteIcon from "@mui/icons-material/Delete";
import { CustomButton } from "../../../components/CustomButton/CustomButtons";
import { btnRojo, formatSelectorBtn } from "../../../components/CustomButton/buttonStyles";
import { getFormatoByNombre, postFormato } from "../../../api/formatos.api";

interface CrearFormatoProps {
    setFormato: (data: string) => void;
}

const FormCrearFormato = ({ setFormato }: CrearFormatoProps) => {
    const {
        control,
        setValue,
        handleSubmit,
        formState: { errors },
    } = useForm<NuevoFormatoValues>({
        resolver: zodResolver(nuevoFormatoSchema),
        defaultValues: {
            nombreDelFormato: ""
        }
    });

    const { fields, append, remove } = useFieldArray({
        name: "campos",
        control,
    });

    const onOptionsBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
        const opciones = e.target.value.split(";").map(opcion => opcion.trim()).filter(opcion => opcion);
        setValue(`campos.${index}.opciones`, opciones);
    };

    const onSubmit: SubmitHandler<NuevoFormatoValues> = async (data) => {
        console.log("FORMATO",data);
        // Deberia Guardar el Formato en el Backend

        try {
            const response = await postFormato(data);
            const formatoId = response;
            console.log("Formato guardado con ID:", formatoId);
            setFormato(formatoId);
        } catch (error) {
            console.error("Error al guardar el formato:", error);
        }
        /* const formato = await getFormatoByNombre(data.nombreDelFormato)
        if (!formato) {
            console.log('error')
            } 
        console.log("GEEEEEEET",formato)
        */

        
    };

    return (
        <>
            <h3>Crear Formato</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={styles["input-field"]}>
                    <Controller
                        name="nombreDelFormato"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                id="nombreDelFormato"
                                label="Nombre del Formato"
                                variant="outlined"
                                error={!!errors.nombreDelFormato}
                                helperText={errors.nombreDelFormato?.message}
                                fullWidth
                            />
                            )}
                    />
                </div>

                <div className={styles["btn-select-formato-group"]}>
                    <CustomButton
                        nombre="Nuevo Campo de Texto"
                        style={formatSelectorBtn}
                        accion={() =>
                            append({
                                nombreDelCampo: "",
                                tipo: "texto",
                                maxNumeroDeCaracteres: 10,
                            })
                        }
                    />
                    <CustomButton
                        nombre="Nuevo Desplegable"
                        style={formatSelectorBtn}
                        accion={() =>
                            append({
                                nombreDelCampo: "",
                                tipo: "selector",
                                opciones: ["Opcion 1", "Opcion 2", "Opcion 3"],
                            })
                        }
                    />
                </div>

                {fields.map((field, index) => {
                    return (
                        <div key={field.id}>
                            <section className={"section"} key={field.id}>
                                <div className={styles["input-field"]}>
                                    <Controller
                                        name={`campos.${index}.nombreDelCampo`}
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                id={`campos.${index}.nombreDelCampo`}
                                                label="Nombre del Campo"
                                                variant="outlined"
                                                error={!!errors.campos?.[index]?.nombreDelCampo}
                                                helperText={errors.campos?.[index]?.nombreDelCampo?.message}
                                                fullWidth
                                            />
                                        )}
                                    />
                                </div>

                                {field.tipo === "texto" ? (
                                    <div className={styles["input-field"]}>
                                        <Controller
                                            name={`campos.${index}.maxNumeroDeCaracteres`}
                                            control={control}
                                            render={({ field }) => (
                                                <TextField
                                                    {...field}
                                                    id={`campos.${index}.maxNumeroDeCaracteres`}
                                                    label="Maximo numero de caracteres"
                                                    variant="outlined"
                                                    type="number"
                                                    onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                                                    error={!!errors.campos?.[index]?.maxNumeroDeCaracteres}
                                                    helperText={errors.campos?.[index]?.maxNumeroDeCaracteres?.message}
                                                    fullWidth
                                                />
                                            )}
                                        />
                                    </div>
                                
                                
                                ) : (
                                    <div className={styles["input-field"]}>
                                        <Controller
                                            name={`campos.${index}.opciones`}
                                            control={control}
                                            render={({ field }) => (
                                                <TextField
                                                    {...field}
                                                    id={`campos.${index}.opciones`}
                                                    label="Opciones"
                                                    variant="outlined"
                                                    error={!!errors.campos?.[index]?.opciones}
                                                    helperText={errors.campos?.[index]?.opciones?.message}
                                                    fullWidth
                                                    onBlur={(e) => onOptionsBlur(e, index)}
                                                />
                                            )}
                                        />
                                    </div>
                                )}

                                <CustomButton
                                    nombre="Borrar"
                                    accion={() => remove(index)}
                                    iconoIzquierdo={<DeleteIcon />}
                                    style={btnRojo}
                                />
                                <hr />
                            </section>
                        </div>
                    );
                })}

                <button type="submit">Guardar Formato</button>
            </form>
        </>
    );
};

export default FormCrearFormato