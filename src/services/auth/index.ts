import { usuarioRepository } from "@/src/repositories/usuario";
import { AuthService } from "./auth-service";

export const authService = new AuthService(usuarioRepository);