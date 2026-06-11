import { AlertCircle } from "lucide-react";

type ErrorListagemProps = {
    titulo: string;
    error: string;
}

export function ErrorListagem({ titulo, error }: ErrorListagemProps) {
    return (
        <div className="max-w-4xl rounded-2xl border border-red-200 bg-red-50 p-4 text-red-700 shadow-sm">
            <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-red-100">
                    <AlertCircle size={20} className="text-red-600" />
                </div>

                <div>
                    <h3 className="font-bold text-red-900">
                        {titulo}
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-red-700">
                        {error}
                    </p>
                </div>
            </div>
        </div>
    )
}