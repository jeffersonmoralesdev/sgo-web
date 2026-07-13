"use client"
import { ActionResponse } from "@/src/types/action-response";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { HeaderFormulario } from "../../header-formulario";
import { Car, ClipboardList, Save } from "lucide-react";
import { Botao } from "../../botao";
import { SessaoExpiradaModal } from "../../sessao-expirada-modal";
import { ToastFeedback } from "../../toast-feedback";
import { VeiculoModel } from "@/src/model/veiculo/veiculo-model";
import { CampoSelect } from "../../campo-select";
import Link from "next/link";
import { OrdemServicoModel } from "@/src/model/ordens-servico/ordens-servico-model";
import { registrarOrdemServicosAction } from "@/src/actions/ordem-servico/ordem-servico-action";
import { CampoTextArea } from "../../campo-text-area";
import { aplicarMascaraPlaca } from "@/src/utils/mascara";

type ModoFormulario = "cadastro" | "edicao";

type FormularioOrdemServicoProps = {
    modo: ModoFormulario;
    ordemServico?: OrdemServicoModel;
    veiculos: VeiculoModel[];
}
const initialState: ActionResponse = {
    success: false,
};

export function FormularioOrdemServico({ modo, ordemServico, veiculos }: FormularioOrdemServicoProps) {
    const router = useRouter();
    const isEdicao = modo === "edicao";

    const action = registrarOrdemServicosAction;
    const [state, formAction, isPending] = useActionState(action, initialState);

    const [descricaoProblema, setDescricaoProblema] = useState(ordemServico?.descricaoProblema ?? "");
    const [observacao, setObservacao] = useState(String(ordemServico?.observacao ?? ""));
    const [veiculoId, setVeiculoId] = useState(String(ordemServico?.veiculoId ?? ""));

    const campoErrors = state.errors && typeof state.errors !== "string" ? state.errors : null;
    const geralError = typeof state.errors === "string" ? state.errors : "";

    const [toastErroFechado, setToastErroFechado] = useState(false);
    const sessaoExpiradaOpen = state.status === "UNAUTHORIZED";
    const toastErroOpen = state.status === "ERROR" && !toastErroFechado;

    const tituloHeader = isEdicao ? "Editar ordem de serviço" : "Informações da ordem de serviço";
    const descricaoHeader = isEdicao ? "Atualize os dados cadastrais da ordem de serviço." : "Informe os dados cadastrais para registrar uma nova ordem de serviço.";
    const textoBotao = isEdicao ? "Salvar alterações" : "Cadastrar ordem de serviço";
    const textoCarregando = isEdicao ? "Salvando..." : "Cadastrando...";
    const tituloErro = isEdicao ? "Erro ao atualizar dados da ordem de serviço" : "Erro ao cadastrar ordem de serviço";

    const retornoCadastroVeiculo = isEdicao && ordemServico?.id
        ? `/ordens-servico/editar/${ordemServico.id}`
        : "/ordens-servico/cadastro";

    const hrefCadastrarCliente = `/veiculos/cadastro?retorno=${encodeURIComponent(retornoCadastroVeiculo)}`;

    const veiculosOptions = veiculos.map((veiculo) => ({
        value: String(veiculo.id),
        label: `${aplicarMascaraPlaca(veiculo.placa)} • ${veiculo.modelo}`,
    }));

    function redirecionarParaLogin() {
        router.push("/login");
    }

    useEffect(() => {
        if (state?.status === "SUCCESS") {
            const toast = isEdicao ? "ordem-servico-atualizada" : "ordem-servico-cadastrada";
            router.push(`/ordens-servico?toast=${toast}`);
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
                        {isEdicao && ordemServico?.id && (
                            <input type="hidden" name="id" value={ordemServico.id} />
                        )}

                        <CampoTextArea
                            label="Descricao do problema"
                            name="descricaoProblema"
                            value={descricaoProblema}
                            placeHolder="Descreva o problema relatado pelo clíente."
                            icon={ClipboardList}
                            error={campoErrors?.descricaoProblema?.[0]}
                            onChange={setDescricaoProblema}
                        />
                        <CampoTextArea
                            label="Observações"
                            name="observacao"
                            value={observacao}
                            placeHolder="Observações."
                            icon={ClipboardList}
                            error={campoErrors?.observacao?.[0]}
                            onChange={setObservacao}
                            rows={2}
                        />
                        <CampoSelect
                            label="Veículo"
                            name="veiculoId"
                            value={veiculoId}
                            placeholder="Selecione o veículo pela placa"
                            error={campoErrors?.veiculoId?.[0]}
                            icon={Car}
                            options={veiculosOptions}
                            onChange={setVeiculoId}
                            disabled={veiculosOptions.length === 0}
                            className="md:col-span-2"
                            helper={
                                <Link
                                    href={hrefCadastrarCliente}
                                    className="font-medium text-blue-600 hover:underline"
                                >
                                    Veículo ainda não cadastrado? Cadastrar veículo

                                </Link>

                            }
                        />

                    </div>
                    <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
                        <Botao type="button" onClick={() => router.push("/ordens-servico")} disabled={isPending} variant="default">
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