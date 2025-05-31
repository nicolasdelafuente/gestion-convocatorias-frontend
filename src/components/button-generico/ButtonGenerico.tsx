import React, { MouseEventHandler } from "react"
import { Button } from "react-bootstrap"
import './buttons.css'

interface Props {
    nombre: string;
    className?: string;
    type?: 'button' | 'submit' | 'reset';
    accion?: MouseEventHandler;
    iconoDelBoton?: React.ReactNode;
    iconoDelBotonIzq?: React.ReactNode;
    onClick?: () => void;
}

const ButtonGenerico = ({nombre, className, type, accion, iconoDelBoton, iconoDelBotonIzq}: Props) => {
    return (
        <Button
            variant="primary"
            className={className}
            type={type}
            onClick={accion}>
            {iconoDelBotonIzq} {nombre} {iconoDelBoton}
        </Button>
    )
}

export default ButtonGenerico;