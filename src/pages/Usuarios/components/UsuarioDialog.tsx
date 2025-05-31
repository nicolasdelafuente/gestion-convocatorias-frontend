import React, { useEffect, useState } from "react";
import { UsuarioProps } from "../Usuarios";
import { Dialog, DialogContent, DialogTitle, DialogActions, IconButton, FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import { CustomButton } from "../../../components/CustomButton/CustomButtons";
import { updateRoles } from "../../../api/usuarios.api";
import toast from "react-hot-toast";

interface UsuarioDialogProps {
    usuarioData: UsuarioProps;
    showDialogState: ShowDialogStateProps;
    onRefresh: () => void
}

interface usuario {
    nombre: string;
    email: string
}

interface ShowDialogStateProps {
    showUsuarioDialog: boolean;
    setShowUsuarioDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

const rolesConfig = [
    { label: "Investigador", value: "investigador" },
    { label: "Administrador", value: "admin" },
    { label: "Superadministrador", value: "super_admin" },
];

const UsuarioDialog = ({ usuarioData, showDialogState, onRefresh }: UsuarioDialogProps) => {

    const [checkedList, setCheckedList] = useState<string[]>([]);

    useEffect(() => {
        setCheckedList(usuarioData.roles);
    }, [usuarioData.roles]);

    const handleSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        const isChecked = event.target.checked

        if (isChecked) {
            setCheckedList([...checkedList, value])
        } else {
            const filteredList = checkedList.filter((item) => item !== value);
            setCheckedList(filteredList)
        }
    }

    const handleClose = () => {
        showDialogState.setShowUsuarioDialog(false)
    }

    const handleUpdate = async (usuario: usuario, roles: string[]) => {
        if (checkedList.length !== 0) {
            try {
                await updateRoles(usuario.email, roles)
                onRefresh()
            } catch (error) {
                console.error(error);
            }
            toast.success(`Roles de ${usuario.nombre} actualizados correctamente`)
            handleClose()
        } else {
            toast.error(`Seleccione al menos un rol`)
        }
    }

    return (
        <Dialog
            open={showDialogState.showUsuarioDialog}
            onClose={handleClose}
            fullWidth
            maxWidth="sm"
        >
            <DialogTitle
                sx={{
                    backgroundColor: "#56A42C",
                    color: 'white'
                }}
            >{usuarioData.nombre}</DialogTitle>
            <DialogContent dividers>
                <p className="usuario-email">{usuarioData.email}</p>
                <div className="roles">

                    <p>{usuarioData.roles.join(", ")}</p>

                </div>
                <div className="roles-checkbox">
                    <FormGroup>
                        {rolesConfig.map((role) => (
                            <FormControlLabel
                                key={role.value}
                                control={
                                    <Checkbox
                                        checked={checkedList.includes(role.value)}
                                        onChange={handleSelect}
                                        value={role.value}
                                    />
                                }
                                label={role.label}
                            />
                        ))}
                    </FormGroup>
                </div>
            </DialogContent>
            <DialogActions>
                <CustomButton
                    nombre="Cambiar roles"
                    accion={() => handleUpdate(usuarioData, checkedList)}
                />
            </DialogActions>
        </Dialog>
    )
}

export default UsuarioDialog