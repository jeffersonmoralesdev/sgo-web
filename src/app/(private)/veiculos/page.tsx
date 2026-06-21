import { ErrorListagem } from "@/src/components/private/error-listagem";
import { HeaderPage } from "@/src/components/private/header-page";
import { ToastPorUrl } from "@/src/components/private/toast-por-url";
import { TabelaVeiculo } from "@/src/components/private/veiculo/tabela-veiculo";
import { listarVeiculosQuery } from "@/src/queries/veiculo/veiculo-queries";

import { Plus } from "lucide-react";
import Link from "next/link";

type VeiculosPageProps = {
    searchParams: Promise<{
        filtro?: string;
        toast?: string;
    }>
}
export default async function VeiculosPage({ searchParams }: VeiculosPageProps) {
    const { filtro, toast } = await searchParams;
    
    const { data, status, error } = await listarVeiculosQuery(filtro);

    return (
        <div className="space-y-6">
            <ToastPorUrl parametroToast={toast} />
            <section className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <HeaderPage titulo="Veículos" descricao="Gerencie os veículos cadastrados na oficina." />
                <Link href={"/veiculos/cadastro"}
                    className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition-colors duration-200 hover:bg-blue-700"
                >
                    <Plus size={18} />
                    Novo Veículo
                </Link>
            </section>
            {status === "ERROR"
                ? (
                    <ErrorListagem titulo="Erro ao carregar veículos" error={error ?? "Não foi possível carregar os veículos no momento."} />
                ) : (
                    <TabelaVeiculo veiculos={data?.veiculos ?? []} isAdmin={data?.isAdmin ?? false} paramsFiltro={filtro} />
                )
            }
        </div>
    )
}