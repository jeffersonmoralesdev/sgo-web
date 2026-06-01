import { Logo } from "@/src/components/auth/form/logo";

export default function AuthLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 bg-white">
      <div className="relative hidden overflow-hidden bg-slate-950 lg:block">
        <div className=" absolute inset-0 bg-cover bg-center " style={{ backgroundImage: "url('/images/oficina-login.png')" }} />
        <div className="bg-slate-950/70 absolute inset-0" />
        <div className="relative z-10 flex h-full flex-col justify-end px-16 py-20">
          <h1 className="text-6xl text-white  font-bold leading-tight">
            Sua oficina
            <span className="block text-blue-500">organizada.</span>
          </h1>
          <p className="text-slate-300 text-xl leading-relaxed max-w-lg">
            Gerencie clientes, veículos e ordens de serviço em um só lugar.
          </p>
        </div>
      </div>
      <div className="min-h-screen flex items-center justify-center ">
        <div className=" w-full max-w-md">
          <div className="flex flex-col items-center">
            <div className="">
              <Logo />
            </div>
          </div>
          {children}
        </div>
      </div>
    </section>
  )
}