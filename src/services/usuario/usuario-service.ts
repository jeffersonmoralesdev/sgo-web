
import { CreateUsuarioInput, CreateUsuarioRepositoryInput, UpdateUsuarioInput, UpdateUsuarioRepositoryInput, UsuarioModel } from "@/src/model/usuario/usuario-model";
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
        const usuarioExistente = await this.buscarUsuarioPorEmail(usuario.email);
        if(usuarioExistente) throw new Error("Já existe um usuário com este email.");
        
        const senhaHash = await createPasswordHash(usuario.senha);
        
        const novoUsuario: CreateUsuarioRepositoryInput = {
            nome: usuario.nome,
            email: usuario.email,
            senhaHash,
            perfil: usuario.perfil
        };
        const usuarioCriado = await this.usuarioRepository.registrarUsuario(novoUsuario);
        
        return usuarioCriado;
    }

    async atualizarUsuario(id: number, usuario: Partial<UpdateUsuarioInput>):Promise<UsuarioModel> {
        const dadosAtualizacao:UpdateUsuarioRepositoryInput = {};

        const usuarioExistente = await this.buscarUsuarioPorId(id);
        if(!usuarioExistente) throw new Error("Usuário não encontrado.");

        if (usuario.email && usuario.email !== usuarioExistente.email) {
            const usuarioComEmail = await this.buscarUsuarioPorEmail(usuario.email);
            if (usuarioComEmail) throw new Error("Já existe um usuário com este email.");
            dadosAtualizacao.email = usuario.email;
        }

        if (usuario.nome) {
            dadosAtualizacao.nome = usuario.nome;
        }

        if (usuario.senha) {
            dadosAtualizacao.senhaHash = await createPasswordHash(usuario.senha);
        }

        if (usuario.perfil) {
            dadosAtualizacao.perfil = usuario.perfil;
        }
        
        if (usuario.ativo !== undefined) {
            dadosAtualizacao.ativo = usuario.ativo;
        }

        const usuarioAtualizado = await this.usuarioRepository.atualizarUsuario(id, dadosAtualizacao);
        if (!usuarioAtualizado) throw new Error("Não foi possível atualizar o usuário.");
        
        return usuarioAtualizado;
    }

    async deletarUsuario(id: number): Promise<boolean> {
        const usuarioExistente = await this.buscarUsuarioPorId(id);
        if (!usuarioExistente) throw new Error("Usuário não encontrado.");

        return await this.usuarioRepository.deletarUsuario(id);
    }
}