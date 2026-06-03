type PerfilUsuarioProps = {
    nome: string;
    perfil: string;
}

export function PerfilUsuario({ nome, perfil }: PerfilUsuarioProps) {
    const inicial = nome ? nome.charAt(0).toUpperCase() : "U";
    return (
        <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-bold text-white">
                {inicial}
            </div>
            <div className="hidden sm:block">
                <strong className="block text-sm">{nome}</strong>
                <span className="text-xs text-slate-500">{perfil}</span>
            </div>
        </div>
    )
}