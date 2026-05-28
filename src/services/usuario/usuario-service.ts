
import { CreateUsuarioInput, UpdateUsuarioInput, UsuarioModel } from "@/src/model/usuario/usuario-model";
import { UsuarioRepository } from "@/src/repositories/usuario/usuario-repository";
import { createPasswordHash } from "@/src/utils/senha-hash";

export class UsuarioService {
    constructor(private readonly usuarioRepository: UsuarioRepository) {}
    
    async listarTodosUsuarios() {
        return await this.usuarioRepository.listarTodosUsuarios();
    };

    async listarUsuariosAtivos() {
        return await this.usuarioRepository.listarUsuariosAtivos();
    };

    async buscarUsuarioPorId(id: number) {
        return await this.usuarioRepository.buscarUsuarioPorId(id);
    };

    async buscarUsuarioPorEmail(email: string) {
        return await this.usuarioRepository.buscarUsuarioPorEmail(email);
    };

    async registrarUsuario(usuario: CreateUsuarioInput):Promise<UsuarioModel> {
        const emailNormalizado =  usuario.email.trim().toLowerCase();
        
        const usuarioExistente = await this.buscarUsuarioPorEmail(usuario.email);
        if(usuarioExistente) throw new Error("Já existe um usuário com este email.");

        const senhaHash = await createPasswordHash(usuario.senha);
        
        const usuarioCriado = await this.usuarioRepository.registrarUsuario({
            nome: usuario.nome,
            email: emailNormalizado,
            senhaHash,
            perfil: usuario.perfil
        });
        
        return usuarioCriado;
    }

    async atualizarUsuario(id: number, usuario: Partial<UpdateUsuarioInput>):Promise<UsuarioModel> {
        const usuarioExistente = await this.buscarUsuarioPorId(id);
        if(!usuarioExistente) throw new Error("Usuário não encontrado.");

        if (usuario.email && usuario.email !== usuarioExistente.email) {
            const emailNormalizado = usuario.email.trim().toLowerCase();
            const usuarioComEmail = await this.buscarUsuarioPorEmail(emailNormalizado);
            if (usuarioComEmail) throw new Error("Já existe um usuário com este email.");
            usuarioExistente.email = emailNormalizado;
        }

        if (usuario.nome) {
            usuarioExistente.nome = usuario.nome;
        }

        if (usuario.senha) {
            usuarioExistente.senhaHash = await createPasswordHash(usuario.senha);
        }

        if (usuario.perfil) {
            usuarioExistente.perfil = usuario.perfil;
        }
        if (usuario.ativo !== undefined) {
            usuarioExistente.ativo = usuario.ativo;
        }

        const usuarioAtualizado = await this.usuarioRepository.atualizarUsuario(id, {
            nome: usuarioExistente.nome,
            email: usuarioExistente.email,
            senhaHash: usuarioExistente.senhaHash,
            perfil: usuarioExistente.perfil,    
            ativo: usuarioExistente.ativo
        });

        if (!usuarioAtualizado) throw new Error("Não foi possível atualizar o usuário.");
        return usuarioAtualizado;
    }

    async deletarUsuario(id: number): Promise<boolean> {
        const usuarioExistente = await this.buscarUsuarioPorId(id);
        if (!usuarioExistente) throw new Error("Usuário não encontrado.");

        return await this.usuarioRepository.deletarUsuario(id);
    }
}