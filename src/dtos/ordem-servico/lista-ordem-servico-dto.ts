import { StatusOrdemServicoEnum } from "@/src/enums/ordem-servico";

export type ListaOrdemServicoDTO = {
    id: number;
    status: StatusOrdemServicoEnum;
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