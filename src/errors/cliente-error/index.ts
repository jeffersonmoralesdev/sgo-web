export class ClienteError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "ClienteError";
    }
}