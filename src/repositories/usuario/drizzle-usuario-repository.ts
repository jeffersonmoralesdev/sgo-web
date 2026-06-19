import { UsuarioModel, CreateUsuarioRepositoryInput, UpdateUsuarioRepositoryInput, UsuarioResponse } from "@/src/model/usuario/usuario-model";
import { UsuarioRepository } from "./usuario-repository";
import { usuarios } from "@/src/db/drizzle/schema";
import { db } from "@/src/db/drizzle";
import { asc, eq, like, or } from "drizzle-orm";

export class DrizzleUsuarioRepository implements UsuarioRepository {

    async listarTodosUsuarios(busca?: string):
        Promise<UsuarioResponse[]> {
        const camposUsuario = {
            id: usuarios.id,
            nome: usuarios.nome,
            email: usuarios.email,
            perfil: usuarios.perfil,
            ativo: usuarios.ativo,
        }
        const buscaLimpa = busca?.trim();
        if (!buscaLimpa) {
            return await db.select(camposUsuario).from(usuarios).orderBy(asc(usuarios.nome));
        }

        const buscaLike = `%${buscaLimpa}%`;
        const filtros = [
            like(usuarios.nome, buscaLike),
            like(usuarios.email, buscaLike),
            like(usuarios.perfil, buscaLike)
        ]

        return await db.select(camposUsuario).from(usuarios).where(or(...filtros)).orderBy(asc(usuarios.nome));
    }

    async listarUsuariosAtivos(): Promise<UsuarioResponse[]> {
        return await db.select({
            id: usuarios.id,
            nome: usuarios.nome,
            email: usuarios.email,
            perfil: usuarios.perfil,
            ativo: usuarios.ativo,
        }).from(usuarios).where(eq(usuarios.ativo, true));
    }

    async buscarUsuarioPorId(id: number): Promise<UsuarioModel | null> {
        const [usuario] = await db.select().from(usuarios).where(eq(usuarios.id, id)).limit(1);
        return usuario ?? null;
    }

    async buscarUsuarioPorEmail(email: string): Promise<UsuarioModel | null> {
        const [usuario] = await db.select().from(usuarios).where(eq(usuarios.email, email)).limit(1);
        return usuario ?? null;
    }

    async registrarUsuario(usuario: CreateUsuarioRepositoryInput): Promise<UsuarioModel> {
        const result = await db.insert(usuarios).values(usuario).$returningId();

        const id = result[0]?.id;
        if (!id) throw new Error("Falha ao concluir o cadastro do usuário.");

        const usuarioCriado = await this.buscarUsuarioPorId(id);
        if (!usuarioCriado) throw new Error("Cadastro realizado, mas não foi possível carregar o usuário criado.");

        return usuarioCriado;
    }


    async atualizarUsuario(id: number, usuario: UpdateUsuarioRepositoryInput): Promise<UsuarioModel | null> {
        await db.update(usuarios).set(usuario).where(eq(usuarios.id, id));
        return await this.buscarUsuarioPorId(id);
    }

    async deletarUsuario(id: number): Promise<void> {
        await db.delete(usuarios).where(eq(usuarios.id, id));
    }

}