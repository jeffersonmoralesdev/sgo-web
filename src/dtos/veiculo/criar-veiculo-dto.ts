export type CriarVeiculoDTO = {
    placa: string;
    marca: string;
    modelo: string;
    ano: number;
    cor?: string | null;
    quilometragem: number;
    clienteId: number;
}

