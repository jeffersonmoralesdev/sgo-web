import { VeiculoComClienteDTO } from "@/src/dtos/veiculo";
import { CreateVeiculoInput, UpdateVeiculoInput, VeiculoModel } from "@/src/model/veiculo/veiculo-model";

export interface VeiculoRepository {
    listarVeiculos(busca?: string): Promise<VeiculoModel[]>;
    buscarVeiculoPorId(id: number): Promise<VeiculoModel | null>;
    buscarVeiculoComClientePorId(id: number): Promise<VeiculoComClienteDTO | null>;
    buscarVeiculoPorPlaca(placa: string): Promise<VeiculoModel | null>;
    buscarVeiculoPorClienteId(clienteId: number): Promise<VeiculoModel[]>;
    registrarVeiculo(veiculo: CreateVeiculoInput): Promise<VeiculoModel>;
    atualizarVeiculo(id: number, veiculo: UpdateVeiculoInput): Promise<VeiculoModel | null>;
    deletarVeiculo(id: number): Promise<void>;
    contarTotalVeiculos(): Promise<number>;
}
