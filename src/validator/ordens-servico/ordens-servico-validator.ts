import { z } from 'zod';

export const createOrdemServicoSchema = z.object({
    descricaoProblema: z.string().toLowerCase().min(5, "descrição deve ter pelo menos 5 caracteres"),
    observacao: z.string().toLowerCase().optional(),
    veiculoId:z.preprocess(
        (value) => value === "" ? undefined : value,
        z.coerce.number({ error:"Informe um veículo valido para ordem de servico."}).
        int({error:"O ID do veículo deve ser um número inteiro"}).
        positive("O veículo informado é inválido"))
})
export const idOrdensServicoSchema = z.preprocess((value) => value === "" ? undefined : value,
    z.coerce.number({ error: "ID inválido" }).
        int("O ID deve ser um número inteiro").
        positive("O ID deve ser maior que zero")
);
