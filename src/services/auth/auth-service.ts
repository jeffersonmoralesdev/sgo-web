import { AuthError } from "@/src/errors/auth-error";
import { LoginInput, LoginResponse } from "@/src/model/auth/auth-model";
import { UsuarioRepository } from "@/src/repositories/usuario/usuario-repository";
import { comparePassword } from "@/src/utils/senha-hash";

export class AuthService {
    constructor(private readonly usuarioRepository: UsuarioRepository) { }

    async login(data: LoginInput): Promise<LoginResponse> {
        const usuario = await this.usuarioRepository.buscarUsuarioPorEmail(data.email);
        if (!usuario) throw new AuthError();

        const senhaValidada = await comparePassword(data.senha, usuario.senhaHash);
        if (!senhaValidada) throw new AuthError();

        return {
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email,
            perfil: usuario.perfil
        };
    }
}