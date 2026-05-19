import { mysqlTable, mysqlSchema, AnyMySqlColumn, primaryKey, unique, int, varchar, timestamp, index, foreignKey, mysqlEnum, text, decimal, tinyint } from "drizzle-orm/mysql-core"
import { sql } from "drizzle-orm"

export const clientes = mysqlTable("clientes", {
    id: int().autoincrement().notNull(),
    nome: varchar({ length: 255 }).notNull(),
    cpf: varchar({ length: 11 }).notNull(),
    telefone: varchar({ length: 20 }).notNull(),
    email: varchar({ length: 255 }).notNull(),
    criadoEm: timestamp("criado_em", { mode: 'string' }).defaultNow().notNull(),
    atualizadoEm: timestamp("atualizado_em", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
},
(table) => [
    primaryKey({ columns: [table.id], name: "clientes_id"}),
    unique("cpf_UNIQUE").on(table.cpf),
    unique("email_UNIQUE").on(table.email),
]);

export const historicoStatusOrdemServico = mysqlTable("historico_status_ordem_servico", {
    id: int().autoincrement().notNull(),
    statusAnterior: mysqlEnum("status_anterior", ['EM_ELABORACAO','AGUARDANDO_APROVACAO','APROVADO','EM_EXECUCAO','FINALIZADO','ENTREGUE','REPROVADO','ENCERRADO']),
    novoStatus: mysqlEnum("novo_status", ['EM_ELABORACAO','AGUARDANDO_APROVACAO','APROVADO','EM_EXECUCAO','FINALIZADO','ENTREGUE','REPROVADO','ENCERRADO']).notNull(),
    observacao: text(),
    criadoEm: timestamp("criado_em", { mode: 'string' }).defaultNow().notNull(),
    ordemServicoId: int("ordem_servico_id").notNull().references(() => ordensServico.id),
    usuarioId: int("usuario_id").notNull().references(() => usuarios.id),
},
(table) => [
    index("fk_historico_status_ordem_servico_ordens_servico1_idx").on(table.ordemServicoId),
    index("fk_historico_status_ordem_servico_usuarios1_idx").on(table.usuarioId),
    primaryKey({ columns: [table.id], name: "historico_status_ordem_servico_id"}),
]);

export const ordensServico = mysqlTable("ordens_servico", {
    id: int().autoincrement().notNull(),
    status: mysqlEnum(['EM_ELABORACAO','AGUARDANDO_APROVACAO','APROVADO','EM_EXECUCAO','FINALIZADO','ENTREGUE','REPROVADO','ENCERRADO']).notNull(),
    descricaoProblema: text("descricao_problema").notNull(),
    observacao: text(),
    valorTotal: decimal("valor_total", { precision: 10, scale: 2 }).default('0.00').notNull(),
    criadoEm: timestamp("criado_em", { mode: 'string' }).defaultNow().notNull(),
    atualizadoEm: timestamp("atualizado_em", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
    usuarioId: int("usuario_id").notNull().references(() => usuarios.id),
    clienteId: int("cliente_id").notNull().references(() => clientes.id),
    veiculoId: int("veiculo_id").notNull().references(() => veiculos.id),
},
(table) => [
    index("fk_ordens_servico_usuarios1_idx").on(table.usuarioId),
    index("fk_ordens_servico_cliente1_idx").on(table.clienteId),
    index("fk_ordens_servico_veiculos1_idx").on(table.veiculoId),
    primaryKey({ columns: [table.id], name: "ordens_servico_id"}),
]);

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

export const usuarios = mysqlTable("usuarios", {
    id: int().autoincrement().notNull(),
    nome: varchar({ length: 255 }).notNull(),
    email: varchar({ length: 255 }).notNull(),
    senhaHash: varchar("senha_hash", { length: 255 }).notNull(),
    perfil: mysqlEnum(['ADMIN','OPERADOR']).notNull(),
    ativo: tinyint().default(1).notNull(),
    criadoEm: timestamp("criado_em", { mode: 'string' }).defaultNow().notNull(),
    atualizadoEm: timestamp("atualizado_em", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
},
(table) => [
    primaryKey({ columns: [table.id], name: "usuarios_id"}),
    unique("email_UNIQUE").on(table.email),
]);

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
