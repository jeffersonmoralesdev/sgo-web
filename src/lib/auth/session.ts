import { LoginResponse } from "@/src/model/auth/auth-model";
import { cookies } from "next/headers";
import { jwtVerify, SignJWT } from "jose";

const chaveSecreta = process.env.AUTH_SECRET;

if (!chaveSecreta) {
    throw new Error("AUTH_SECRET não configurada.");
}

const TEMPO_SESSAO_SEGUNDOS = 1 * 60 * 60 * 24;
const TEMPO_SESSAO_JWT = "24h";

const encodeKey = new TextEncoder().encode(chaveSecreta);

export async function createSessao(usuario: LoginResponse): Promise<void> {

    const token = await new SignJWT({
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        perfil: usuario.perfil
    }).
        setProtectedHeader({ alg: "HS256" }).
        setIssuedAt().
        setExpirationTime(TEMPO_SESSAO_JWT).
        sign(encodeKey);

    const cookieStore = await cookies();

    cookieStore.set({
        name: "sessao",
        value: token,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: TEMPO_SESSAO_SEGUNDOS,
        path: "/"
    })
}

export async function getSessao(): Promise<LoginResponse | null> {
    const cookieStore = await cookies();
    const token = cookieStore.get("sessao")?.value;

    if (!token) return null;
    try {
        const { payload } = await jwtVerify(token, encodeKey);

        if (typeof payload.id !== "number" ||
            typeof payload.nome !== "string" ||
            typeof payload.email !== "string" ||
            typeof payload.perfil !== "string") return null;

        return {
            id: payload.id,
            nome: payload.nome,
            email: payload.email,
            perfil: payload.perfil
        };

    } catch {
        return null;
    }
};

export async function validarSessao(token: string): Promise<boolean> {
    try {
        await jwtVerify(token, encodeKey);
        return true
    } catch {
        return false
    }
};

export async function destroySessao(): Promise<void> {
    const cookieStore = await cookies();
    cookieStore.delete("sessao");

}