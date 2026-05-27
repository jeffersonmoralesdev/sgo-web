import { veiculoRepository } from "@/src/repositories/veiculo";
import { VeiculoService } from "./veiculo-service";
import { clienteRepository } from "@/src/repositories/cliente";


export const  veiculoService = new VeiculoService(veiculoRepository,clienteRepository)