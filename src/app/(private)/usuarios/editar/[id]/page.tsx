import { ErrorListagem } from "@/src/components/private/error-listagem";
import { HeaderPage } from "@/src/components/private/header-page";
import { FormularioUsuario } from "@/src/components/private/usuario/formulario-usuario";
import { buscarUsuarioPorIdQuery } from "@/src/queries/usuario";
import { notFound } from "next/navigation";
type EditarUsuarioPageProps = {
    params: Promise<{
        id: string;
    }>;
}
export default async function EditarUsuariosPage({ params }: EditarUsuarioPageProps) {
    const { id } = await params;
    const idNumero = Number(id);
    
    if (Number.isNaN(idNumero)) {
        notFound();
    }
    const { data, status, error } = await buscarUsuarioPorIdQuery(idNumero);
    console.log("dados do usuario",data?.usuario)
    return (
        <main className="space-y-6">
            <HeaderPage
                titulo="Editar usuário"
                descricao="Atualize as informações cadastrais do usuário."
            />
            {status === "ERROR"
                ? <ErrorListagem titulo="Erro ao carregar dados do usuário" error={error ?? "Não foi possível carregar os dados do usuário informado no momento, tente novamente em instantes"} />
                : <FormularioUsuario modo="edicao" usuario={data?.usuario} />
            }
        </main>
    )
}