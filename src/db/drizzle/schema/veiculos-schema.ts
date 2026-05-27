import { foreignKey, index, int, mysqlTable, timestamp, unique, varchar } from "drizzle-orm/mysql-core";
import {clientes} from './clientes-schema'

export const veiculos = mysqlTable("veiculos", {
    id: int().primaryKey().autoincrement().notNull(),
    placa: varchar({ length: 7 }).notNull(),
    marca: varchar({ length: 50 }).notNull(),
    modelo: varchar({ length: 50 }).notNull(),
    ano: varchar({ length: 9 }).notNull(),
    cor: varchar({ length: 50 }),
    quilometragem: int().notNull(),
    criadoEm: timestamp("criado_em", { mode: 'string' }).defaultNow().notNull(),
    atualizadoEm: timestamp("atualizado_em", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
    clienteId: int("cliente_id").notNull(),
},
(table) => [
    foreignKey({
        name:"fk_veiculos_cliente",
        columns:[table.clienteId],
        foreignColumns:[clientes.id]
    }),
    index("fk_veiculos_cliente_idx").on(table.clienteId),
    unique("placa_UNIQUE").on(table.placa)
]);