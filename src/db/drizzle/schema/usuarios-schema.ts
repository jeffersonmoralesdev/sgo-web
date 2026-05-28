import { boolean, int, mysqlEnum, mysqlTable, timestamp, unique, varchar } from "drizzle-orm/mysql-core";

export const usuarios = mysqlTable("usuarios", {
    id: int().primaryKey().autoincrement().notNull(),
    nome: varchar({ length: 255 }).notNull(),
    email: varchar({ length: 255 }).notNull(),
    senhaHash: varchar("senha_hash", { length: 255 }).notNull(),
    perfil: mysqlEnum(['ADMIN','OPERADOR']).notNull(),
    ativo: boolean().default(true).notNull(),
    criadoEm: timestamp("criado_em", { mode: 'string' }).defaultNow().notNull(),
    atualizadoEm: timestamp("atualizado_em", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
},
(table) => [
    unique("email_UNIQUE").on(table.email)
]);