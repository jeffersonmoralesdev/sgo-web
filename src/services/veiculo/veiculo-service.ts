import { CreateVeiculoInput, UpdateVeiculoInput, VeiculoModel } from "@/src/model/veiculo/veiculo-model";
import { ClienteRepository } from "@/src/repositories/cliente/cliente-repository";
import { VeiculoRepository } from "@/src/repositories/veiculo/veiculo-repository";

export class VeiculoService{
    constructor(
        private readonly veiculoRepository:VeiculoRepository,
        private readonly clienteRepository:ClienteRepository
    ){}

    async listarVeiculos():Promise<VeiculoModel[]>{
        return await this.veiculoRepository.listarVeiculos();
    };

    async buscarVeiculoPorId(id:number):Promise<VeiculoModel|null>{
        return await this.veiculoRepository.buscarVeiculoPorId(id);
    };

    async buscarVeiculoPorPlaca(placa:string):Promise<VeiculoModel|null>{
        return await this.veiculoRepository.buscarVeiculoPorPlaca(placa);
    };

    async registrarVeiculo(veiculo:CreateVeiculoInput):Promise<VeiculoModel>{

        const cliente = await this.clienteRepository.buscarClientePorId(veiculo.clienteId);
        
        if(!cliente)throw new Error("Cliente responsavel do veículo não encontrado");

        const veiculoValidation = await this.veiculoRepository.buscarVeiculoPorPlaca(veiculo.placa);
    
        if(veiculoValidation)throw new Error("Já existe um veículo cadastrado com esta placa.");
                
        const veiculoCadastrado = await this.veiculoRepository.registrarVeiculo(veiculo);

        return veiculoCadastrado  
    };

    async atualizarVeiculo(id:number,veiculo:UpdateVeiculoInput):Promise<VeiculoModel>{
        
    
        const veiculoExistente = await this.buscarVeiculoPorId(id);
        if(!veiculoExistente) throw new Error ("Veículo não encontrado.")
        
        if(veiculo.placa && veiculo.placa !== veiculoExistente.placa){
            const placaDuplicada = await this.buscarVeiculoPorPlaca(veiculo.placa);
            if(placaDuplicada) throw new Error("Já existe um veículo cadastrado com esta placa.");
        }

        if(veiculo.clienteId && veiculo.clienteId !== veiculoExistente.clienteId){   
            const cliente = await this.clienteRepository.buscarClientePorId(veiculo.clienteId);
            if (!cliente) throw new Error("Não foi possível atualizar veículo, cliente não encontrado."); 
        }

        const veiculoAtualizado = await this.veiculoRepository.atualizarVeiculo(id,veiculo);
        if(!veiculoAtualizado) throw new Error("Não foi possivel atualizar veículo.");
        
        return veiculoAtualizado;
    };

    async deletarVeiculo(id:number):Promise<boolean>{
        const veiculoExistente = await this.buscarVeiculoPorId(id);
        if(!veiculoExistente) throw new Error("Veículo não encontrado");
        
        return await this.veiculoRepository.deletarVeiculo(id);
    }
    
}