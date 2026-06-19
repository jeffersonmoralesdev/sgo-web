
import { HeaderPage } from "@/src/components/private/header-page";
import { FormularioUsuario } from "@/src/components/private/usuario/formulario-usuario";

export default function CadastroUsuariosPage() {
    return (
        <main className="space-y-6">
            <HeaderPage
                titulo="Cadastrar usuário"
                descricao="Preencha as informações necessárias para registrar um novo usuário na oficina."
            />
            <FormularioUsuario modo="cadastro" />
        </main>
    )
}