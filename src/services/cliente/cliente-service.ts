import { ClienteModel, CreateClienteInput, UpdateClienteInput } from "@/src/model/cliente/cliente-model";
import { ClienteRepository } from "@/src/repositories/cliente/cliente-repository";


export class ClienteService{
    constructor(private readonly clienteRepository:ClienteRepository){}
    
    async listarClientes():Promise<ClienteModel[]>{
        return await this.clienteRepository.listarClientes();
    }

    async buscarClientePorId(id:number):Promise<ClienteModel | null>{
        return await this.clienteRepository.buscarClientePorId(id);

    };

    async buscarClientePorEmail(email:string):Promise<ClienteModel|null>{
        
        return await this.clienteRepository.buscarClientePorEmail(email);

    };

    async buscarClientePorCpf(cpf:string):Promise<ClienteModel|null>{
        
        return await this.clienteRepository.buscarClientePorCpf(cpf);

    };

    async registrarCliente(cliente:CreateClienteInput):Promise<ClienteModel>{
        
        const clienteEmail = await this.buscarClientePorEmail(cliente.email)
        if(clienteEmail){
            throw new Error("Já existe um cliente cadastrado com este email.");
        }
        
        const clienteCpf = await this.buscarClientePorCpf(cliente.cpf);
        if (clienteCpf) {
            throw new Error("Já existe um cliente cadastrado com este CPF.");
        }

        return await this.clienteRepository.registrarCliente(cliente);

    };

    async atualizarCliente(id:number, cliente:UpdateClienteInput):Promise<ClienteModel>{
        const clienteExistente= await this.buscarClientePorId(id);
        if(!clienteExistente)throw new Error("Cliente não encontrado");
        
        if (cliente.email && cliente.email !== clienteExistente.email){
            const clienteEmail = await this.buscarClientePorEmail(cliente.email)
            if(clienteEmail)throw new Error("Já existe um cliente cadastrado com este email.");
        }
        
        if (cliente.cpf && cliente.cpf !== clienteExistente.cpf){
            const clienteCpf = await this.buscarClientePorCpf(cliente.cpf);
            if (clienteCpf) throw new Error("Já existe um cliente cadastrado com este CPF.");
        }

        const  clienteAtualizado = await this.clienteRepository.atualizarCliente(id,cliente)
        if (!clienteAtualizado)throw new Error("Não foi possível atualizar o cliente.");
        return clienteAtualizado
        
        
    };
    
    async deletarCliente(id: number): Promise<boolean>{
        const clienteExistente = await this.buscarClientePorId(id);

        if (!clienteExistente) throw new Error("Cliente não encontrado");
        
        return await this.clienteRepository.deletarCliente(id);

    };

}