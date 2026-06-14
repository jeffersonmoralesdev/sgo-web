import { NextResponse, MiddlewareConfig, NextRequest } from "next/server";
import { validarSessao } from "./lib/auth/session";
const rotasPublicas = [
    { path: "/login", quandoAutenticada: "redirect" },
];

export async function proxy(request: NextRequest) {
    if (request.method !== "GET") {
        return NextResponse.next();
    }
    const rotaAtual = request.nextUrl.pathname;
    const rotaPublica = rotasPublicas.find(rota => rota.path === rotaAtual);

    const tokenCookie = request.cookies.get("sessao")?.value;
    const tokenValido = tokenCookie ? await validarSessao(tokenCookie) : false

    if (!rotaPublica) {
        if (!tokenValido) {
            const response = NextResponse.redirect(new URL("/login?toast=sessao-expirada", request.url));
            if (tokenCookie) {
                response.cookies.delete("sessao");
            }
            return response;
        } else {
            return NextResponse.next();
        }
    }

    if (rotaPublica && tokenValido && rotaPublica.quandoAutenticada === "redirect") {
        return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
}
export const config: MiddlewareConfig = {
    matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\..*$).*)']
}