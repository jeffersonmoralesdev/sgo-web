import { Header } from "@/src/components/private/private-layout/header";
import { Sidebar } from "@/src/components/private/private-layout/sidebar";
import { getSessao } from "@/src/lib/auth/session";
import { redirect } from "next/navigation";

export default async function PrivateLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    const sessao = await getSessao();
    if (!sessao) redirect("/login");

    return (
        <div className="h-dvh bg-slate-100 text-slate-950 xl:flex">
            <Sidebar />


            <div className=" min-h-0 min-w-0 flex flex-col flex-1 ">


                <Header nome={sessao.nome} perfil={sessao.perfil} />



                <main className="p-4 lg:px-6 lg:py-5 min-h-0 flex-1">{children}</main>
            </div>



        </div>
    );
}