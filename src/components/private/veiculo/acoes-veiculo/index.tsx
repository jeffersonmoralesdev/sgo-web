import { Pencil, Trash2, UserCheck, UserX } from "lucide-react";
import { BotaoDeAcao } from "../../botao-acoes";

type AcoesVeiculoProps = {
    isAdmin: boolean;
    onEdit?: () => void;
    onExcluir?: () => void;
}
export function AcoesVeiculo({
    isAdmin,
    onEdit,
    onExcluir }: AcoesVeiculoProps) {
    return (
        <div className="flex gap-2 md:justify-end">
            <BotaoDeAcao
                icon={Pencil}
                label="Editar"
                variant="default"
                onClick={onEdit}
            />
            {isAdmin && <BotaoDeAcao
                icon={Trash2}
                label="Excluir"
                variant="danger"
                onClick={onExcluir}
            />}
        </div>
    )
}