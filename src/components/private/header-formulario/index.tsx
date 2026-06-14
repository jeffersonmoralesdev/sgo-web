import { UserRound } from "lucide-react";

type HeaderFormularioCliente = {
    titulo: string;
    descricao: string;
}

export function HeaderFormulario({ titulo, descricao }: HeaderFormularioCliente) {
    return (
        <div className="border-b border-slate-200 p-4">
            <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                    <UserRound size={22} />
                </div>

                <div>
                    <h2 className="font-bold text-slate-950">
                        {titulo}
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">
                        {descricao}
                    </p>
                </div>
            </div>
        </div>
    )
}