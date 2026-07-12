import { ErrorListagem } from "@/src/components/private/error-listagem";
import { HeaderPage } from "@/src/components/private/header-page";
import LinkBotao from "@/src/components/private/link-botao";
import { TabelaOrdemServico } from "@/src/components/private/ordem-servico/tabela-ordem-servico";
import { ToastPorUrl } from "@/src/components/private/toast-por-url";
import { listarOrdensServicoQuery } from "@/src/queries/ordem-servico";
import { Plus } from "lucide-react";

type OrdensServicoPageProps = {
    searchParams: Promise<{
        filtro?: string;
        toast?: string;
    }>
}
export default async function OrdensServicoPage({ searchParams }: OrdensServicoPageProps) {
    const { filtro, toast } = await searchParams;

    const result = await listarOrdensServicoQuery(filtro);

    return (
        <div className="space-y-6">
            <ToastPorUrl parametroToast={toast} />
            <section className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <HeaderPage titulo="Ordens de Serviço" descricao="Gerencie as ordens de serviço cadastradas na oficina" />
                <LinkBotao url="/ordens-servico/cadastro" text="Nova Ordem de Serviço" icon={Plus} />
            </section>
            {result.success
                ? (
                    <TabelaOrdemServico ordensServico={result.data.ordensServico ?? []} paramsFiltro={filtro} />
                ) : (
                    <ErrorListagem titulo="Erro ao carregar ordens de serviço" error={result.error ?? "Não foi possível carregar as ordens de serviço no momento."} />
                )
            }
        </div>
    )
}