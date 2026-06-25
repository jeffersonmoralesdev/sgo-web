import { StatusOrdemServico } from "@/src/constants/status-ordem-servico";

export type OrdemServicoModel = {
    id: number;
    status: StatusOrdemServico;
    descricaoProblema: string;
    observacao: string | null;
    valorTotal: string;
    criadoEm: string;
    atualizadoEm: string;
    usuarioId: number;
    clienteId: number;
    veiculoId: number;
}

export type CreateOrdemServicoInput = {
    descricaoProblema: string;
    observacao?: string | null;
    veiculoId: number;
}

export type CreateOrdemServicoRepository = {
    status: StatusOrdemServico;
    descricaoProblema: string;
    observacao?: string | null;
    valorTotal: string;
    usuarioId: number;
    clienteId: number;
    veiculoId: number;
}

export type UpdateStatusOrdemServico = {
  id: number;
  usuarioId: number;
  statusAnterior: StatusOrdemServico;
  statusNovo: StatusOrdemServico;
  observacao?: string | null;
};