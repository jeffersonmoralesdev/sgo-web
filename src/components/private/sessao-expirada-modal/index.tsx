'use client'

import { AlertTriangle, LogIn } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

type SessaoExpiradaModalProps = {
    open: boolean;
    segundos?: number;
    onRedirect: () => void;
}

export function SessaoExpiradaModal({ open, segundos = 5, onRedirect }: SessaoExpiradaModalProps) {
    const [contador, setContador] = useState(segundos);

    useEffect(() => {
        if (!open) return;
        
        const interval = setInterval(() => {
            setContador((prev) => {
                if (prev <= 1) {
                    clearInterval(interval);
                    onRedirect();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(interval);
    }, [open, segundos, onRedirect]);
    if (!open) return null;
    return createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-4">
            <div className="w-full max-w-md rounded-2xl bg-white p-6 text-center shadow-2xl">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-orange-100 text-orange-600">
                    <AlertTriangle size={28} />
                </div>

                <h2 className="mt-4 text-xl font-bold text-slate-950">
                    Sessão expirada
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                    Sua sessão expirou por segurança, e você será redirecionado
                    para a tela de login em{" "}
                    <strong className="text-slate-950">{contador}</strong>{" "}
                    segundos.
                </p>

                <button
                    type="button"
                    onClick={onRedirect}
                    className="mt-6 flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 hover:cursor-pointer"
                >
                    <LogIn size={16} />
                    Ir para o login agora
                </button>
            </div>
        </div>,
        document.body
    )
}