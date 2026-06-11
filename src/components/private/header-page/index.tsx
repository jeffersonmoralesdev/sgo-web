type HeaderPageProps = {
    titulo: string;
    descricao: string;
}

export function HeaderPage({ titulo, descricao }: HeaderPageProps) {
    return (
        <div>
            <h1 className="text-3xl font-bold text-slate-950">
                {titulo}
            </h1>
            <p className="mt-1 text-sm text-slate-500">
                {descricao}
            </p>
        </div>
    )
}