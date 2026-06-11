
import { boolean, int, mysqlTable, timestamp, unique, varchar } from "drizzle-orm/mysql-core";

export const clientes = mysqlTable("clientes", {
    id: int().primaryKey().autoincrement().notNull(),
    nome: varchar({ length: 255 }).notNull(),
    cpf: varchar({ length: 11 }).notNull(),
    telefone: varchar({ length: 20 }).notNull(),
    email: varchar({ length: 255 }).notNull(),
    ativo: boolean().default(true).notNull(),
    criadoEm: timestamp("criado_em", { mode: 'string'  }).defaultNow().notNull(),
    atualizadoEm: timestamp("atualizado_em", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
},
(table) => [
    unique("cpf_UNIQUE").on(table.cpf),
    unique("email_UNIQUE").on(table.email)
]);
