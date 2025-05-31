import { z } from "zod";

// Max size is 5MB.
const MAX_FILE_SIZE = 5000000;

function checkFileType(file: File) {
    if (file?.name) {
        const fileType = file.name.split(".").pop();
        if (fileType === "docx" || fileType === "pdf") return true;
    }
    return false;
}

export const fileSchema = z.object({
    file: z.any()
        .refine((file: File) => file?.size !== 0, { message: "El archivo es obligatorio" })
        .refine((file: File) => file?.size <= MAX_FILE_SIZE, { message: "El archivo es muy grande" })
        .refine((file: File) => checkFileType(file), { message: "El archivo debe ser un PDF o DOCX" })
});

export type FileValues = z.infer<typeof fileSchema>;