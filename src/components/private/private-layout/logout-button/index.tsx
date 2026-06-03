import { logoutAction } from "@/src/actions/auth/auth-actions";
import { LogOut } from "lucide-react";

export function LogoutButton() {

    return (
        <form action={logoutAction}>
            <button
                type="submit"
                className="hidden w-full items-center gap-3 border-t border-white/15 px-4 pt-5 font-semibold text-slate-300 lg:flex cursor-pointer transition duration-400 ease-in-out hover:text-white"
            >
                <LogOut size={20} />
                Sair
            </button>
        </form>
    )
}