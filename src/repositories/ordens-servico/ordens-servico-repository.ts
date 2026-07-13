
import { CriarOrdemServicoRepositoryDTO, ListaOrdemServicoDTO, AtualizaStatusOrdemServicoDTO } from "@/src/dtos/ordem-servico";

import { OrdemServicoModel } from "@/src/model/ordens-servico/ordens-servico-model";

export interface OrdemServicoRepository {
    listarOrdensServico(busca?: string): Promise<ListaOrdemServicoDTO[]>;
    buscarOrdemServicoPorId(ordemServicoId: number): Promise<OrdemServicoModel | null>;
    buscarOrdemServicoPorVeiculoId(veiculoId: number): Promise<OrdemServicoModel[]>;
    buscarOrdemServicoPorUsuarioId(usuarioId: number): Promise<OrdemServicoModel[]>;
    existeOrdemServicoAtivaPorVeiculoId(veiculoId: number): Promise<boolean>;
    registrarOrdemServico(ordemServico: CriarOrdemServicoRepositoryDTO): Promise<OrdemServicoModel>;
    atualizarStatusOrdemServico(atualizaStatusOS: AtualizaStatusOrdemServicoDTO): Promise<void>;
}