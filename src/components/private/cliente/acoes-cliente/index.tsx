import { Pencil, Trash2, UserCheck, UserX } from "lucide-react";
import { BotaoDeAcao } from "../../botao-acoes";

type AcoesClienteProps = {
    ativo: boolean;
    isAdmin: boolean;
    onEdit?: () => void;
    onInativar?: () => void;
    onAtivar?: () => void;
    onExcluir?: () => void;
}
export function AcoesCliente({
    ativo,
    isAdmin,
    onEdit,
    onInativar,
    onAtivar,
    onExcluir }: AcoesClienteProps) {
    return (
        <div className="flex gap-2 md:justify-end">
            {ativo
                ? (
                    <>
                        <BotaoDeAcao
                            icon={Pencil}
                            label="Editar"
                            variant="default"
                            onClick={onEdit}
                        />
                        {isAdmin &&
                            <BotaoDeAcao
                                icon={UserX}
                                label="Inativar"
                                variant="warning"
                                onClick={onInativar}
                            />
                        }
                    </>)
                : (
                    <>
                        {isAdmin &&
                            (<>
                                <BotaoDeAcao
                                    icon={UserCheck}
                                    label="Ativar"
                                    variant="success"
                                    onClick={onAtivar}
                                />

                                <BotaoDeAcao
                                    icon={Trash2}
                                    label="Excluir"
                                    variant="danger"
                                    onClick={onExcluir}
                                />
                            </>)
                        }
                    </>
                )}
        </div>
    )

}