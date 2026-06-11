import { z } from 'zod';
import { verificarCpf } from "@/src/utils/validar-cpf";

export const createClienteSchema = z.object({
    nome: z.string().min(3, "nome deve ter pelo menos 3 caracteres"),
    cpf: z.string()
        .transform((cpf) => cpf.replace(/\D/g, ""))
        .refine((cpf) => cpf.length === 11, "CPF deve conter exatamente 11 números")
        .refine((cpf) => verificarCpf(cpf), "CPF inválido"),
    telefone: z.string()
        .transform((telefone) => telefone.replace(/\D/g, ""))
        .refine((telefone) => telefone.length >= 10 && telefone.length <= 11, "Telefone deve conter entre 10 e 11 números"),
    email: z.email("Email inválido"),
})
export const idClienteSchema = z.preprocess((value) => value === "" ? undefined : value,
    z.coerce.number({ error: "ID inválido" }).
        int("O ID deve ser um número inteiro").
        positive("O ID deve ser maior que zero")
);
export const updateClienteSchema = createClienteSchema.partial();