import { StatusOrdemServicoEnum } from "@/src/enums/ordem-servico";

export type OrdemServicoModel = {
    id: number;
    status: StatusOrdemServicoEnum;
    descricaoProblema: string;
    observacao: string | null;
    valorTotal: string;
    criadoEm: string;
    atualizadoEm: string;
    usuarioId: number;
    clienteId: number;
    veiculoId: number;
}
