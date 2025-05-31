import React from "react";
import { FieldError, Control, Controller } from "react-hook-form";

interface Props {
    nombre: string;
    label: string;
    type?: string;
    control: Control<any>
    error?: FieldError;
    className?: string
}

const FormInput = ({ nombre, label, type, control, error, className }: Props) => {

    return (
        <div className={className}>
            <label htmlFor={nombre}>{label}</label>
            <Controller
                name={nombre}
                control={control}
                render={({ field }) => <input id={nombre} type={type} {...field} className={`form-control ${error ? "is-invalid": ""}`}/>
                }
            />
            {error && <p className="error">{error.message}</p>}
        </div>
    )
}

export default FormInput;