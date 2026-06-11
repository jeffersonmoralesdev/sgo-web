type ListaContagemProps = {
    titulo: string;
    total: number;
    nome: string;
    existeFiltro: boolean;
    paramsFiltro: string;
}

export function ListaContagem({ titulo, total, nome, existeFiltro, paramsFiltro }: ListaContagemProps) {
    return (
        <div>
            <h2 className="font-bold text-slate-950">{titulo}</h2>
            {total === 0
                ? (<p className="mt-1 text-sm text-slate-500">
                    {existeFiltro
                        ? `Nenhum ${nome} encontrado para "${paramsFiltro}".`
                        : `Nenhum ${nome} cadastrado.`
                    }
                </p>)
                : (
                    <p className="mt-1 text-sm text-slate-500">
                        {existeFiltro
                            ? `${total} ${nome}(s) encontrado(s) para "${paramsFiltro}".`
                            : `Total de ${total} ${nome}s cadastrados.`}
                    </p>)
            }
        </div>
    )
}