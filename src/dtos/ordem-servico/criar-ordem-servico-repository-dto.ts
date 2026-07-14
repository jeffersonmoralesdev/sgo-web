import { StatusOrdemServicoEnum } from "@/src/enums/ordem-servico";

export type CriarOrdemServicoRepositoryDTO = {
    status: StatusOrdemServicoEnum;
    descricaoProblema: string;
    observacao?: string | null;
    valorTotal: string;
    usuarioId: number;
    clienteId: number;
    veiculoId: number;
}