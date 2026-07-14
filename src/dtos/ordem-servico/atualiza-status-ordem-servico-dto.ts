import { StatusOrdemServicoEnum } from "@/src/enums/ordem-servico";


export type AtualizaStatusOrdemServicoDTO = {
    id: number;
    usuarioId: number;
    statusAnterior: StatusOrdemServicoEnum;
    statusNovo: StatusOrdemServicoEnum;
    observacao?: string | null;
}