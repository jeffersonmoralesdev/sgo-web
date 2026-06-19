import { CreateUsuarioRepositoryInput, UpdateUsuarioRepositoryInput, UsuarioModel, UsuarioResponse } from "@/src/model/usuario/usuario-model";

export interface UsuarioRepository {
    listarTodosUsuarios(busca?:string):Promise<UsuarioResponse[]>;
    listarUsuariosAtivos():Promise<UsuarioResponse[]>;
    buscarUsuarioPorId(id:number):Promise<UsuarioModel | null>;
    buscarUsuarioPorEmail(email:string):Promise<UsuarioModel|null>
    registrarUsuario(usuario:CreateUsuarioRepositoryInput):Promise<UsuarioModel>
    atualizarUsuario(id:number, usuario:UpdateUsuarioRepositoryInput):Promise<UsuarioModel | null>;
    deletarUsuario(id: number): Promise<void>;
}