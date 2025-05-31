import { MenuItem, TextField } from "@mui/material";
import React from "react";

const InputCampo = ({ campoData }: any) => {

    const campo = () => {
        if (campoData.tipo == 'texto') {
           return (
            <TextField
                fullWidth
                defaultValue={campoData.nombreDelCampo}
                helperText={`Campo de tipo texto, maxima cantidad de caracteres: ${campoData.maxNumeroDeCaracteres}`}
                slotProps={{
                    input: {
                        readOnly: true
                    }
                }}
            />
           ) 
        } else {
            return (
            <TextField
                select
                fullWidth
                label={campoData.nombreDelCampo}
                helperText={`Campo de tipo desplegable`}
                defaultValue=''
            >
                {campoData.opciones.map((opcion) => (
                    <MenuItem key={opcion} value={opcion}>
                        {opcion}
                    </MenuItem>
                ))}
            </TextField>
            )
        }
    }


    return (
        <div className="campo-vista">
            {campo()}
        </div>
    )
}

export default InputCampo;