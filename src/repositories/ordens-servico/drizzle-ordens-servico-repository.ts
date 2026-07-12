import { CreateOrdemServicoRepository, ListagemOrdemServico, OrdemServicoModel, UpdateStatusOrdemServico } from "@/src/model/ordens-servico/ordens-servico-model";
import { OrdemServicoRepository } from "./ordens-servico-repository";
import { db } from "@/src/db/drizzle";
import { clientes, historicoStatusOrdemServico, ordensServico, veiculos } from "@/src/db/drizzle/schema";
import { and, desc, eq, inArray, like, or, SQL } from "drizzle-orm";

export class DrizzleOrdemServicoRepository implements OrdemServicoRepository {

    async listarOrdensServico(busca?: string): Promise<ListagemOrdemServico[]> {

        const baseSelect = db.select({
            id: ordensServico.id,
            status: ordensServico.status,
            criadoEm: ordensServico.criadoEm,
            veiculo: {
                placa: veiculos.placa,
                modelo: veiculos.modelo,
            },
            cliente: {
                id: clientes.id,
                nome: clientes.nome,
            },
        })
            .from(ordensServico)
            .innerJoin(veiculos, eq(ordensServico.veiculoId, veiculos.id))
            .innerJoin(clientes, eq(ordensServico.clienteId, clientes.id));

        const buscaLimpa = busca?.trim();
        if (!buscaLimpa) {
            return await baseSelect.orderBy(desc(ordensServico.criadoEm));
        }

        const placaNormalizada = buscaLimpa
            .replace(/[^A-Za-z0-9]/g, "")
            .toUpperCase();

        const filtros: SQL[] = [];

        filtros.push(
            like(veiculos.placa, `%${placaNormalizada}%`),
            like(veiculos.modelo, `%${buscaLimpa}%`),
            like(clientes.nome, `%${buscaLimpa}%`),
        )

        return await baseSelect.where(or(...filtros)).orderBy(desc(ordensServico.criadoEm));
    }

    async buscarOrdemServicoPorUsuarioId(usuarioId: number): Promise<OrdemServicoModel[]> {
        return await db.select().from(ordensServico).where(eq(ordensServico.usuarioId, usuarioId));
    }

    async buscarOrdemServicoPorVeiculoId(veiculoId: number): Promise<OrdemServicoModel[]> {
        return await db.select().from(ordensServico).where(eq(ordensServico.veiculoId, veiculoId));
    }

    async buscarOrdemServicoPorId(ordemServicoId: number): Promise<OrdemServicoModel | null> {
        const [result] = await db.select().from(ordensServico).where(eq(ordensServico.id, ordemServicoId));
        return result ?? null;
    }

    async atualizarStatusOrdemServico(atualizaStatusOS: UpdateStatusOrdemServico): Promise<void> {
        await db.transaction(async (tx) => {
            await tx.update(ordensServico)
                .set({ status: atualizaStatusOS.statusNovo })
                .where(
                    eq(ordensServico.id, atualizaStatusOS.id)
                );

            await tx.insert(historicoStatusOrdemServico)
                .values({
                    ordemServicoId: atualizaStatusOS.id,
                    usuarioId: atualizaStatusOS.usuarioId,
                    statusAnterior: atualizaStatusOS.statusAnterior,
                    novoStatus: atualizaStatusOS.statusNovo,
                    observacao: atualizaStatusOS.observacao,
                })
        });
    }

    async existeOrdemServicoAtivaPorVeiculoId(veiculoId: number): Promise<boolean> {
        const result = await db.select().from(ordensServico)
            .where(
                and(
                    eq(ordensServico.veiculoId, veiculoId),
                    inArray(ordensServico.status, [
                        "AGUARDANDO_AVALIACAO",
                        "EM_AVALIACAO",
                        "AGUARDANDO_APROVACAO",
                        "APROVADA",
                        "EM_EXECUCAO",
                        "PRONTA_PARA_RETIRADA"
                    ])
                )
            );
        return result.length > 0;
    }

    async registrarOrdemServico(ordemServico: CreateOrdemServicoRepository): Promise<OrdemServicoModel> {
        return await db.transaction(async (tx) => {
            const novaOrdemServico = await tx
                .insert(ordensServico)
                .values(ordemServico)
                .$returningId();
            const ordemServicoId = novaOrdemServico[0]?.id;

            if (!ordemServicoId) throw new Error("registrarOrdemServicoRepository:: ID da ordem de serviço não retornado após insert.");
            await tx.insert(historicoStatusOrdemServico).values({
                ordemServicoId: ordemServicoId,
                usuarioId: ordemServico.usuarioId,
                statusAnterior: null,
                novoStatus: ordemServico.status,
                observacao: "Ordem de serviço aberta."
            });

            const ordemServicoCriada = await tx.select()
                .from(ordensServico)
                .where(eq(
                    ordensServico.id, ordemServicoId
                ));
            if (!ordemServicoCriada[0]) {
                throw new Error("Ordem de serviço criada não encontrada após o registro.");
            }

            return ordemServicoCriada[0];

        })
    }


}