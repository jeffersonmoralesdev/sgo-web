
import { CreateOrdemServicoRepository, OrdemServicoModel, UpdateStatusOrdemServico } from "@/src/model/ordens-servico/ordens-servico-model";

export interface OrdemServicoRepository {
    /*
    buscarOrdensServico();
    buscarClientePorCpf(cpf: string): Promise< | null>;*/
    buscarOrdemServicoPorId(ordemServicoId: number): Promise<OrdemServicoModel | null>;
    buscarOrdemServicoPorVeiculoId(veiculoId: number): Promise<OrdemServicoModel[]>;
    buscarOrdemServicoPorUsuarioId(usuarioId: number): Promise<OrdemServicoModel[]>;
    existeOrdemServicoAtivaPorVeiculoId(veiculoId: number): Promise<boolean>;
    registrarOrdemServico(ordemServico: CreateOrdemServicoRepository): Promise<OrdemServicoModel>;
    atualizarStatusOrdemServico(atualizaStatusOS:UpdateStatusOrdemServico): Promise<void>;
    
    /*
    deletarCliente(id: number): Promise<void>;
    contarTotalClientes(): Promise<number>;*/
}