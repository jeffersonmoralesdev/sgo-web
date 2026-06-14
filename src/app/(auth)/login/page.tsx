import { FormLogin } from "@/src/components/auth/form/form-login";
import { ToastPorUrl } from "@/src/components/private/toast-por-url";
type LoginPageProps = {
    searchParams: Promise<{
        toast?: string;
    }>;
}
export default async function LoginPage({ searchParams }: LoginPageProps) {
    const { toast } = await searchParams;

    return (
        <div>
            <ToastPorUrl parametroToast={toast} duration={10000} />
            <div className=" flex flex-col items-center mb-5">
                <h2 className="text-4xl font-bold  text-slate-950">
                    Acessar Conta
                </h2>
            </div>
            <FormLogin />
        </div>
    )
}