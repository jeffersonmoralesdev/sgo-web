export type LoginInput = {
    email: string;
    senha: string;
};

export type LoginResponse = {
    id: number;
    nome: string;
    email: string;
    perfil: string;
};