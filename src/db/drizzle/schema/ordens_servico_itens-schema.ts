import { decimal, index, int, mysqlEnum, mysqlTable, primaryKey, timestamp, varchar } from "drizzle-orm/mysql-core";
import {ordensServico} from './ordens_servico-schema'

export const ordensServicoItens = mysqlTable("ordens_servico_itens", {
    id: int().autoincrement().notNull(),
    tipo: mysqlEnum(['PECA','SERVICO','MAO_DE_OBRA']).notNull(),
    descricao: varchar({ length: 255 }).notNull(),
    quantidade: decimal({ precision: 10, scale: 3 }).notNull(),
    valorUnitario: decimal("valor_unitario", { precision: 10, scale: 2 }).notNull(),
    valorTotal: decimal("valor_total", { precision: 10, scale: 2 }).notNull(),
    criadoEm: timestamp("criado_em", { mode: 'string' }).defaultNow().notNull(),
    ordemServicoId: int("ordem_servico_id").notNull().references(() => ordensServico.id),
},
(table) => [
    index("fk_ordens_servico_itens_ordens_servico1_idx").on(table.ordemServicoId),
    primaryKey({ columns: [table.id], name: "ordens_servico_itens_id"}),
]);