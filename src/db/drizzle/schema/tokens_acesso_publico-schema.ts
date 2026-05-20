import { index, int, mysqlTable, primaryKey, timestamp, unique, varchar } from "drizzle-orm/mysql-core";
import {ordensServico} from './ordens_servico-schema'

export const tokensAcessoPublico = mysqlTable("tokens_acesso_publico", {
    id: int().autoincrement().notNull(),
    token: varchar({ length: 255 }).notNull(),
    usadoEm: timestamp("usado_em", { mode: 'string' }),
    expiraEm: timestamp("expira_em", { mode: 'string' }).notNull(),
    criadoEm: timestamp("criado_em", { mode: 'string' }).defaultNow().notNull(),
    ordemServicoId: int("ordem_servico_id").notNull().references(() => ordensServico.id),
},
(table) => [
    index("fk_tokens_acesso_publico_ordens_servico1_idx").on(table.ordemServicoId),
    primaryKey({ columns: [table.id], name: "tokens_acesso_publico_id"}),
    unique("token_UNIQUE").on(table.token),
]);