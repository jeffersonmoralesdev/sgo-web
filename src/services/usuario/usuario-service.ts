
import { CreateUsuarioInput, CreateUsuarioRepositoryInput, UpdateUsuarioInput, UpdateUsuarioRepositoryInput, UsuarioModel, UsuarioResponse } from "@/src/model/usuario/usuario-model";
import { UsuarioRepository } from "@/src/repositories/usuario/usuario-repository";
import { createPasswordHash } from "@/src/utils/senha-hash";

export class UsuarioService {
    constructor(private readonly usuarioRepository: UsuarioRepository) { }

    private trasnformarUsuarioResponse(usuario: UsuarioModel): UsuarioResponse {
        return {
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email,
            perfil: usuario.perfil,
            ativo: usuario.ativo,
        };
    }

    async listarTodosUsuarios(): Promise<UsuarioResponse[]> {
        return await this.usuarioRepository.listarTodosUsuarios();
    };

    async listarUsuariosAtivos(): Promise<UsuarioResponse[]> {
        return await this.usuarioRepository.listarUsuariosAtivos();
    };

    async buscarUsuarioPorId(id: number): Promise<UsuarioResponse | null> {
        const usuario = await this.usuarioRepository.buscarUsuarioPorId(id);
        if (!usuario) return null
        return this.trasnformarUsuarioResponse(usuario);
    };

    async buscarUsuarioPorEmail(email: string): Promise<UsuarioResponse | null> {
        const usuario = await this.usuarioRepository.buscarUsuarioPorEmail(email);
        if (!usuario) return null
        return this.trasnformarUsuarioResponse(usuario);
    };

    async registrarUsuario(usuario: CreateUsuarioInput): Promise<UsuarioResponse> {
        const usuarioExistente = await this.buscarUsuarioPorEmail(usuario.email);
        if (usuarioExistente) throw new Error("Já existe um usuário com este email.");

        const senhaHash = await createPasswordHash(usuario.senha);

        const novoUsuario: CreateUsuarioRepositoryInput = {
            nome: usuario.nome,
            email: usuario.email,
            senhaHash,
            perfil: usuario.perfil
        };
        const usuarioCriado = await this.usuarioRepository.registrarUsuario(novoUsuario);

        return this.trasnformarUsuarioResponse(usuarioCriado);
    }

    async atualizarUsuario(id: number, usuario: Partial<UpdateUsuarioInput>): Promise<UsuarioResponse> {
        const dadosAtualizacao: UpdateUsuarioRepositoryInput = {};

        const usuarioExistente = await this.buscarUsuarioPorId(id);
        if (!usuarioExistente) throw new Error("Usuário não encontrado.");

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

        return this.trasnformarUsuarioResponse(usuarioAtualizado);
    }

    async deletarUsuario(id: number): Promise<boolean> {
        const usuarioExistente = await this.buscarUsuarioPorId(id);
        if (!usuarioExistente) throw new Error("Usuário não encontrado.");

        return await this.usuarioRepository.deletarUsuario(id);
    }
}