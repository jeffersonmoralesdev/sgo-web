import { TabelaCliente } from "@/src/components/private/cliente/tabela-cliente";
import { ErrorListagem } from "@/src/components/private/error-listagem";
import { HeaderPage } from "@/src/components/private/header-page";
import { listarClientesQuery } from "@/src/queries/cliente/cliente-queries";
import { Plus } from "lucide-react";
import Link from "next/link";

type ClientesPageProps = {
    searchParams: Promise<{
        filtro?: string;
        toast?: string;
    }>
}
export default async function ClientePage({ searchParams }: ClientesPageProps) {
    const { filtro } = await searchParams;

    const { data, status, error } = await listarClientesQuery(filtro);

    return (
        <div className="space-y-6">
            <section className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <HeaderPage titulo="Clientes" descricao="Gerencie os clientes cadastrados na oficina." />
                <Link href={"/clientes/cadastro"}
                    className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition-colors duration-200 hover:bg-blue-700"
                >
                    <Plus size={18} />
                    Novo Cliente
                </Link>
            </section>
            {status === "ERROR"
                ? (
                    <ErrorListagem titulo="Erro ao carregar clientes" error={error ?? "Não foi possível carregar os clientes no momento."} />
                ) : (
                    <TabelaCliente clientes={data?.clientes ?? []} isAdmin={data?.isAdmin ?? false} paramsFiltro={filtro} />
                )
            }
        </div>
    )
}