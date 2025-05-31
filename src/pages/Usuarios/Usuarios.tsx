import { Button, Card, CardActionArea, CardContent } from "@mui/material";
import React, { useEffect, useState } from 'react';
import { getUsuarios } from '../../api/usuarios.api';
import UsuarioDialog from "./components/UsuarioDialog";
import { CustomButton } from "../../components/CustomButton/CustomButtons";
import styles from "./usuarios.module.css"

export interface UsuarioProps {
    _id: string;
    nombre: string;
    email: string;
    roles: Array<string>
}

export interface UsuarioCardProps extends UsuarioProps {
    onRefresh: () => void
}

const UsuarioCard = ({ _id, nombre, email, roles, onRefresh }: UsuarioCardProps) => {

    const [showUsuarioDialog, setShowUsuarioDialog] = useState(false)

    return (
        <>
            <Card
                sx={{
                    borderTop: 15,
                    borderTopColor: "#56A42C",
                    width: '20rem'
                }}>
                <CardActionArea onClick={() => setShowUsuarioDialog(true)}
                >
                    <CardContent>
                        <h5>{nombre}</h5>
                        <p>{roles.join(", ")}</p>
                    </CardContent>
                </CardActionArea>
            </Card>

            <UsuarioDialog
                usuarioData={{ _id, nombre, email, roles }}
                showDialogState={{ showUsuarioDialog, setShowUsuarioDialog }}
                onRefresh={onRefresh}
            />
        </>
    )
}

const Usuarios = () => {
    const [listUsuarios, setListUsuarios] = useState<UsuarioProps[]>([])

    const [refreshKey, setRefreshKey] = useState(0);

    const handleRefresh = () => {
        setRefreshKey(prev => prev + 1);
    };

    useEffect(() => {
        const getUsuariosList = async () => {

            const data = await getUsuarios();
            if (Array.isArray(data)) {
                setListUsuarios(data);
            }
        };
        getUsuariosList()
    }, [refreshKey])

    const getUsuariosPorRol = (rol: string) => { 
        const usersFiltrados = listUsuarios.filter(usuario => usuario.roles.includes(rol))

        return usersFiltrados.length ? (
        usersFiltrados.map((users, index) => (
            <UsuarioCard
                _id={users._id}
                key={index}
                nombre={users.nombre}
                email={users.email}
                roles={users.roles}
                onRefresh={handleRefresh}
            />
        ))
    ) : (
        <>
            <div>
                <h2>No hay usuarios</h2>
            </div>
        </>
    );}

    return (
        <>
            <div className={styles["listado-usuarios"]}>
                <div className={styles["container-listado"]}>
                    <h2>Investigadores</h2>
                    <div className={styles["listado"]}>
                        {getUsuariosPorRol("investigador")}
                    </div>
                </div>

                <div className={styles["container-listado"]}>
                    <h2>Admins</h2>
                    <div className={styles["listado"]}>
                        {getUsuariosPorRol("admin")}
                    </div>
                </div>

                <div className={styles["container-listado"]}>
                    <h2>Superadmins</h2>
                    <div className={styles["listado"]}>
                        {getUsuariosPorRol("super_admin")}
                    </div>
                </div>
            </div>
            {/*<CustomButton
                nombre="prueba" 
                accion={() => investigadores(listUsuarios)}
            />*/}
        </>
    )
}



export default Usuarios;