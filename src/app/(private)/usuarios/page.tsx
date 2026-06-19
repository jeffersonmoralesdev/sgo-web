import { ErrorListagem } from "@/src/components/private/error-listagem";
import { HeaderPage } from "@/src/components/private/header-page";
import { ToastPorUrl } from "@/src/components/private/toast-por-url";
import { TabelaUsuario } from "@/src/components/private/usuario/tabela-usuario";
import { listarUsuariosQuery } from "@/src/queries/usuario/usuario-queries";
import { Plus } from "lucide-react";
import Link from "next/link";

type UsuariosPageProps = {
    searchParams: Promise<{
        filtro?: string;
        toast?: string;
    }>
}
export default async function UsuariosPage({ searchParams }: UsuariosPageProps) {
    const { filtro, toast } = await searchParams;

    const { data, status, error } = await listarUsuariosQuery(filtro);

    return (
        <div className="space-y-6">
            <ToastPorUrl parametroToast={toast} />
            <section className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <HeaderPage titulo="Usuários" descricao="Gerencie os usuários cadastrados na oficina." />
                <Link href={"/usuarios/cadastro"}
                    className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition-colors duration-200 hover:bg-blue-700"
                >
                    <Plus size={18} />
                    Novo Usuário
                </Link>
            </section>
            {status === "ERROR"
                ? (
                    <ErrorListagem titulo="Erro ao carregar usuários" error={error ?? "Não foi possível carregar os usuários no momento."} />
                ) : (
                    <TabelaUsuario usuarios={data?.usuarios ?? []} isAdmin={data?.isAdmin ?? false} paramsFiltro={filtro} />
                )
            }
        </div>
    )
}