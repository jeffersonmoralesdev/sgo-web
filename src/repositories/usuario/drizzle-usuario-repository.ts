import { UsuarioModel, CreateUsuarioRepositoryInput, UpdateUsuarioRepositoryInput, UsuarioResponse } from "@/src/model/usuario/usuario-model";
import { UsuarioRepository } from "./usuario-repository";
import { usuarios } from "@/src/db/drizzle/schema";
import { db } from "@/src/db/drizzle";
import { eq } from "drizzle-orm";

export class DrizzleUsuarioRepository implements UsuarioRepository{
    async listarTodosUsuarios(): Promise<UsuarioResponse[]> {
        return await db.select({
            id: usuarios.id,
            nome: usuarios.nome,
            email: usuarios.email,
            perfil: usuarios.perfil,
            ativo: usuarios.ativo,
        }).from(usuarios); 
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
    
    async registrarUsuario(usuario:CreateUsuarioRepositoryInput): Promise<UsuarioModel> {
        const result = await db.insert(usuarios).values(usuario).$returningId();
        
        const id = result[0]?.id;
        if(!id) throw new Error("Usuário criado, mas o ID não foi retornado.");
        
        const usuarioCriado = await this.buscarUsuarioPorId(id);
        if(!usuarioCriado) throw new Error("Usuário criado, mas não foi possível buscá-lo.");

        return usuarioCriado;
    }


    async atualizarUsuario(id: number, usuario: UpdateUsuarioRepositoryInput): Promise<UsuarioModel | null> {
        await db.update(usuarios).set(usuario).where(eq(usuarios.id,id));
        return await this.buscarUsuarioPorId(id);
    }

    async deletarUsuario(id: number): Promise<boolean> {
        await db.delete(usuarios).where(eq(usuarios.id, id));
        return true;
    }

}