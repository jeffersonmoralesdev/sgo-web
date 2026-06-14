import { ReactNode } from "react"

export type BotaoProps = {
    children: ReactNode,
    type: "button" | "submit";
    onClick?: () => void;
    disabled: boolean;
    variant?: "default" | "primary" | "toast";
}
export function Botao({
    children,
    type = "button",
    onClick,
    disabled,
    variant = "primary" }: BotaoProps) {

    const baseClass = "flex h-10 items-center justify-center gap-2 rounded-xl px-4 text-sm font-semibold transition-colors hover:cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 "

    const variants = {
        default:
            "border border-slate-300 text-slate-700 hover:bg-slate-50",
        primary: "bg-blue-600 text-white shadow-sm hover:bg-blue-700",
        toast: "rounded-lg p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 hover:cursor-pointer"
    }
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${baseClass} ${variants[variant]}`}
        >
            {children}
        </button>
    )
}