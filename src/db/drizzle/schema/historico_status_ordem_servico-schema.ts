import { foreignKey, index, int, mysqlEnum, mysqlTable, primaryKey, text, timestamp } from "drizzle-orm/mysql-core";
import {usuarios} from './usuarios-schema'
import {ordensServico} from './ordens_servico-schema'
import { StatusOrdemServicoEnum } from "@/src/enums/ordem-servico";

export const historicoStatusOrdemServico = mysqlTable("historico_status_ordem_servico", {
    id: int().primaryKey().autoincrement().notNull(),
    statusAnterior: mysqlEnum("status_anterior", StatusOrdemServicoEnum),
    novoStatus: mysqlEnum("novo_status", StatusOrdemServicoEnum).notNull(),
    observacao: text(),
    criadoEm: timestamp("criado_em", { mode: 'string' }).defaultNow().notNull(),
    ordemServicoId: int("ordem_servico_id").notNull(),
    usuarioId: int("usuario_id").notNull(),
},
(table) => [
    foreignKey({
        name:"fk_hist_status_os",
        columns:[table.ordemServicoId],
        foreignColumns:[ordensServico.id]
    }),
    foreignKey({
        name:"fk_hist_status_user",
        columns:[table.usuarioId],
        foreignColumns:[usuarios.id]
    }),
    index("fk_historico_status_ordem_servico_ordens_servico1_idx").on(table.ordemServicoId),
    index("fk_historico_status_ordem_servico_usuarios1_idx").on(table.usuarioId)
]);