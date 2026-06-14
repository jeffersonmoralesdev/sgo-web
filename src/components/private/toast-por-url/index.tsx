"use client"
import { PARAMETROS_TOAST, ParametrosToast } from "@/src/constants/parametros-toast";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ToastFeedback } from "../toast-feedback";

type ToastPorUrlProps = {
    parametroToast?: string;
    duration?: number;
};

export function isParametroToast(value: string): value is ParametrosToast {
    return value in PARAMETROS_TOAST;
}

export function ToastPorUrl({ parametroToast, duration }: ToastPorUrlProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const mensagem = parametroToast && isParametroToast(parametroToast) ? PARAMETROS_TOAST[parametroToast] : null;

    function fecharToast() {
        const params = new URLSearchParams(searchParams);
        params.delete("toast");

        const queryString = params.toString();
        router.replace(queryString ? `${pathname}?${queryString}` : pathname);
    }

    if (!mensagem) {
        return null;
    }
    return (
        <ToastFeedback
            open={true}
            tipo={parametroToast === "sessao-expirada" ? "ERROR" : "SUCCESS"}
            titulo={parametroToast === "sessao-expirada" ? "Sessão expirada" : "Sucesso"}
            mensagem={mensagem}
            duration={duration}
            onClose={fecharToast}
        />
    )
}