import { ClienteModel, CreateClienteInput, UpdateClienteInput } from "@/src/model/cliente/cliente-model";

export interface ClienteRepository{
    listarClientes(busca?:string):Promise<ClienteModel[]>;
    buscarClientePorId(id:number):Promise<ClienteModel | null>;
    buscarClientePorEmail(email:string):Promise<ClienteModel|null>;
    buscarClientePorCpf(cpf:string):Promise<ClienteModel|null>;
    registrarCliente(cliente:CreateClienteInput):Promise<ClienteModel>;
    atualizarCliente(id:number, cliente:UpdateClienteInput):Promise<ClienteModel | null>;
    deletarCliente(id: number): Promise<void>;
}