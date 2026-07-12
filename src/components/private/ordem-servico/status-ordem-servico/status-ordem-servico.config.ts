import { StatusOrdemServico } from "@/src/constants/status-ordem-servico";

const statusFormatado: Record<StatusOrdemServico, string> = {
    AGUARDANDO_AVALIACAO: "Aguardando avaliação",
    EM_AVALIACAO: "Em avaliação",
    AGUARDANDO_APROVACAO: "Aguardando aprovação",
    REPROVADA: "Reprovada",
    APROVADA: "Aprovada",
    EM_EXECUCAO: "Em execução",
    PRONTA_PARA_RETIRADA: "Pronta para retirada",
    ENTREGUE: "Entregue",
    CANCELADA: "Cancelada",
};

const statusClasse: Record<StatusOrdemServico, string> = {
    AGUARDANDO_AVALIACAO: "border-amber-200 bg-amber-50 text-amber-700",
    EM_AVALIACAO: "border-blue-200 bg-blue-50 text-blue-700",
    AGUARDANDO_APROVACAO: "border-yellow-200 bg-yellow-50 text-yellow-700",
    REPROVADA: "border-red-200 bg-red-50 text-red-700",
    APROVADA: "border-emerald-200 bg-emerald-50 text-emerald-700",
    EM_EXECUCAO: "border-indigo-200 bg-indigo-50 text-indigo-700",
    PRONTA_PARA_RETIRADA: "border-purple-200 bg-purple-50 text-purple-700",
    ENTREGUE: "border-green-200 bg-green-50 text-green-700",
    CANCELADA: "border-slate-200 bg-slate-50 text-slate-600",
};

export function formatarStatusOrdemServico(status: StatusOrdemServico) {
    return statusFormatado[status];
}

export function obterClasseStatusOrdemServico(status: StatusOrdemServico) {
    return statusClasse[status];
}
