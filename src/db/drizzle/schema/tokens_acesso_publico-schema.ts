import { foreignKey, index, int, mysqlTable, timestamp, unique, varchar } from "drizzle-orm/mysql-core";
import {ordensServico} from './ordens_servico-schema'

export const tokensAcessoPublico = mysqlTable("tokens_acesso_publico", {
    id: int().primaryKey().autoincrement().notNull(),
    token: varchar({ length: 255 }).notNull(),
    usadoEm: timestamp("usado_em", { mode: 'string' }),
    expiraEm: timestamp("expira_em", { mode: 'string' }).notNull(),
    criadoEm: timestamp("criado_em", { mode: 'string' }).defaultNow().notNull(),
    ordemServicoId: int("ordem_servico_id").notNull(),
},
(table) => [
    foreignKey({
        name:"fk_tokens_acess_publico_os",
        columns:[table.ordemServicoId],
        foreignColumns:[ordensServico.id]
    }),
    index("fk_tokens_acesso_publico_ordens_servico1_idx").on(table.ordemServicoId),
    unique("token_UNIQUE").on(table.token)
]);