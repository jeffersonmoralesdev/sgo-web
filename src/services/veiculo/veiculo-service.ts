import { AtualizarVeiculoDTO, CriarVeiculoDTO } from "@/src/dtos/veiculo";
import { VeiculoError } from "@/src/errors/veiculo-error";
import { VeiculoModel } from "@/src/model/veiculo/veiculo-model";
import { ClienteRepository } from "@/src/repositories/cliente/cliente-repository";
import { OrdemServicoRepository } from "@/src/repositories/ordens-servico/ordens-servico-repository";
import { VeiculoRepository } from "@/src/repositories/veiculo/veiculo-repository";

export class VeiculoService {
    constructor(
        private readonly veiculoRepository: VeiculoRepository,
        private readonly clienteRepository: ClienteRepository,
        private readonly ordedemServicoRepository: OrdemServicoRepository
    ) { }

    async listarVeiculos(busca?: string): Promise<VeiculoModel[]> {
        return await this.veiculoRepository.listarVeiculos(busca);
    };

    async buscarVeiculoPorId(id: number): Promise<VeiculoModel | null> {
        return await this.veiculoRepository.buscarVeiculoPorId(id);
    };

    async buscarVeiculoPorPlaca(placa: string): Promise<VeiculoModel | null> {
        return await this.veiculoRepository.buscarVeiculoPorPlaca(placa);
    };

    async registrarVeiculo(veiculo: CriarVeiculoDTO): Promise<VeiculoModel> {

        const cliente = await this.clienteRepository.buscarClientePorId(veiculo.clienteId);

        if (!cliente) throw new VeiculoError("Cliente responsavel do veículo não encontrado");
        if (cliente.ativo === false) throw new VeiculoError("Não foi possível registrar o veículo, cliente inativo verifique os dados e tente novamente.");

        const veiculoValidation = await this.veiculoRepository.buscarVeiculoPorPlaca(veiculo.placa);

        if (veiculoValidation) throw new VeiculoError("Já existe um veículo cadastrado com esta placa.");

        const veiculoCadastrado = await this.veiculoRepository.registrarVeiculo(veiculo);

        return veiculoCadastrado
    };

    async atualizarVeiculo(id: number, veiculo: AtualizarVeiculoDTO): Promise<VeiculoModel> {


        const veiculoExistente = await this.buscarVeiculoPorId(id);
        if (!veiculoExistente) throw new VeiculoError("Veículo não encontrado.")

        if (veiculo.placa && veiculo.placa !== veiculoExistente.placa) {
            const placaDuplicada = await this.buscarVeiculoPorPlaca(veiculo.placa);
            if (placaDuplicada) throw new VeiculoError("Já existe um veículo cadastrado com esta placa.");
        }

        if (veiculo.clienteId && veiculo.clienteId !== veiculoExistente.clienteId) {
            const cliente = await this.clienteRepository.buscarClientePorId(veiculo.clienteId);
            if (!cliente) throw new VeiculoError("Não foi possível atualizar veículo, cliente não encontrado.");
            if (!cliente.ativo) throw new VeiculoError("Não foi possível atualizar veículo, cliente inativo verifique os dados e tente novamente.");
        }

        const veiculoAtualizado = await this.veiculoRepository.atualizarVeiculo(id, veiculo);
        if (!veiculoAtualizado) throw new VeiculoError("Não foi possível atualizar o veículo, tente novamente em instantes.");

        return veiculoAtualizado;
    };

    async deletarVeiculo(id: number): Promise<boolean> {
        const veiculoExistente = await this.buscarVeiculoPorId(id);
        if (!veiculoExistente) throw new VeiculoError("Veículo não encontrado");

        const ordemSevicoVinculado = await this.ordedemServicoRepository.buscarOrdemServicoPorVeiculoId(veiculoExistente.id);
        if (ordemSevicoVinculado.length > 0) throw new VeiculoError("Não é possível excluir este veículo, ele esta vinculado a uma ou mais ordens de serviços.");

        await this.veiculoRepository.deletarVeiculo(veiculoExistente.id);
        return true
    }

    async contarTotalVeiculos(): Promise<number> {
        return await this.veiculoRepository.contarTotalVeiculos();
    };
}