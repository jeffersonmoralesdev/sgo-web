import { PerfilUsuario } from "../perfil-usuario";

type HeaderProps = {
    nome: string;
    perfil: string
}

export function Header({ nome, perfil }: HeaderProps) {
    return (
        <header className=" flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 lg:h-20 lg:px-8 ">
            <div>
                <strong className="block text-sm lg:text-lg">SGO Oficina</strong>
                <span className="text-xs text-slate-500 lg:hidden">
                    Sistema de gestão
                </span>
            </div>
            <PerfilUsuario nome={nome} perfil={perfil} />
        </header>
    )
}