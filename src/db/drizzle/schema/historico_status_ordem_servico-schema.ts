import { index, int, mysqlEnum, mysqlTable, primaryKey, text, timestamp } from "drizzle-orm/mysql-core";
import {usuarios} from './usuarios-schema'
import {ordensServico} from './ordens_servico-schema'
export const historicoStatusOrdemServico = mysqlTable("historico_status_ordem_servico", {
    id: int().primaryKey().autoincrement().notNull(),
    statusAnterior: mysqlEnum("status_anterior", ['EM_ELABORACAO','AGUARDANDO_APROVACAO','APROVADO','EM_EXECUCAO','FINALIZADO','ENTREGUE','REPROVADO','ENCERRADO']),
    novoStatus: mysqlEnum("novo_status", ['EM_ELABORACAO','AGUARDANDO_APROVACAO','APROVADO','EM_EXECUCAO','FINALIZADO','ENTREGUE','REPROVADO','ENCERRADO']).notNull(),
    observacao: text(),
    criadoEm: timestamp("criado_em", { mode: 'string' }).defaultNow().notNull(),
    ordemServicoId: int("ordem_servico_id").notNull().references(() => ordensServico.id),
    usuarioId: int("usuario_id").notNull().references(() => usuarios.id),
},
(table) => [
    index("fk_historico_status_ordem_servico_ordens_servico1_idx").on(table.ordemServicoId),
    index("fk_historico_status_ordem_servico_usuarios1_idx").on(table.usuarioId)
]);