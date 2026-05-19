import { relations } from "drizzle-orm/relations";
import { ordensServico, historicoStatusOrdemServico, usuarios, clientes, veiculos, ordensServicoItens, tokensAcessoPublico } from "./schema";

export const historicoStatusOrdemServicoRelations = relations(historicoStatusOrdemServico, ({one}) => ({
	ordensServico: one(ordensServico, {
		fields: [historicoStatusOrdemServico.ordemServicoId],
		references: [ordensServico.id]
	}),
	usuario: one(usuarios, {
		fields: [historicoStatusOrdemServico.usuarioId],
		references: [usuarios.id]
	}),
}));

export const ordensServicoRelations = relations(ordensServico, ({one, many}) => ({
	historicoStatusOrdemServicos: many(historicoStatusOrdemServico),
	cliente: one(clientes, {
		fields: [ordensServico.clienteId],
		references: [clientes.id]
	}),
	usuario: one(usuarios, {
		fields: [ordensServico.usuarioId],
		references: [usuarios.id]
	}),
	veiculo: one(veiculos, {
		fields: [ordensServico.veiculoId],
		references: [veiculos.id]
	}),
	ordensServicoItens: many(ordensServicoItens),
	tokensAcessoPublicos: many(tokensAcessoPublico),
}));

export const usuariosRelations = relations(usuarios, ({many}) => ({
	historicoStatusOrdemServicos: many(historicoStatusOrdemServico),
	ordensServicos: many(ordensServico),
}));

export const clientesRelations = relations(clientes, ({many}) => ({
	ordensServicos: many(ordensServico),
	veiculos: many(veiculos),
}));

export const veiculosRelations = relations(veiculos, ({one, many}) => ({
	ordensServicos: many(ordensServico),
	cliente: one(clientes, {
		fields: [veiculos.clienteId],
		references: [clientes.id]
	}),
}));

export const ordensServicoItensRelations = relations(ordensServicoItens, ({one}) => ({
	ordensServico: one(ordensServico, {
		fields: [ordensServicoItens.ordemServicoId],
		references: [ordensServico.id]
	}),
}));

export const tokensAcessoPublicoRelations = relations(tokensAcessoPublico, ({one}) => ({
	ordensServico: one(ordensServico, {
		fields: [tokensAcessoPublico.ordemServicoId],
		references: [ordensServico.id]
	}),
}));