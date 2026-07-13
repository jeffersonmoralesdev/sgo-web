import { HeaderPage } from "@/src/components/private/header-page";
import { FormularioOrdemServico } from "@/src/components/private/ordem-servico/formulario-ordem-servico";
import { ToastPorUrl } from "@/src/components/private/toast-por-url";
import { listarVeiculosQuery } from "@/src/queries/veiculo";



type CadastroOrdemServicoPageProps = {
    searchParams: Promise<{
        toast?: string;
    }>
}
export default async function CadastroOrdemServicoPage({ searchParams }: CadastroOrdemServicoPageProps) {
    const { toast } = await searchParams;
    const result = await listarVeiculosQuery();

    return (
        <main className="space-y-6">
            <ToastPorUrl parametroToast={toast} />
            <HeaderPage
                titulo="Cadastrar ordem de serviço"
                descricao="Preencha as informações necessárias para registrar uma nova ordem de serviço na oficina."
            />
            <FormularioOrdemServico modo="cadastro" veiculos={result.success ? result.data.veiculos : []} />
        </main>
    )
}
