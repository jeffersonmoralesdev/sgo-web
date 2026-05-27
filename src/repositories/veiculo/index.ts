
import { DrizzleVeiculoRepository } from "./drizzle-veiculo-repository";
import { VeiculoRepository } from "./veiculo-repository";

export const veiculoRepository:VeiculoRepository = new DrizzleVeiculoRepository();


