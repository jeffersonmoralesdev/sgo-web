
export const statusOrdemServico  = [
    'AGUARDANDO_AVALIACAO',
    'EM_AVALIACAO',
    'AGUARDANDO_APROVACAO',
    'APROVADA',
    'REPROVADA',
    'EM_EXECUCAO',
    'PRONTA_PARA_RETIRADA',
    'ENTREGUE',
    'CANCELADA',
] as const;

export type StatusOrdemServico = typeof statusOrdemServico[number];