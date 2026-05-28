import { DrizzleUsuarioRepository } from "./drizzle-usuario-repository";
import { UsuarioRepository } from "./usuario-repository";

export const usuarioRepository:UsuarioRepository = new DrizzleUsuarioRepository()