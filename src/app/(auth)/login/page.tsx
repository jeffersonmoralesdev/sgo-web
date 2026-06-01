import { FormLogin} from "@/src/components/auth/form/form-login";

export default function LoginPage() {
    return (
        <div>
            <div className=" flex flex-col items-center mb-5">
                <h2 className="text-4xl font-bold  text-slate-950">
                    Acessar Conta
                </h2>
            </div>
            <FormLogin />
        </div>
    )
}