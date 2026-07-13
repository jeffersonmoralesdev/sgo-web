import { veiculoRepository } from "@/src/repositories/veiculo";
import { VeiculoService } from "./veiculo-service";
import { clienteRepository } from "@/src/repositories/cliente";
import { ordemServicoRepository } from "@/src/repositories/ordens-servico";


export const  veiculoService = new VeiculoService(veiculoRepository,clienteRepository, ordemServicoRepository)