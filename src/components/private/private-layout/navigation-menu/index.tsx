"use client"
import { menuItems } from "@/src/config/private-menu";
import Link from "next/link";
import { usePathname } from "next/navigation";
export function NavigationMenu() {
    const pathName = usePathname();
    return (
        <nav className="flex gap-2 overflow-x-auto px-4 py-3 lg:mt-6 lg:flex-1 lg:flex-col lg:overflow-visible lg:px-0 lg:py-0">
            {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathName === item.href || pathName.startsWith(`${item.href}/`)
                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={`flex shrink-0 items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold lg:gap-3 lg:text-base ${isActive
                            ? "bg-blue-600 text-white"
                            : "text-slate-200 hover:bg-white/10 hover:text-white"}`}>
                        <Icon size={18} />
                        {item.label}
                    </Link>
                );
            })}
        </nav>
    )
}