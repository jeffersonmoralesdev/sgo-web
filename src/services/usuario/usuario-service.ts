
import { UsuarioError } from "@/src/errors/usuario-error";
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

    async listarTodosUsuarios(busca?: string): Promise<UsuarioResponse[]> {
        return await this.usuarioRepository.listarTodosUsuarios(busca);
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
        if (usuarioExistente) throw new UsuarioError("Já existe um usuário com este email.");

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
        if (!usuarioExistente) throw new UsuarioError("Usuário não encontrado, verifique os dados e tente novamente.");

        if (usuario.email && usuario.email !== usuarioExistente.email) {
            const usuarioComEmail = await this.buscarUsuarioPorEmail(usuario.email);
            if (usuarioComEmail) throw new UsuarioError("Já existe um usuário cadastrado com este email.");
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
        if (!usuarioAtualizado) throw new UsuarioError("Não foi possível atualizar o usuário, tente novamente em instantes.");

        return this.trasnformarUsuarioResponse(usuarioAtualizado);
    }

    async deletarUsuario(id: number): Promise<boolean> {
        const usuarioExistente = await this.buscarUsuarioPorId(id);
        if (!usuarioExistente) throw new UsuarioError("Usuário não encontrado, verifique os dados e tente novamente.");

        //PENDENCIA
        /*const ordemSevicoVinculado = await this.ordemServicoRepository.buscarOrdenServicoPorUsuarioId(usuarioExistente.id);
        if (ordemSevicoVinculado.length > 0) throw new UsuarioError("Não é possível excluir este usuário, ele esta vinculado a uma ou mais ordens de serviços.");
        
        const historicoStatusOsVinculado = await this.historicoStatusOsRepository.buscarHistoricoStatusOsPorUsuarioId(usuarioExistente.id);
        if (historicoStatusOsVinculado.length > 0) throw new UsuarioError("Não é possível excluir este usuário, ele esta vinculado a um ou mais historico status de ordem de serviço.");*/

        await this.usuarioRepository.deletarUsuario(id);
        return true
    }

    async alternarStatusUsuario(id: number): Promise<UsuarioResponse> {
        const usuarioExistente = await this.buscarUsuarioPorId(id);
        if (!usuarioExistente) throw new UsuarioError("Usuário não encontrado, verifique os dados e tente novamente.")

        const novoStatus = !usuarioExistente.ativo
        return await this.atualizarUsuario(id, { ativo: novoStatus })
    };
}