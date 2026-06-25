export class OrdemServicoError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "OrdemServicoError";
    }
}