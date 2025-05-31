import React, { ChangeEvent, useContext, useState } from "react";
import axios from "axios"
import { updateCv } from "../../api/usuarios.api";
import { useRef } from "react";
import { UserContext } from "../../pages/Login/userContext";
import stylesButton from "./CvUploader.module.css"

type UploadStatus = "idle" | "uploading" | "success" | "error"

function CvUploader() {
    const { usuario } = useContext(UserContext)
    const [file, setFile] = useState<File | null>(null)
    const [status, setStatus] = useState<UploadStatus>("idle")

    //const inputRef = useRef<HTMLInputElement | null>(null);

    function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
        if (e.target.files) {
            setFile(e.target.files[0])
        }
        console.log(usuario)
    }

    async function handleFileUpload(e: React.MouseEvent<HTMLButtonElement>) {
        if (!file || !usuario) return;
        setStatus("uploading")
        const formData = new FormData();
        formData.append("archivo", file)

        try {
            setStatus("success");
            updateCv(usuario.email, formData)
        } catch (e) {
            setStatus("error");
        };
    }

    /*
    async function handlefileRemoval(e: React.MouseEvent<HTMLButtonElement>) {
        if (!usuario || usuario.cv) return;
        setStatus("uploading")
        //const formData = new FormData();
        //formData.append("archivo", file)

        try {
            setStatus("idle");
            usuario.cv = null
        } catch (e) {
            setStatus("error");
        };        
    } */

    /*function handleFileUpload(e: React.MouseEvent<HTMLButtonElement>) {
        const selectedFile = inputRef.current?.files?.[0];
        if (!selectedFile) return;
    
        setStatus("uploading");
    
        const formData = new FormData();
        console.log(selectedFile)
        formData.append("archivo", selectedFile);
    
        try {
            setStatus("success");
            updateCv("pepito666@gmail.com", formData);
        } catch (e) {
            setStatus("error");
        }
    }*/

    return (
        <div>
            {usuario?.cv?.nombre &&
                <div style={{marginBottom: "15px"}}>
                    {usuario.cv.nombre}
                    <a href={`data:${usuario.cv.tipo};base64,${usuario.cv.contenido}`}
                        download={usuario.cv.nombre}>
                        <svg style={{width: "20px", marginLeft: "10px"}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                            <g data-name="35-Arrow Down">
                                <path d="M25 14h-5v2h5a5 5 0 0 1 5 5v4a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5v-4a5 5 0 0 1 5-5h5v-2H7a7 7 0 0 0-7 7v4a7 7 0 0 0 7 7h18a7 7 0 0 0 7-7v-4a7 7 0 0 0-7-7z" />
                                <path d="m8.29 18.71 7 7a1 1 0 0 0 1.41 0l7-7-1.41-1.41L17 22.59V1h-2v21.59l-5.29-5.3z" />
                            </g>
                        </svg></a>
                </div>}
            <input type="file" accept=".pdf,.docx" onChange={handleFileChange} />
            {file && (
                <div>
                    <p>Peso: {(file.size / 1024).toFixed(2)} KB</p>
                </div>
            )}
            {file && status !== "uploading" &&
                <button type="button" onClick={(handleFileUpload)}>Subir</button>
            }
            {status === 'success' && (
                <p>Archivo subido correctamente</p>
            )}
            {status === 'error' && (
                <p>Ocurrió un error al subir el archivo, por favor intentalo más tarde</p>
            )}

        </div>)
}

export default CvUploader