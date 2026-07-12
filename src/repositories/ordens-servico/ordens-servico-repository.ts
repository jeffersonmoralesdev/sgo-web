
import { CreateOrdemServicoRepository, ListagemOrdemServico, OrdemServicoModel, UpdateStatusOrdemServico } from "@/src/model/ordens-servico/ordens-servico-model";

export interface OrdemServicoRepository {
    listarOrdensServico(busca?: string): Promise<ListagemOrdemServico[]>;
    buscarOrdemServicoPorId(ordemServicoId: number): Promise<OrdemServicoModel | null>;
    buscarOrdemServicoPorVeiculoId(veiculoId: number): Promise<OrdemServicoModel[]>;
    buscarOrdemServicoPorUsuarioId(usuarioId: number): Promise<OrdemServicoModel[]>;
    existeOrdemServicoAtivaPorVeiculoId(veiculoId: number): Promise<boolean>;
    registrarOrdemServico(ordemServico: CreateOrdemServicoRepository): Promise<OrdemServicoModel>;
    atualizarStatusOrdemServico(atualizaStatusOS: UpdateStatusOrdemServico): Promise<void>;
}