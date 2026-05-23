import { clienteRepository } from "@/src/repositories/cliente";
import { ClienteService } from "./cliente-service";

export const clienteService = new ClienteService(clienteRepository)