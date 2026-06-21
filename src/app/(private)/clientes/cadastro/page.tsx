
import { FormularioCliente } from "@/src/components/private/cliente/formulario-cliente";
import { HeaderPage } from "@/src/components/private/header-page";
type CadastroClientePageProps = {
    searchParams: Promise<{
        retorno?: string;
    }>;
}



export default async function CadastroClientePage({searchParams}:CadastroClientePageProps) {
    const {retorno} = await searchParams
    return (
        <main className="space-y-6">
            <HeaderPage
                titulo="Cadastrar cliente"
                descricao="Preencha as informações necessárias para registrar um novo cliente na oficina."
            />
            <FormularioCliente modo="cadastro" paramsRetorno={retorno} />
        </main>
    )
}