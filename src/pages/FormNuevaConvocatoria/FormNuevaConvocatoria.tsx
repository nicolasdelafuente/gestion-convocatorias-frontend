import React, { useState } from "react";

import InformacionGeneral from "./FormPages/InformacionGeneral";
import FormFormato from "./FormPages/FormFormato";
import FormArchivos from "./FormPages/FormArchivos";

import styles from '../Home/formularios.module.css'
import { string } from "zod";

export interface IConvocatoria {
    titulo: string;
    descripcion: string;
    fechaInicio: Date;
    fechaFin: Date;
    formato: string;
}

const FormNuevaConvocatoria = () => {
    const [step, setStep] = useState(1);
    const [data, setData] = useState<IConvocatoria>({
        titulo: '',
        descripcion: '',
        fechaInicio: new Date(),
        fechaFin: new Date(),
        formato: ''
    });

    return (
        <>
            <div className={styles['form-container']}>

                {step === 1 && <InformacionGeneral setStep={setStep} savedData={data} setData={setData} />}
                {step === 2 && <FormFormato setStep={setStep} savedData={data} setData={setData} />}
                {step === 3 && <FormArchivos savedData={data} />}
                <button onClick={() => console.log(data)}>show data</button>
            </div>

        </>
    )
}

export default FormNuevaConvocatoria;
