
import { FormularioCliente } from "@/src/components/private/cliente/formulario-cliente";
import { ErrorListagem } from "@/src/components/private/error-listagem";
import { HeaderPage } from "@/src/components/private/header-page";
import { buscarClientePorIdQuery } from "@/src/queries/cliente";
import { notFound } from "next/navigation";
type EditarClientePageProps = {
    params: Promise<{
        id: string;
    }>;
}
export default async function EditarClientePage({ params }: EditarClientePageProps) {
    const { id } = await params;
    const idNumero = Number(id);

    if (Number.isNaN(idNumero)) {
        notFound();
    }
    const { data, status, error } = await buscarClientePorIdQuery(idNumero);

    return (
        <main className="space-y-6">
            <HeaderPage
                titulo="Editar cliente"
                descricao="Atualize as informações cadastrais do cliente."
            />
            {status === "ERROR"
                ? <ErrorListagem titulo="Erro ao carregar dados do cliente" error={error ?? "Não foi possível carregar os dados do cliente informado no momento, tente novamente em instantes"} />
                : <FormularioCliente modo="edicao" cliente={data?.cliente} />
            }
        </main>
    )
}