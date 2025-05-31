import { z } from 'zod';

let userEmail: string
export const getUserEmailForZod = (mail: string) => {
    userEmail = mail
}

export const equipoDeTrabajoSchema = z.object({
    invitados: z.array(z.object({
        invitado: z.string()
            .min(1, { message: "Debe proveer una direccion de mail"})
            .email("Debe proveer una direccion de mail valida")
    })).refine((invitados) => {
        const mails = invitados.map(i => i.invitado.toLowerCase())
        const mailsUnicos = new Set(mails)
        return mailsUnicos.size === mails.length
    }, {
        message: "No se permiten mails repetidos"
    }).refine((invitados) => {
        const mails = invitados.map(i => i.invitado)
        if (userEmail)
            return !mails.includes(userEmail)
    }, {
        message: "No debe incluir su propio mail en la lista"
    })
})

export type EquipoDeTrabajoValues = z.infer<typeof equipoDeTrabajoSchema>;