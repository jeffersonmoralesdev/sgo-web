import { StatusOrdemServico } from "@/src/constants/status-ordem-servico";

export type AtualizaStatusOrdemServicoDTO = {
    id: number;
    usuarioId: number;
    statusAnterior: StatusOrdemServico;
    statusNovo: StatusOrdemServico;
    observacao?: string | null;
}