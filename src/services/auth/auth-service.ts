import { LoginInput, LoginResponse } from "@/src/model/auth/auth-model";
import { UsuarioRepository } from "@/src/repositories/usuario/usuario-repository";
import { comparePassword } from "@/src/utils/senha-hash";

export class AuthService {
    constructor(private readonly usuarioRepository: UsuarioRepository) { }

    async login(data: LoginInput): Promise<LoginResponse> {
        const usuario = await this.usuarioRepository.buscarUsuarioPorEmail(data.email);
        if (!usuario) throw new Error("Email ou senha inválidos");

        const senhaValidada = await comparePassword(data.senha, usuario.senhaHash);
        if (!senhaValidada) throw new Error("Email ou senha inválidos");

        return {
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email,
            perfil: usuario.perfil
        };
    }
}