import { decimal, foreignKey, index, int, mysqlEnum, mysqlTable, text, timestamp } from "drizzle-orm/mysql-core";
import {usuarios} from'./usuarios-schema';
import {clientes} from './clientes-schema';
import {veiculos} from './veiculos-schema';

export const ordensServico = mysqlTable("ordens_servico", {
    id: int().primaryKey().autoincrement().notNull(),
    status: mysqlEnum(['EM_ELABORACAO','AGUARDANDO_APROVACAO','APROVADO','EM_EXECUCAO','FINALIZADO','ENTREGUE','REPROVADO','ENCERRADO']).notNull(),
    descricaoProblema: text("descricao_problema").notNull(),
    observacao: text(),
    valorTotal: decimal("valor_total", { precision: 10, scale: 2 }).default('0.00').notNull(),
    criadoEm: timestamp("criado_em", { mode: 'string' }).defaultNow().notNull(),
    atualizadoEm: timestamp("atualizado_em", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
    usuarioId: int("usuario_id").notNull(),
    clienteId: int("cliente_id").notNull(),
    veiculoId: int("veiculo_id").notNull(),
},
(table) => [
    foreignKey({
        name:"fk_ordens_servico_user",
        columns:[table.usuarioId],
        foreignColumns:[usuarios.id]
    }),
    foreignKey({
        name:"fk_ordens_servico_cliente",
        columns:[table.clienteId],
        foreignColumns:[clientes.id]
    }),
    foreignKey({
        name:"fk_ordens_servico_veiculo",
        columns:[table.veiculoId],
        foreignColumns:[veiculos.id]
    }),
    index("fk_ordens_servico_usuarios1_idx").on(table.usuarioId),
    index("fk_ordens_servico_cliente1_idx").on(table.clienteId),
    index("fk_ordens_servico_veiculos1_idx").on(table.veiculoId)
]);