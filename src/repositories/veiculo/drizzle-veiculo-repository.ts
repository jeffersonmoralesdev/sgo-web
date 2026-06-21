import { CreateVeiculoInput, UpdateVeiculoInput, VeiculoModel } from "@/src/model/veiculo/veiculo-model";
import { VeiculoRepository } from "./veiculo-repository";
import { db } from "@/src/db/drizzle";
import { veiculos } from "@/src/db/drizzle/schema";
import { asc, desc, eq, like, or, SQL } from "drizzle-orm";

export class DrizzleVeiculoRepository implements VeiculoRepository {

    async listarVeiculos(busca?: string): Promise<VeiculoModel[]> {

        const buscaLimpa = busca?.trim().toLowerCase();
        if (!buscaLimpa) {
            console.log("entrou aqui")
            return await db.select().from(veiculos).orderBy(desc(veiculos.id));
        }

        const filtros: SQL[] = [];

        const placaNormalizada = buscaLimpa
            .replace(/[^A-Za-z0-9]/g, "")
            .toUpperCase();

        filtros.push(
            like(veiculos.placa, `%${placaNormalizada}%`),
            like(veiculos.marca, `%${buscaLimpa}%`),
            like(veiculos.modelo, `%${buscaLimpa}%`),
            like(veiculos.cor, `%${buscaLimpa}%`),
        );

        const buscaNumerica = /^\d+$/.test(buscaLimpa) ? Number(buscaLimpa) : null;

        if (buscaNumerica !== null) {
            filtros.push(
                eq(veiculos.ano, buscaNumerica),
                eq(veiculos.quilometragem, buscaNumerica),
            );
        }
        return await db.select().from(veiculos).where(or(...filtros)).orderBy(asc(veiculos.modelo));
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

    async deletarVeiculo(id: number): Promise<void> {
        await db.delete(veiculos).where(eq(veiculos.id, id));
    }

}