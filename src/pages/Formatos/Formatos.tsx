import React, { useEffect, useState } from 'react';
import { getFormatos } from '../../api/formatos.api';
import FormatoCard from './components/FormatoCard';

export interface FormatoProps {
    _id: string;
    nombreDelFormato: string;
    campos: any[]
}

const Formatos = () => {
    const [listFormatos, setListFormatos] = useState<FormatoProps[]>([])

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
            <FormatoCard
                _id={formato._id}
                key={index}
                nombreDelFormato={formato.nombreDelFormato}
                campos={formato.campos}
            />
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
            {formatos}
        </>
    )
}

export default Formatos;