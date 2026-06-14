import { LucideIcon } from "lucide-react";

type CampoFormularioprops = {
    label: string;
    name: string;
    type?: string;
    value: string;
    placeholder?: string;
    error?: string;
    icon: LucideIcon;
    onChange: (value: string) => void;
}
export function CampoFormulario({ label, name, type = "text", value, placeholder, error, icon: Icon, onChange }: CampoFormularioprops) {
    return (
        <div>
            <label
                htmlFor={name}
                className="mb-2 block text-sm font-semibold text-slate-900"
            >
                {label}
            </label>

            <div className="flex h-12 items-center gap-3 rounded-xl border border-slate-300 px-3 transition-colors focus-within:border-blue-400 focus-within:ring-4 focus-within:ring-blue-50">
                <Icon size={18} className="shrink-0 text-slate-400" />

                <input
                    id={name}
                    name={name}
                    type={type}
                    value={value}
                    onChange={(event) => onChange(event.target.value)}
                    className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
                    placeholder={placeholder}
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