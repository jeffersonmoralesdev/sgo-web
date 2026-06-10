import { ActionResponse } from "@/src/types/action-response";
import { getSessao } from "./session";

export function respostaSessaoExpiradaAction<T = unknown>(): ActionResponse<T> {
    return {
        success: false,
        message: "Sessão expirada",
        status: "UNAUTHORIZED",
    };
}

export async function verificarSessaoAction() {
    const sessaoToken = await getSessao();

    if (!sessaoToken) return null;

    return sessaoToken;
}