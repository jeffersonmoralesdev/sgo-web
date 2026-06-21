export class VeiculoError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "VeiculoError";
    }
}