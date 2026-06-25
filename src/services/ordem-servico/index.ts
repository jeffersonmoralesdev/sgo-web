import { ordemServicoRepository } from "@/src/repositories/ordens-servico";
import { OrdemServicoService } from "./ordem-servico-service";
import { veiculoRepository } from "@/src/repositories/veiculo";

export const ordensServicoService = new OrdemServicoService(ordemServicoRepository, veiculoRepository );