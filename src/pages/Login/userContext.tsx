import React, { createContext, useState } from "react";
import { Buffer } from "buffer";

interface Cv {
  nombre: string;
  tipo: string;
  contenido: string
}

interface Usuario {
  nombre: string;
  email: string;
  password: string;
  roles: string[];
  cv: Cv | null
}

interface UserContextProps {
  usuario: Usuario | null;
  iniciarSesion: (usuario: Usuario) => void;
  cerrarSesion: () => void;
}

export const UserContext = createContext<UserContextProps>({
  usuario: null,
  iniciarSesion: () => {},
  cerrarSesion: () => {},
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [usuario, setUsuario] = useState<Usuario | null>(() => {
    const usuarioGuardado = sessionStorage.getItem("usuario");
    return usuarioGuardado ? JSON.parse(usuarioGuardado) : null;
  });

  const iniciarSesion = (usuario: Usuario) => {
    // Clonamos y transformamos el contenido del CV a base64 si existe
    const usuarioFormateado: Usuario = {
      ...usuario,
      cv: usuario.cv
        ? {
            ...usuario.cv,
            contenido: Buffer.from(usuario.cv.contenido).toString('base64'),
          }
        : null,
    };
  
    setUsuario(usuarioFormateado);
    sessionStorage.setItem("usuario", JSON.stringify(usuarioFormateado));
  };

  const cerrarSesion = () => {
    setUsuario(null);
    sessionStorage.removeItem("usuario");
    sessionStorage.removeItem("token")
  };

  return (
    <UserContext.Provider value={{ usuario, iniciarSesion, cerrarSesion }}>
      {children}
    </UserContext.Provider>
  );
};
