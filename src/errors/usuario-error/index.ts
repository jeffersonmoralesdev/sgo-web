export class UsuarioError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "UsuarioError";
    }
}