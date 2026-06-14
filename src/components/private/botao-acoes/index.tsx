import type { LucideIcon } from "lucide-react";

type ActionButtonProps = {
    icon: LucideIcon;
    label: string;
    variant: "default" | "warning" | "success" | "danger";
    onClick?: () => void;
};

const variantClasses = {
    default:
        "border-slate-200 text-slate-700 hover:bg-slate-100",
    warning:
        "border-orange-100 text-orange-600 hover:bg-orange-50",
    success:
        "border-green-100 text-green-600 hover:bg-green-50",
    danger:
        "border-red-100 text-red-600 hover:bg-red-50",
};

export function BotaoDeAcao({
    icon: Icon,
    label,
    variant,
    onClick,
}: ActionButtonProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`
                flex h-9 flex-1 items-center justify-center gap-2 rounded-lg border px-3 
                text-sm font-semibold transition-colors md:w-9 md:flex-initial md:px-0 hover:cursor-pointer
                ${variantClasses[variant]}
            `}
            title={label}
        >
            <Icon size={16} />
            <span className="md:hidden">{label}</span>
        </button>
    );
}