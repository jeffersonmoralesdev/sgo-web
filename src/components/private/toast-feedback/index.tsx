'use client'
import { CheckCircle2, CircleAlert, X } from "lucide-react";
import { useEffect } from "react";
import { Botao } from "../botao";

type ToastFeedbackProps = {
    open: boolean;
    tipo: "SUCCESS" | "ERROR";
    titulo: string;
    mensagem: string;
    duration?: number;
    onClose: () => void;
}
export function ToastFeedback({
    open,
    tipo,
    titulo,
    mensagem,
    duration = 5000,
    onClose
}: ToastFeedbackProps) {
    const isSuccess = tipo === "SUCCESS";

    useEffect(() => {
        if (!open) return;
        const timer = setTimeout(() => onClose(), duration);
        return () => clearTimeout(timer);

    }, [open, duration, onClose])
    if (!open) return null;
    return (
        <div className="fixed right-5 top-5 z-50 w-[calc(100%-2.5rem)] max-w-sm rounded-2xl border bg-white p-4 shadow-xl">
            <div className="flex items-start gap-3">
                {isSuccess
                    ? <CheckCircle2 size={22} className="mt-0.5 text-green-600" />
                    : <CircleAlert size={22} className="mt-0.5 text-red-600" />
                }
                <div className="flex-1">
                    <p className="text-sm font-bold text-slate-950">{titulo}</p>
                    <p className="mt-1 text-sm text-slate-600">{mensagem}</p>
                </div>
                
                <Botao type="button" disabled={false} onClick={onClose} variant="toast">
                    <X size={16} />
                </Botao>
            </div>
        </div>
    )
}