"use client";

import { useActionState, useState } from "react";
import { Eye, Lock, Mail } from "lucide-react";

import { ActionResponse } from "@/src/types/action-response";
import { loginAction } from "@/src/actions/auth/auth-actions";

const initialState: ActionResponse = {
  success: false,
};

export function FormLogin() {
  const [state, formAction, isPending] = useActionState(
    loginAction,
    initialState
  );
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [visualizarSenha, setVisualizarSenha] = useState(false);

  const campoErrors = state.errors && typeof state.errors !== "string" ? state.errors : null;

  const geralError = typeof state.errors === "string" ? state.errors : null;

  return (
    <form action={formAction} className="space-y-6">
      {geralError && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {geralError}
        </div>
      )}

      <div>
        <label
          htmlFor="email"
          className="mb-3 block text-lg font-medium text-slate-900"
        >
          E-mail
        </label>
        <div className="relative">
          <Mail className="absolute left-5 top-1/2 h-6 w-6 -translate-y-1/2 text-slate-400" />
          <input
            id="email"
            name="email"
            type="email"
            placeholder="seu@email.com"
            className="h-16 w-full rounded-xl border border-slate-300 bg-white pl-16 pr-5 text-lg text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-900 focus:ring-4 focus:ring-blue-100"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        {campoErrors?.email && (
          <p className="mt-2 text-sm font-medium text-red-600">
            {campoErrors.email[0]}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="senha"
          className="mb-3 block text-lg font-medium text-slate-900"
        >
          Senha
        </label>
        <div className="relative">
          <Lock className="absolute left-5 top-1/2 h-6 w-6 -translate-y-1/2 text-slate-400" />
          <input
            id="senha"
            name="senha"
            type={visualizarSenha ? "text" : "password"}
            placeholder="••••••••"
            className="h-16 w-full rounded-xl border border-slate-300 bg-white pl-16 pr-14 text-lg text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-900 focus:ring-4 focus:ring-blue-100"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
          <button type="button" onClick={() => setVisualizarSenha((valorAnterior) => !valorAnterior)} className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-700">
            <Eye className="h-6 w-6" />
          </button>
        </div>
        {campoErrors?.senha && (
          <p className="mt-2 text-sm font-medium text-red-600">
            {campoErrors.senha[0]}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="h-16 w-full rounded-xl bg-blue-950 text-lg font-semibold text-white shadow-md transition hover:bg-blue-900 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? "Entrando..." : "Entrar"}
      </button>

      <div className="text-center">
        <p className="text-center text-sm text-slate-500">
          Em caso de esquecimento da senha, solicite redefinição ao administrador.
        </p>
        { /*<Link
          href="/esqueci-senha"
          className="text-base font-medium text-blue-700 hover:underline"
        >
          Esqueceu a senha?
        </Link>*/}
      </div>
      <div className="border-t border-slate-200 pt-8 text-center">
        <p className="text-sm font-medium text-slate-700">
          Acesso restrito
        </p>
        <p className="mt-2 text-sm text-slate-500">
          Usuários são cadastrados internamente pelo administrador da oficina.
        </p>
      </div>
    </form>
  );
}