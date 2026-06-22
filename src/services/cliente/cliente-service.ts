import { ClienteError } from "@/src/errors/cliente-error";
import { ClienteModel, CreateClienteInput, UpdateClienteInput } from "@/src/model/cliente/cliente-model";
import { ClienteRepository } from "@/src/repositories/cliente/cliente-repository";
import { VeiculoRepository } from "@/src/repositories/veiculo/veiculo-repository";


export class ClienteService {
    constructor(
        private readonly clienteRepository: ClienteRepository,
        private readonly veiculoRepository: VeiculoRepository
    ) { }

    async listarClientes(busca?: string): Promise<ClienteModel[]> {
        return await this.clienteRepository.listarClientes(busca);

    }

    async buscarClientePorId(id: number): Promise<ClienteModel | null> {
        return await this.clienteRepository.buscarClientePorId(id);

    };

    async buscarClientePorEmail(email: string): Promise<ClienteModel | null> {
        return await this.clienteRepository.buscarClientePorEmail(email);

    };

    async buscarClientePorCpf(cpf: string): Promise<ClienteModel | null> {
        return await this.clienteRepository.buscarClientePorCpf(cpf);

    };

    async registrarCliente(cliente: CreateClienteInput): Promise<ClienteModel> {

        const clienteEmail = await this.buscarClientePorEmail(cliente.email)
        if (clienteEmail) {
            throw new ClienteError("Já existe um cliente cadastrado com este email.");
        }

        const clienteCpf = await this.buscarClientePorCpf(cliente.cpf);
        if (clienteCpf) {
            throw new ClienteError("Já existe um cliente cadastrado com este CPF.");
        }

        return await this.clienteRepository.registrarCliente(cliente);

    };

    async atualizarCliente(id: number, cliente: UpdateClienteInput): Promise<ClienteModel> {
        const clienteExistente = await this.buscarClientePorId(id);
        if (!clienteExistente) throw new ClienteError("Cliente não encontrado");

        if (cliente.email && cliente.email !== clienteExistente.email) {
            const clienteEmail = await this.buscarClientePorEmail(cliente.email)
            if (clienteEmail) throw new ClienteError("Já existe um cliente cadastrado com este email.");
        }

        if (cliente.cpf && cliente.cpf !== clienteExistente.cpf) {
            const clienteCpf = await this.buscarClientePorCpf(cliente.cpf);
            if (clienteCpf) throw new ClienteError("Já existe um cliente cadastrado com este CPF.");
        }

        const clienteAtualizado = await this.clienteRepository.atualizarCliente(id, cliente)
        if (!clienteAtualizado) throw new ClienteError("Não foi possível atualizar o cliente.");
        return clienteAtualizado

    };

    async deletarCliente(id: number): Promise<boolean> {
        const clienteExistente = await this.buscarClientePorId(id);
        if (!clienteExistente) throw new ClienteError("Não foi possível deletar cliente não encontrado.");

        const veiculosVinculado = await this.veiculoRepository.buscarVeiculoPorClienteId(clienteExistente.id)
        if (veiculosVinculado.length > 0) throw new ClienteError("Não é possível excluir este cliente, pois ele possui veículo vinculado.");

        //aqui esta comentado porque ainda vou desenvolver OrdemServicoRepository 
        /*const possuiOrdemServico = await this.ordemServicoRepository.buscarOrdemServicoPorClienteId(clienteExistente.id)
        if (possuiOrdemServico) throw new ClienteError("Não é possível excluir este cliente, pois ele possui ordem de serviço vinculada.");*/

        await this.clienteRepository.deletarCliente(id);
        return true
    };

    async alternarStatusCliente(id: number): Promise<ClienteModel> {
        const clienteExistente = await this.buscarClientePorId(id);
        if (!clienteExistente) throw new ClienteError("Cliente não encontrado");

        const novoStatus = !clienteExistente.ativo
        return await this.atualizarCliente(id, { ativo: novoStatus })
    };

    async contarTotalClientes(): Promise<number> {
        return await this.clienteRepository.contarTotalClientes();

    }
}