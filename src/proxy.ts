import { NextResponse, MiddlewareConfig, NextRequest } from "next/server";
import { validarSessao } from "./lib/auth/session";

const rotasPublicas = [
    { path: "/login", quandoAutenticada: "redirect" },
];

export async function proxy(request: NextRequest) {

    const rotaAtual = request.nextUrl.pathname;
    const rotaPublica = rotasPublicas.find(rota => rota.path === rotaAtual);

    const tokenCookie = request.cookies.get("sessao")?.value;
    const tokenValido = tokenCookie ? await validarSessao(tokenCookie) : false
    const isGet = request.method === "GET";

    if (!rotaPublica) {
        if (!tokenValido) {
            if (isGet) {
                const loginUrl = new URL("/login", request.url);
                if (tokenCookie) {
                    loginUrl.searchParams.set("toast", "sessao-expirada");
                }
                const response = NextResponse.redirect(loginUrl);
                if (tokenCookie) {
                    response.cookies.delete("sessao");
                }
                return response
            }
            return NextResponse.redirect(new URL("/login", request.url));
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