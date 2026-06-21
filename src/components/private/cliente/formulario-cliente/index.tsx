"use client"

import { ActionResponse } from "@/src/types/action-response";
import { ClienteModel } from "@/src/model/cliente/cliente-model";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { atualizarClienteAction, registrarClienteAction } from "@/src/actions/cliente/cliente-actions";
import { aplicarMascaraCpf, aplicarMascaraTelefone } from "@/src/utils/mascara";
import { Botao } from "../../botao";
import { Mail, Phone, Save, User, UserRound } from "lucide-react";
import { SessaoExpiradaModal } from "../../sessao-expirada-modal";
import { ToastFeedback } from "../../toast-feedback";
import { HeaderFormulario } from "../../header-formulario";
import { CampoFormulario } from "../../campo-formulario";


type ModoFormulario = "cadastro" | "edicao";
type FormularioClienteProps = {
    modo: ModoFormulario;
    cliente?: ClienteModel;
    paramsRetorno?:string;
}
const initialState: ActionResponse<ClienteModel> = {
    success: false,
};

export function FormularioCliente({ modo, cliente, paramsRetorno }: FormularioClienteProps) {
    const router = useRouter();

    const isEdicao = modo === "edicao";
    const action = isEdicao ? atualizarClienteAction : registrarClienteAction;

    const [state, formAction, isPending] = useActionState(action, initialState);

    const [nome, setNome] = useState(cliente?.nome ?? "");
    const [cpf, setCpf] = useState(cliente?.cpf ? aplicarMascaraCpf(cliente.cpf) : "");
    const [telefone, setTelefone] = useState(cliente?.telefone ? aplicarMascaraTelefone(cliente.telefone) : "");
    const [email, setEmail] = useState(cliente?.email ?? "");

    const campoErrors = state.errors && typeof state.errors !== "string" ? state.errors : null;
    const geralError = typeof state.errors === "string" ? state.errors : "";

    const sessaoExpiradaOpen = state.status === "UNAUTHORIZED";
    const toastErroOpen = state.status === "ERROR";

    const tituloHeader = isEdicao ? "Editar cliente" : "Informações do cliente";
    const descricaoHeader = isEdicao ? "Atualize os dados cadastrais do cliente." : "Informe os dados cadastrais para registrar um novo cliente.";
    const textoBotao = isEdicao ? "Salvar alterações" : "Cadastrar cliente";
    const textoCarregando = isEdicao ? "Salvando..." : "Cadastrando...";
    const tituloErro = isEdicao ? "Erro ao atualizar cliente" : "Erro ao cadastrar cliente";

    function redirecionarParaLogin() {
        router.push("/login");
    }

    useEffect(() => {
        if (state?.status === "SUCCESS") {
            const toast = isEdicao ? "cliente-atualizado" : "cliente-cadastrado";
            if(paramsRetorno){
                router.push(`${paramsRetorno}?toast=${toast}`);  
                return  
            }
            router.push(`/clientes?toast=${toast}`);
        }
    }, [state?.status, router, isEdicao]);

    return (
        <>
            <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
                <HeaderFormulario
                    titulo={tituloHeader}
                    descricao={descricaoHeader}
                />
                <form action={formAction} className="space-y-5 p-4">
                    <div className="grid gap-4 md:grid-cols-2">
                        {isEdicao && cliente?.id && (
                            <input type="hidden" name="id" value={cliente.id} />
                        )}

                        <CampoFormulario
                            label="Nome"
                            name="nome"
                            value={nome}
                            placeholder="Nome do cliente"
                            error={campoErrors?.nome?.[0]}
                            icon={User}
                            onChange={setNome}
                        />

                        <CampoFormulario
                            label="CPF"
                            name="cpf"
                            value={cpf}
                            placeholder="CPF do cliente"
                            error={campoErrors?.cpf?.[0]}
                            icon={UserRound}
                            onChange={(value) => setCpf(aplicarMascaraCpf(value))}
                        />

                        <CampoFormulario
                            label="Telefone"
                            name="telefone"
                            value={telefone}
                            placeholder="Telefone do cliente"
                            error={campoErrors?.telefone?.[0]}
                            icon={Phone}
                            onChange={(value) => setTelefone(aplicarMascaraTelefone(value))}
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

                    </div>
                    <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
                        <Botao type="button" onClick={() => router.push("/clientes")} disabled={isPending} variant="default">
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
                onClose={() => { }} />
        </>
    )
}