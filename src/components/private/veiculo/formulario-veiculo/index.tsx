"use client"

import { atualizarUsuarioAction, registrarUsuarioAction } from "@/src/actions/usuario/usuario-actions";
import { UsuarioResponse } from "@/src/model/usuario/usuario-model";
import { ActionResponse } from "@/src/types/action-response";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { HeaderFormulario } from "../../header-formulario";
import { CampoFormulario } from "../../campo-formulario";
import { Car, Save, User } from "lucide-react";
import { Botao } from "../../botao";
import { SessaoExpiradaModal } from "../../sessao-expirada-modal";
import { ToastFeedback } from "../../toast-feedback";
import { VeiculoModel } from "@/src/model/veiculo/veiculo-model";
import { CampoSelect } from "../../campo-select";
import { ClienteModel} from "@/src/model/cliente/cliente-model";
import { mascararCpfParcial } from "@/src/utils/mascara";
import Link from "next/link";
import { atualizarVeiculoAction, registrarVeiculoAction } from "@/src/actions/veiculo/veiculo-actions";


type ModoFormulario = "cadastro" | "edicao";

type FormularioVeiculoProps = {
    modo: ModoFormulario;
    veiculo?: VeiculoModel;
    clientes?: ClienteModel[];
}
const initialState: ActionResponse<VeiculoModel> = {
    success: false,
};

export function FormularioVeiculo({ modo, veiculo, clientes }: FormularioVeiculoProps) {
    const router = useRouter();

    const isEdicao = modo === "edicao";
    const action = isEdicao ? atualizarVeiculoAction : registrarVeiculoAction;

    const [state, formAction, isPending] = useActionState(action, initialState);

    const [modelo, setModelo] = useState(veiculo?.modelo ?? "");
    const [marca, setMarca] = useState(veiculo?.marca ?? "");
    const [ano, setAno] = useState(String(veiculo?.ano ?? ""));
    const [placa, setPlaca] = useState(veiculo?.placa ?? "")
    const [quilometragem, setQuilometragem] = useState(String(veiculo?.quilometragem ?? ""))
    const [cor, setCor] = useState(veiculo?.cor ?? "")
    const [clienteId, setClienteId] = useState(String(veiculo?.clienteId ?? ""));

    //continuar daqui para baixo

    const campoErrors = state.errors && typeof state.errors !== "string" ? state.errors : null;
    const geralError = typeof state.errors === "string" ? state.errors : "";
    console.log("camposErrors",campoErrors)
    console.log("geralError",geralError)
    const [toastErroFechado, setToastErroFechado] = useState(false);
    const sessaoExpiradaOpen = state.status === "UNAUTHORIZED";
    const toastErroOpen = state.status === "ERROR" && !toastErroFechado;

    const tituloHeader = isEdicao ? "Editar veículo" : "Informações do veículo";
    const descricaoHeader = isEdicao ? "Atualize os dados cadastrais do veículo." : "Informe os dados cadastrais para registrar um novo veículo.";
    const textoBotao = isEdicao ? "Salvar alterações" : "Cadastrar veículo";
    const textoCarregando = isEdicao ? "Salvando..." : "Cadastrando...";
    const tituloErro = isEdicao ? "Erro ao atualizar dados do veículo" : "Erro ao cadastrar veículo";

    const retornoCadastroCliente = isEdicao && veiculo?.id
        ? `/veiculos/editar/${veiculo.id}`
        : "/veiculos/cadastro";

    const hrefCadastrarCliente = `/clientes/cadastro?retorno=${encodeURIComponent(retornoCadastroCliente)}`;

    const clientesOptions = (clientes ?? []).map((cliente) => ({
        value: String(cliente.id),
        label: `${cliente.nome} - CPF ${mascararCpfParcial(cliente.cpf)} ${
        cliente.ativo ? "" : " (inativo)"}`,
    }));
    function redirecionarParaLogin() {
        router.push("/login");
    }

    useEffect(() => {
        if (state?.status === "SUCCESS") {
            const toast = isEdicao ? "veiculo-atualizado" : "veiculo-cadastrado";
            router.push(`/veiculos?toast=${toast}`);
        }
    }, [state?.status, router, isEdicao]);

    return (
        <>
            <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
                <HeaderFormulario
                    titulo={tituloHeader}
                    descricao={descricaoHeader}
                />
                <form action={formAction} onSubmit={() => setToastErroFechado(false)} className="space-y-5 p-4">
                    <div className="grid gap-4 md:grid-cols-2">
                        {isEdicao && veiculo?.id && (
                            <input type="hidden" name="id" value={veiculo.id} />
                        )}

                        <CampoFormulario
                            label="Modelo"
                            name="modelo"
                            value={modelo}
                            placeholder="Modelo do Veículo"
                            error={campoErrors?.modelo?.[0]}
                            icon={Car}
                            onChange={setModelo}
                        />

                        <CampoFormulario
                            label="Marca"
                            name="marca"
                            value={marca}
                            placeholder="Marca do veículo"
                            error={campoErrors?.marca?.[0]}
                            icon={Car}
                            onChange={setMarca}
                        />

                        <CampoFormulario
                            label="Ano"
                            name="ano"
                            value={ano}
                            placeholder="Ano do Veículo"
                            error={campoErrors?.ano?.[0]}
                            icon={Car}
                            onChange={setAno}
                        />

                        <CampoFormulario
                            label="Placa"
                            name="placa"
                            value={placa}
                            placeholder="Placa do veículo"
                            error={campoErrors?.placa?.[0]}
                            icon={Car}
                            onChange={setPlaca}
                        />

                        <CampoFormulario
                            label="Quilometragem"
                            name="quilometragem"
                            value={quilometragem}
                            placeholder="Quilometragem do veículo"
                            error={campoErrors?.quilometragem?.[0]}
                            icon={Car}
                            onChange={setQuilometragem}
                        />

                        <CampoFormulario
                            label="Cor"
                            name="cor"
                            value={cor}
                            placeholder="Cor do veículo"
                            error={campoErrors?.cor?.[0]}
                            icon={Car}
                            onChange={setCor}
                        />
                        
                        <CampoSelect
                            label="Cliente responsável"
                            name="clienteId"
                            value={clienteId}
                            placeholder="Selecione o cliente responsável"
                            error={campoErrors?.clienteId?.[0]}
                            icon={User}
                            options={clientesOptions}
                            onChange={setClienteId}
                            disabled={clientesOptions.length === 0}
                            helper={
                                <Link
                                    href={hrefCadastrarCliente}
                                    className="font-medium text-blue-600 hover:underline"
                                >
                                    Cliente ainda não cadastrado? Cadastrar cliente
                                </Link>

                            }
                        />
                        


                        {/* tratar de como vai ser exibição de ciliente e se ele não tiver cadastro como fara exibir nome não id */}

                    </div>
                    <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
                        <Botao type="button" onClick={() => router.push("/veiculos")} disabled={isPending} variant="default">
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
                onClose={() => setToastErroFechado(true)} />
        </>
    )
}