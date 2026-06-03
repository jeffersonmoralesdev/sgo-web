import { Wrench } from "lucide-react";
import { LogoutButton } from "../logout-button";
import { NavigationMenu } from "../navigation-menu";

export function Sidebar() {
  return (
    <aside className="bg-slate-950 text-white lg:flex lg:w-72 lg:flex-col lg:px-4 lg:py-6">
      <div className="hidden items-center gap-3 border-b border-white/10 pb-6 lg:flex">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600">
          <Wrench size={24} />
        </div>
        <div>
          <strong className="block text-2xl">SGO</strong>
          <span className="text-sm text-slate-300">Oficina</span>
        </div>
      </div>
      <NavigationMenu />
      <LogoutButton />
    </aside>
  );
}