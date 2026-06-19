import z from "zod";

export const createUsuarioSchema = z.object({
    nome: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
    email: z.email("Email inválido").trim().toLowerCase(),
    senha: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
    perfil:z.string().trim().
        transform((perfil) => perfil.toUpperCase()).
        pipe(z.enum(['ADMIN', 'OPERADOR'], "Perfil deve ser 'ADMIN' ou 'OPERADOR'")) 
});

const senhaOpcionalUpdateSchema = z.preprocess(
    (value) => value === "" ? undefined : value,
    z.string().min(6, "A senha deve ter pelo menos 6 caracteres").optional()
);

export const updateUsuarioInputSchema = z.object({
    nome:z.string().min(3, "O nome deve ter pelo menos 3 caracteres").optional(),
    email: z.email("Email inválido").trim().toLowerCase().optional(),
    senha:senhaOpcionalUpdateSchema,
    perfil:z.string().trim().
        transform((perfil)=> perfil.toUpperCase()).
        pipe(z.enum(["ADMIN","OPERADOR"], "Perfil deve ser 'ADMIN' ou 'OPERADOR'")).
        optional(),
    ativo: z.boolean().optional()
}).refine((data)=> Object.keys(data).length > 0, "Pelo menos um campo deve ser fornecido para atualização");

export const idUsuarioSchema = z.preprocess((value) => value === "" ? undefined : value,
    z.coerce.number({ error: "ID inválido" }).
        int("O ID deve ser um número inteiro").
        positive("O ID deve ser maior que zero")
);

