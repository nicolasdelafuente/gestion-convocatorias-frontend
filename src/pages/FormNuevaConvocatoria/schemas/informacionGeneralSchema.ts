import dayjs from 'dayjs';
import { z } from 'zod';

export const informacionGeneralSchema = z.object({
    titulo: z.string().min(1, "El titulo es obligatorio"),
    descripcion: z.string().min(1, "La descripcion es obligatoria"),
    fechaInicio: z.date({
        required_error: "La fecha de inicio es requerida",
    }).refine((fecha) => dayjs().subtract(1, 'day') < dayjs(fecha), {message: "La fecha de inicio debe ser mayor a la fecha actual"}),
    fechaFin: z.date({
        required_error: "La fecha de fin es requerida",
    }).refine((fecha) => dayjs() <= dayjs(fecha), {message: "La fecha de fin debe ser mayor a la fecha de inicio"}),
})

export type InformacionGeneralValues = z.infer<typeof informacionGeneralSchema>;