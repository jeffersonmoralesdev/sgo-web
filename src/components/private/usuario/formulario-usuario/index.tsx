"use client"

import { atualizarUsuarioAction, registrarUsuarioAction } from "@/src/actions/usuario/usuario-actions";
import { UsuarioResponse } from "@/src/model/usuario/usuario-model";
import { ActionResponse } from "@/src/types/action-response";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { HeaderFormulario } from "../../header-formulario";
import { CampoFormulario } from "../../campo-formulario";
import { Eye, EyeOff, Lock, Mail, Save, User } from "lucide-react";
import { Botao } from "../../botao";
import { SessaoExpiradaModal } from "../../sessao-expirada-modal";
import { ToastFeedback } from "../../toast-feedback";


type ModoFormulario = "cadastro" | "edicao";
type FormularioUsuarioProps = {
    modo: ModoFormulario;
    usuario?: UsuarioResponse;
}
const initialState: ActionResponse<UsuarioResponse> = {
    success: false,
};

export function FormularioUsuario({ modo, usuario }: FormularioUsuarioProps) {
    const router = useRouter();

    const isEdicao = modo === "edicao";
    const action = isEdicao ? atualizarUsuarioAction : registrarUsuarioAction;

    const [state, formAction, isPending] = useActionState(action, initialState);

    const [nome, setNome] = useState(usuario?.nome ?? "");
    const [email, setEmail] = useState(usuario?.email ?? "");
    const [perfil, setPerfil] = useState(usuario?.perfil ?? "");
    const [senha, setSenha] = useState("")
    const [visualizarSenha, setVisualizarSenha] = useState(false);
    

    const campoErrors = state.errors && typeof state.errors !== "string" ? state.errors : null;
    const geralError = typeof state.errors === "string" ? state.errors : "";
    
    const [toastErroFechado, setToastErroFechado] = useState(false);
    const sessaoExpiradaOpen = state.status === "UNAUTHORIZED";
    const toastErroOpen = state.status === "ERROR" && !toastErroFechado;

    const tituloHeader = isEdicao ? "Editar usuário" : "Informações do usuário";
    const descricaoHeader = isEdicao ? "Atualize os dados cadastrais do usuário." : "Informe os dados cadastrais para registrar um novo usuário.";
    const textoBotao = isEdicao ? "Salvar alterações" : "Cadastrar usuário";
    const textoCarregando = isEdicao ? "Salvando..." : "Cadastrando...";
    const tituloErro = isEdicao ? "Erro ao atualizar dados do usuário" : "Erro ao cadastrar usuário";

    function redirecionarParaLogin() {
        router.push("/login");
    }

    useEffect(() => {
        if (state?.status === "SUCCESS") {
            const toast = isEdicao ? "usuario-atualizado" : "usuario-cadastrado";
            router.push(`/usuarios?toast=${toast}`);
        }
    }, [state?.status, router, isEdicao]);

    return (
        <>
            <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
                <HeaderFormulario
                    titulo={tituloHeader}
                    descricao={descricaoHeader}
                />
                <form action={formAction} onSubmit={()=>setToastErroFechado(false)} className="space-y-5 p-4">
                    <div className="grid gap-4 md:grid-cols-2">
                        {isEdicao && usuario?.id && (
                            <input type="hidden" name="id" value={usuario.id} />
                        )}

                        <CampoFormulario
                            label="Nome"
                            name="nome"
                            value={nome}
                            placeholder="Nome do usuário"
                            error={campoErrors?.nome?.[0]}
                            icon={User}
                            onChange={setNome}
                        />

                        <CampoFormulario
                            label="E-mail"
                            name="email"
                            value={email}
                            placeholder="email@exemplo.com"
                            error={campoErrors?.email?.[0]}
                            icon={Mail}
                            onChange={setEmail}
                        />

                        <CampoFormulario
                            label="Perfil"
                            name="perfil"
                            value={perfil}
                            placeholder="Perfil do usuário ADMIN | OPERADOR"
                            error={campoErrors?.perfil?.[0]}
                            icon={User}
                            onChange={setPerfil}
                        />

                        <CampoFormulario
                            label="Senha"
                            name="senha"
                            value={senha}
                            placeholder="••••••••"
                            error={campoErrors?.senha?.[0]}
                            icon={Lock}
                            onChange={setSenha}
                            type={visualizarSenha ? "text" : "password"}
                            rightIcon={visualizarSenha ? EyeOff : Eye}
                            onClickChangeRightIcon={() => setVisualizarSenha((valorAnterior) => !valorAnterior)}
                            rightIconLabel={visualizarSenha ? "Ocultar senha" : "Mostrar senha"}

                        />
                    </div>
                    <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
                        <Botao type="button" onClick={() => router.push("/usuarios")} disabled={isPending} variant="default">
                            {isEdicao ? <>Cancelar</> : <>Voltar</>}
                        </Botao>
                        <Botao type="submit" disabled={isPending} variant="primary">
                            <Save size={16} />
                            {isPending ? textoCarregando : textoBotao}
                        </Botao>
                    </div>
                </form>
            </section>
            <SessaoExpiradaModal
                open={sessaoExpiradaOpen}
                segundos={30}
                onRedirect={redirecionarParaLogin}
            />
            <ToastFeedback
                open={toastErroOpen}
                tipo="ERROR"
                titulo={tituloErro}
                mensagem={geralError}
                onClose={() =>setToastErroFechado(true)} />
        </>
    )
}