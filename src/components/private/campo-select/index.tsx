import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

type SelectOption = {
    value: string;
    label: string;
};

type CampoSelectProps = {
    label: string;
    name: string;
    value: string;
    options: SelectOption[];
    placeholder?: string;
    error?: string;
    icon: LucideIcon;
    onChange: (value: string) => void;
    disabled?: boolean;
    helper?: ReactNode;
};

export function CampoSelect({
    label,
    name,
    value,
    options,
    placeholder = "Selecione uma opção",
    error,
    icon: Icon,
    onChange,
    disabled = false,
    helper,
}: CampoSelectProps) {
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

                <select
                    id={name}
                    name={name}
                    value={value}
                    disabled={disabled}
                    onChange={(event) => onChange(event.target.value)}
                    className="min-w-0 flex-1 bg-transparent text-sm text-slate-700 outline-none"
                >
                    <option value="">{placeholder}</option>

                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>

            {error && (
                <p className="mt-2 text-sm font-medium text-red-600">
                    {error}
                </p>
            )}
            {!error && helper &&(
                <div className="mt-2 text-sm">
                    {helper}
                </div>
            ) }
        </div>
    );
}