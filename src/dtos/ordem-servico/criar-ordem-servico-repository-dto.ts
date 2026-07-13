import { StatusOrdemServico } from "@/src/constants/status-ordem-servico";

export type CriarOrdemServicoRepositoryDTO = {
    status: StatusOrdemServico;
    descricaoProblema: string;
    observacao?: string | null;
    valorTotal: string;
    usuarioId: number;
    clienteId: number;
    veiculoId: number;
}