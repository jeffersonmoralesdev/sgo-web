import { StatusOrdemServico } from "@/src/constants/status-ordem-servico";

export type ListaOrdemServicoDTO = {
    id: number;
    status: StatusOrdemServico;
    criadoEm: string;
    veiculo: {
        placa: string;
        modelo: string;
    };
    cliente: {
        id: number;
        nome: string;
    };
}