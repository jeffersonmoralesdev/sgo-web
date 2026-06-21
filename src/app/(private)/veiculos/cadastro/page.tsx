import { HeaderPage } from "@/src/components/private/header-page";
import { ToastPorUrl } from "@/src/components/private/toast-por-url";
import { FormularioVeiculo } from "@/src/components/private/veiculo/formulario-veiculo";
import { listarClientesQuery } from "@/src/queries/cliente";



type CadastroVeiculoPageProps = {
    searchParams: Promise<{
        toast?: string;
    }>
}
export default async function CadastroVeiculosPage({ searchParams }: CadastroVeiculoPageProps) {
    const { toast } = await searchParams;
    const { data, status, error } = await listarClientesQuery();
    
    return (
        <main className="space-y-6">
            <ToastPorUrl parametroToast={toast} />
            <HeaderPage
                titulo="Cadastrar veículo"
                descricao="Preencha as informações necessárias para registrar um novo veículo na oficina."
            />
            <FormularioVeiculo modo="cadastro" clientes={data?.clientes} />
        </main>
    )
}