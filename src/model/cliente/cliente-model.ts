export type ClienteModel = {
    id: number;
    nome: string;
    cpf: string;
    telefone: string;
    email: string;
    ativo: boolean;
    criadoEm: string;
    atualizadoEm: string;
}

export type CreateClienteInput = {
    nome: string;
    cpf: string;
    telefone: string;
    email: string;
}

export type UpdateClienteInput = Partial<{
    nome: string;
    cpf: string;
    telefone: string;
    email: string;
    ativo: boolean;
}>