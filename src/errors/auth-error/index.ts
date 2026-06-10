export class AuthError extends Error {
    constructor(message = "Email ou senha inválidos") {
        super(message);
        this.name = "AuthError";
    }
}