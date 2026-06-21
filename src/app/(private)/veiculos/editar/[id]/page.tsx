import { ErrorListagem } from "@/src/components/private/error-listagem";
import { HeaderPage } from "@/src/components/private/header-page";
import { ToastPorUrl } from "@/src/components/private/toast-por-url";
import { FormularioVeiculo } from "@/src/components/private/veiculo/formulario-veiculo";
import { listarClientesQuery } from "@/src/queries/cliente";
import { buscarVeiculoPorIdQuery } from "@/src/queries/veiculo/veiculo-queries";
import { notFound } from "next/navigation";

type EditarVeiculoPageProps = {
    params: Promise<{
        id: string;
    }>;
    searchParams: Promise<{
        toast?: string;
    }>
}

export default async function EditarVeiculosPage({ params, searchParams }: EditarVeiculoPageProps) {
    const { id } = await params;
    const { toast } = await searchParams;
    const idNumero = Number(id);

    if (Number.isNaN(idNumero)) {
        notFound();
    }

    const veiculoResponse = await buscarVeiculoPorIdQuery(idNumero);
    const clienteResponse = await listarClientesQuery();

    return (
        <main className="space-y-6">
            <ToastPorUrl parametroToast={toast} />
            <HeaderPage
                titulo="Editar veículo"
                descricao="Atualize as informações cadastrais do veículo."
            />
            {veiculoResponse.status === "ERROR"
                ? <ErrorListagem titulo="Erro ao carregar dados do veículo" error={veiculoResponse.error ?? "Não foi possível carregar os dados do veículo informado no momento, tente novamente em instantes"} />
                : <FormularioVeiculo modo="edicao" veiculo={veiculoResponse.data?.veiculo} clientes={clienteResponse.data?.clientes} />
            }
        </main>
    )
}