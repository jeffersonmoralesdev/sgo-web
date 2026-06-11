import { clienteRepository } from "@/src/repositories/cliente";
import { ClienteService } from "./cliente-service";
import { veiculoRepository } from "@/src/repositories/veiculo";

export const clienteService = new ClienteService(clienteRepository, veiculoRepository)