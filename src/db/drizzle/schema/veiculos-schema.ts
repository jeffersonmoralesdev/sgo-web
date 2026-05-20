import { index, int, mysqlTable, primaryKey, timestamp, unique, varchar } from "drizzle-orm/mysql-core";
import {clientes} from './clientes-schema'

export const veiculos = mysqlTable("veiculos", {
    id: int().autoincrement().notNull(),
    placa: varchar({ length: 7 }).notNull(),
    marca: varchar({ length: 50 }).notNull(),
    modelo: varchar({ length: 50 }).notNull(),
    ano: varchar({ length: 9 }).notNull(),
    cor: varchar({ length: 50 }),
    quilometragem: int().notNull(),
    criadoEm: timestamp("criado_em", { mode: 'string' }).defaultNow().notNull(),
    atualizadoEm: timestamp("atualizado_em", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
    clienteId: int("cliente_id").notNull().references(() => clientes.id),
},
(table) => [
    index("fk_veiculos_cliente_idx").on(table.clienteId),
    primaryKey({ columns: [table.id], name: "veiculos_id"}),
    unique("placa_UNIQUE").on(table.placa),
]);