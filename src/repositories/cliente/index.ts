import { ClienteRepository } from "./cliente-repository";
import { DrizzleClienteRepository } from "./drizzle-cliente-repository";

export const clienteRepository:ClienteRepository = new DrizzleClienteRepository();