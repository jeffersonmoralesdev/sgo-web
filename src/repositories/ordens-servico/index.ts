
import { DrizzleOrdemServicoRepository } from "./drizzle-ordens-servico-repository";
import { OrdemServicoRepository } from "./ordens-servico-repository";

export const ordemServicoRepository: OrdemServicoRepository = new DrizzleOrdemServicoRepository();