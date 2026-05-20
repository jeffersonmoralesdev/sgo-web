import { relations } from 'drizzle-orm'
import {clientes} from './clientes-schema'
import {veiculos} from './veiculos-schema'
import {usuarios} from './usuarios-schema'
import {historicoStatusOrdemServico as historicoStatusOS }from'./historico_status_ordem_servico-schema'
import {ordensServico } from './ordens_servico-schema'
import { tokensAcessoPublico } from './tokens_acesso_publico-schema'
import {ordensServicoItens } from './ordens_servico_itens-schema'

export const clientesRelaciona = relations(clientes,({many})=>({
    veiculos:many(veiculos),
    ordensServico:many(ordensServico),
}));

export const veiculosRelaciona = relations(veiculos,({one, many})=>({
    cliente:one(clientes,{
        fields:[veiculos.clienteId],
        references:[clientes.id]
    }),
    ordensServico:many(ordensServico)
}));

export const usuariosRelaciona = relations(usuarios,({many})=>({
    ordensServico:many(ordensServico),
    historicoStatusOrdemServico:many(historicoStatusOS)
}));

export const ordensServicoRelaciona =relations(ordensServico,({one,many})=>({
    cliente:one(clientes,{
        fields:[ordensServico.clienteId],
        references:[clientes.id]
    }),
    usuario:one(usuarios,{
        fields:[ordensServico.usuarioId],
        references:[usuarios.id]
    }),
    veiculo:one(veiculos,{
        fields:[ordensServico.veiculoId],
        references:[veiculos.id]
    }),
    ordensServicoItens:many(ordensServicoItens),
    historicoStatusOrdemServico:many(historicoStatusOS),
    tokensAcessoPublico:many(tokensAcessoPublico),
}));

export const historicoStatusOrdemServicoRelaciona = relations(historicoStatusOS,({one})=>({
    usuario:one(usuarios,{
        fields:[historicoStatusOS.usuarioId],
        references:[usuarios.id]
    }),
    ordemServico:one(ordensServico,{
        fields:[historicoStatusOS.ordemServicoId],
        references:[ordensServico.id]
    }),
}));

export const tokensAcessoPublicoRelaciona = relations(tokensAcessoPublico,({one})=>({
    ordemServico:one(ordensServico,{
        fields:[tokensAcessoPublico.ordemServicoId],
        references:[ordensServico.id]
    })
}));

export const ordensServicoItensRelaciona = relations(ordensServicoItens,({one})=>({
    ordemServico:one(ordensServico,{
        fields:[ordensServicoItens.ordemServicoId],
        references:[ordensServico.id]
    })
}));
