import { usuarioRepository } from "@/src/repositories/usuario";
import { UsuarioService } from "./usuario-service";

export const usuarioService = new UsuarioService(usuarioRepository);