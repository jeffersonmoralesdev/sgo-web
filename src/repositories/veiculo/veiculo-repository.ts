import { CreateVeiculoInput, UpdateVeiculoInput, VeiculoModel } from "@/src/model/veiculo/veiculo-model";

export interface VeiculoRepository {
    listarVeiculos(busca?:string): Promise<VeiculoModel[]>;
    buscarVeiculoPorId(id: number): Promise<VeiculoModel | null>;
    buscarVeiculoPorPlaca(placa: string): Promise<VeiculoModel | null>;
    buscarVeiculoPorClienteId(clienteId: number): Promise<VeiculoModel[]>;
    registrarVeiculo(veiculo: CreateVeiculoInput): Promise<VeiculoModel>;
    atualizarVeiculo(id: number, veiculo: UpdateVeiculoInput): Promise<VeiculoModel | null>;
    deletarVeiculo(id: number): Promise<void>;
}
