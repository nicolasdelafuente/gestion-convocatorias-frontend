import React, { useEffect, useState } from "react";
import { getConvocatorias } from "../../api/convocatorias.api";
import Convocatoria from "../../components/convocatoria/Convocatoria";
import ConvocatoriaCard from "./components/ConvocatoriaCard";

interface Convocatoria {
    _id:string
    titulo:string,
    descripcion:string,
    fechaInicio: Date,
    fechaFin: Date
    formato: string
}

const ConvocatoriasPage = () => {

    const [listConvocatorias, setListConvocatorias] = useState<Convocatoria[]>([])

    useEffect( () => {
        const getConvocatoria = async () => {

            const data = await getConvocatorias();
            if (Array.isArray(data)) {
                setListConvocatorias(data);
            }
        } ;
        getConvocatoria()
    }, [])


    const convocatorias = listConvocatorias.length ? ( 
            listConvocatorias.map((convoc, index) => (
                <ConvocatoriaCard
                idConvocatoria={convoc._id}
                key={index}
                titulo={convoc.titulo}
                descripcion={convoc.descripcion}
                fechaInicio={new Date(convoc.fechaInicio)}
                fechaFin={new Date(convoc.fechaFin)}
                formato={convoc.formato}
                /> 
            ))
    ) : (
        <>
            <div>
                <h2>No hay convocatorias en curso</h2>
            </div>
        </>    
    );
    
    return (
        <>
            {convocatorias}
        </>
    )
}

export default ConvocatoriasPage;