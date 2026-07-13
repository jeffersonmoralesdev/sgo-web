import { LucideIcon } from "lucide-react";

type CampoTextAreaProps = {
    label: string;
    name: string;
    value: string;
    placeHolder: string;
    error?: string;
    icon: LucideIcon;
    onChange: (value: string) => void;
    rows?: number
}

export function CampoTextArea({
    label,
    name,
    value,
    placeHolder,
    error,
    icon: Icon,
    onChange,
    rows = 5
}: CampoTextAreaProps) {

    return (
        <div className="space-y-2 md:col-span-2">
            <label htmlFor={name} className="mb-2 block text-sm font-semibold text-slate-900">
                {label}
            </label>
            <div className="flex items-start gap-3 py-3  rounded-xl border border-slate-300 px-3 transition-colors focus-within:border-blue-400 focus-within:ring-4 focus-within:ring-blue-50">
                <Icon size={18} className="mt-1 shrink-0 text-slate-400" />
                <textarea
                    name={name}
                    placeholder={placeHolder}
                    rows={rows}
                    className="min-w-0 flex-1 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
                    value={value}
                    onChange={(event) => onChange(event.target.value)}
                />
            </div>
            {error && (
                <p className="mt-2 text-sm font-medium text-red-600">
                    {error}
                </p>
            )}
        </div>

    )
}