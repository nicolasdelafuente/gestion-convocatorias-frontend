/* import { z } from 'zod';

export const nuevoFormatoSchema = z.discriminatedUnion("tipo", [
    z.object({
        nombreDelCampo: z.string().min(1, "El nombre del campo es obligatorio"),
        tipo: z.literal("selector"),
        categorias: z.string().array().nonempty()
    }),
    z.object({
        nombreDelCampo: z.string(),
        tipo: z.literal("texto"),
        maxNumeroDeCaracteres: z.number().positive()
    })
])

export type NuevoFormatoValues = z.infer<typeof nuevoFormatoSchema>
 */

import { z } from 'zod';

export const nuevoFormatoSchema = z.object({
    nombreDelFormato: z.string().min(1, "El nombre del formato es obligatorio"),
    campos: z.array(z.discriminatedUnion('tipo',[
        z.object({
            nombreDelCampo: z.string(),
            tipo: z.literal("selector"),
            opciones: z.array(z.string())
        }),
        z.object({
            nombreDelCampo: z.string().min(1,{
                message: "El nombre del campo es obligatorio"
            }),
            tipo: z.literal("texto"),
            maxNumeroDeCaracteres: z.number()
        })
    ]))
});

export type NuevoFormatoValues = z.infer<typeof nuevoFormatoSchema>;