'use client'
import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";

type FiltroListaProps = {
    paramsFiltro?: string;
    placeHolder:string;
}

export function FiltroLista({ paramsFiltro = "", placeHolder }: FiltroListaProps) {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();
    const pathName = usePathname();
    const searchParams = useSearchParams();
    const [filtro, setFiltro] = useState(paramsFiltro);

    function atualizarFiltro(valor: string) {
        setFiltro(valor);
        const params = new URLSearchParams(searchParams);

        if (valor.trim()) {
            params.set("filtro", valor);
        } else {
            params.delete("filtro");
        }

        startTransition(() => {
            const queryString = params.toString();
            router.push(queryString ? `${pathName}?${queryString}` : pathName)
        });
    }

    return (
        <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
            <Search size={18} className="text-slate-400" />
            <input
                type="text"
                value={filtro}
                onChange={(event) => atualizarFiltro(event.target.value)}
                placeholder={`Buscar ${placeHolder}...`}
                className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400 sm:w-64"
            />
            {isPending && (
                <span className="text-xs text-slate-400">
                    Buscando...
                </span>
            )}
        </div>
    )
}