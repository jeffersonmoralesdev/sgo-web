import { CreateVeiculoInput, UpdateVeiculoInput, VeiculoModel } from "@/src/model/veiculo/veiculo-model";
import { VeiculoRepository } from "./veiculo-repository";
import { db } from "@/src/db/drizzle";
import { veiculos } from "@/src/db/drizzle/schema";
import { eq } from "drizzle-orm";

export class DrizzleVeiculoRepository implements VeiculoRepository {

    async listarVeiculos(): Promise<VeiculoModel[]> {
        return await db.select().from(veiculos);
    }

    async buscarVeiculoPorId(id: number): Promise<VeiculoModel | null> {
        const [veiculo] = await db.select().from(veiculos).where(eq(veiculos.id, id))
        return veiculo ?? null
    }

    async buscarVeiculoPorPlaca(placa: string): Promise<VeiculoModel | null> {
        const [veiculo] = await db.select().from(veiculos).where(eq(veiculos.placa, placa)).limit(1);
        return veiculo ?? null
    }

    async buscarVeiculoPorClienteId(clienteId: number): Promise<VeiculoModel[]> {
        return await db.select().from(veiculos).where(eq(veiculos.clienteId, clienteId))
    }

    async registrarVeiculo(veiculo: CreateVeiculoInput): Promise<VeiculoModel> {
        const result = await db.insert(veiculos).values(veiculo).$returningId();

        const id = result[0]?.id;
        if (!id) throw new Error("Veículo criado, mas o ID não foi retornado.");

        const veiculoCriado = await this.buscarVeiculoPorId(id);

        if (!veiculoCriado) throw new Error(" Veículo criado, mas não foi possivel buscá-lo");

        return veiculoCriado;
    }

    async atualizarVeiculo(id: number, veiculo: UpdateVeiculoInput): Promise<VeiculoModel | null> {
        await db.update(veiculos).set(veiculo).where(eq(veiculos.id, id));
        return await this.buscarVeiculoPorId(id);
    }

    async deletarVeiculo(id: number): Promise<boolean> {
        await db.delete(veiculos).where(eq(veiculos.id, id));
        return true;
    }

}