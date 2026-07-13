export type VeiculoComClienteDTO = {
    id: number;
    placa: string;
    modelo: string;
    cliente: {
        id: number;
        nome: string;
        ativo: boolean;
    }
} | null