import { VeiculoModel } from "@/src/model/veiculo/veiculo-model";
import { VeiculoRepository } from "./veiculo-repository";
import { db } from "@/src/db/drizzle";
import { veiculos } from "@/src/db/drizzle/schema";
import { asc, count, desc, eq, like, or, SQL } from "drizzle-orm";
import { AtualizarVeiculoDTO, CriarVeiculoDTO, VeiculoComClienteDTO } from "@/src/dtos/veiculo";

export class DrizzleVeiculoRepository implements VeiculoRepository {

    async buscarVeiculoComClientePorId(id: number): Promise<VeiculoComClienteDTO | null> {
        const veiculo = await db.query.veiculos.findFirst({
            where: (veiculos, { eq }) => eq(veiculos.id, id),
            columns: {
                id: true,
                placa: true,
                modelo: true,
            },
            with: {
                cliente: {
                    columns: {
                        id: true,
                        nome: true,
                        ativo: true,
                    }
                }
            }
        })
        return veiculo ?? null
    }

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

    async registrarVeiculo(veiculo: CriarVeiculoDTO): Promise<VeiculoModel> {
        const result = await db.insert(veiculos).values(veiculo).$returningId();

        const id = result[0]?.id;
        if (!id) throw new Error("Veículo criado, mas o ID não foi retornado.");

        const veiculoCriado = await this.buscarVeiculoPorId(id);

        if (!veiculoCriado) throw new Error(" Veículo criado, mas não foi possivel buscá-lo");

        return veiculoCriado;
    }

    async atualizarVeiculo(id: number, veiculo: AtualizarVeiculoDTO): Promise<VeiculoModel | null> {
        await db.update(veiculos).set(veiculo).where(eq(veiculos.id, id));
        return await this.buscarVeiculoPorId(id);
    }

    async deletarVeiculo(id: number): Promise<void> {
        await db.delete(veiculos).where(eq(veiculos.id, id));
    }

    async contarTotalVeiculos(): Promise<number> {
        const result = await db.select({ total: count() }).from(veiculos);
        return result[0]?.total ?? 0;
    }


}