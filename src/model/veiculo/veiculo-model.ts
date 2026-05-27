export type VeiculoModel={
    id: number; 
    placa: string; 
    marca: string; 
    modelo: string; 
    ano: number; 
    cor: string | null; 
    quilometragem: number; 
    criadoEm: string;
    atualizadoEm: string; 
    clienteId: number; 
}

export type CreateVeiculoInput={
    placa: string; 
    marca: string; 
    modelo: string;
    ano: number; 
    cor?: string | null; 
    quilometragem: number;
    clienteId: number;
}

export type UpdateVeiculoInput = Partial<CreateVeiculoInput>