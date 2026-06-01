export type PerfilUsuario = 'ADMIN' | 'OPERADOR';

export type UsuarioModel = {
    id: number;
    nome: string;
    email: string;
    senhaHash: string;
    perfil: PerfilUsuario;
    ativo: boolean;
    criadoEm: string;
    atualizadoEm: string;
}

export type CreateUsuarioInput = {
    nome: string;
    email: string;
    senha: string;
    perfil: PerfilUsuario;
}

export type CreateUsuarioRepositoryInput = {
  nome: string;
  email: string;
  senhaHash: string;
  perfil: PerfilUsuario;
};

export type UpdateUsuarioInput = Partial<{
    nome: string;
    email: string;
    senha: string;
    perfil: PerfilUsuario;
    ativo: boolean;
}>

export type UpdateUsuarioRepositoryInput = Partial<{
    nome: string;
    email: string;
    senhaHash: string;
    perfil: PerfilUsuario;
    ativo: boolean;
}>

export type UsuarioResponse = {
  id: number;
  nome: string;
  email: string;
  perfil: string;
  ativo: boolean;
};



 