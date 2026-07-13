import { CriarOrdemServicoDTO, ListaOrdemServicoDTO } from "@/src/dtos/ordem-servico";
import { OrdemServicoError } from "@/src/errors/ordem-servico-error";
import { OrdemServicoModel } from "@/src/model/ordens-servico/ordens-servico-model";
import { OrdemServicoRepository } from "@/src/repositories/ordens-servico/ordens-servico-repository";
import { VeiculoRepository } from "@/src/repositories/veiculo/veiculo-repository";

export class OrdemServicoService {
    constructor(
        private readonly ordemServicoRepository: OrdemServicoRepository,
        private readonly veiculoRepository: VeiculoRepository,
    ) { }
    async listarOrdensServico(busca?: string): Promise<ListaOrdemServicoDTO[]> {
        return await this.ordemServicoRepository.listarOrdensServico(busca);
    }

    async registrarOrdemServico(ordemServico: CriarOrdemServicoDTO, sessaoId: number): Promise<OrdemServicoModel> {
        const veiculo = await this.veiculoRepository.buscarVeiculoComClientePorId(ordemServico.veiculoId);
        if (!veiculo) throw new OrdemServicoError("O veículo selecionado não foi encontrado. Atualize a página e tente novamente.");
        if (!veiculo.cliente.ativo) throw new OrdemServicoError("Não é possível criar a ordem de serviço porque o cliente vinculado ao veículo está inativo. Ative o cadastro do cliente e tente novamente.");

        const ordemServicoAtiva = await this.ordemServicoRepository.existeOrdemServicoAtivaPorVeiculoId(veiculo.id);
        if (ordemServicoAtiva) throw new OrdemServicoError("Este veículo já possui uma ordem de serviço ativa. Finalize ou cancele a OS atual antes de abrir uma nova.");

        return await this.ordemServicoRepository.registrarOrdemServico({
            status: "AGUARDANDO_AVALIACAO",
            descricaoProblema: ordemServico.descricaoProblema,
            observacao: ordemServico.observacao?.trim() || null,
            valorTotal: "0.00",
            usuarioId: sessaoId,
            veiculoId: veiculo.id,
            clienteId: veiculo.cliente.id,
        });
    }

    async buscarOrdemServicoPorId(id: number): Promise<OrdemServicoModel> {
        const ordemServico = await this.ordemServicoRepository.buscarOrdemServicoPorId(id);
        if (!ordemServico) throw new OrdemServicoError("Ordem de serviço não encontrada. Verifique os dados e tente novamente.")
        return ordemServico;
    }

    async iniciarAvaliacaoOrdemServico(ordemServicoId: number, usuarioId: number): Promise<void> {
        const ordemServico = await this.buscarOrdemServicoPorId(ordemServicoId);

        if (ordemServico.status !== "AGUARDANDO_AVALIACAO") throw new OrdemServicoError("A avaliação só pode ser iniciada quando a ordem de serviço estiver aguardando avaliação.");

        await this.ordemServicoRepository.atualizarStatusOrdemServico(
            {
                id: ordemServico.id,
                statusNovo: "EM_AVALIACAO",
                usuarioId: usuarioId,
                statusAnterior: ordemServico.status,
                observacao: "Avaliação da ordem de serviço iniciada."
            }
        );

    }

    async finalizarAvaliacaoOrdemServico(ordemServicoId: number, usuarioId: number): Promise<void> {
        const ordemServico = await this.buscarOrdemServicoPorId(ordemServicoId);

        if (ordemServico.status !== "EM_AVALIACAO") throw new OrdemServicoError("A avaliação só pode ser finalizada quando a ordem de serviço estiver em avaliação.");

        /* PENDENCIA
        const possuiItens =  await this.ordemServcoItensRepository.existeItensPorOrdemServicoId(ordemServico.id);
        if(!possuiItens)throw new OrdemServicoError("Não é possível finalizar a avaliação sem adicionar pelo menos um item de serviço ou peça.")*/

        await this.ordemServicoRepository.atualizarStatusOrdemServico({
            id: ordemServico.id,
            statusNovo: "AGUARDANDO_APROVACAO",
            usuarioId: usuarioId,
            statusAnterior: ordemServico.status,
            observacao: "Ordem de serviço aguardando aprovação."

        });

    }
}
