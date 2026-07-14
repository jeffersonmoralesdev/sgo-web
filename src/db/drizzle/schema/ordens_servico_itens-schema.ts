import { decimal, foreignKey, index, int, mysqlEnum, mysqlTable, timestamp, varchar } from "drizzle-orm/mysql-core";
import {ordensServico} from './ordens_servico-schema'
import { TipoItemOrdemServicoEnum } from "@/src/enums/ordem-servico-item";


export const ordensServicoItens = mysqlTable("ordens_servico_itens", {
    id: int().primaryKey().autoincrement().notNull(),
    tipo: mysqlEnum(TipoItemOrdemServicoEnum).notNull(),
    descricao: varchar({ length: 255 }).notNull(),
    quantidade: decimal({ precision: 10, scale: 3 }).notNull(),
    valorUnitario: decimal("valor_unitario", { precision: 10, scale: 2 }).notNull(),
    valorTotal: decimal("valor_total", { precision: 10, scale: 2 }).notNull(),
    criadoEm: timestamp("criado_em", { mode: 'string' }).defaultNow().notNull(),
    ordemServicoId: int("ordem_servico_id").notNull(),
},
(table) => [
    foreignKey({
        name:"fk_ordens_servi_itens_os",
        columns:[table.ordemServicoId],
        foreignColumns:[ordensServico.id]
    }),
    index("fk_ordens_servico_itens_ordens_servico1_idx").on(table.ordemServicoId)
]);