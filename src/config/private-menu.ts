import { Car, FileText, LayoutDashboard, Users } from "lucide-react";
import { ROUTES } from "../constants/routes/routes";

export const menuItems = [
    { label: "Dashboard", href: ROUTES.DASHBOARD, icon: LayoutDashboard,},
    { label: "Usuários", href: ROUTES.USUARIOS, icon: Users },
    { label: "Clientes", href: ROUTES.CLIENTES, icon: Users },
    { label: "Veículos", href: ROUTES.VEICULOS, icon: Car },
    { label: "Ordens de Serviço", href: ROUTES.ORDENS_SERVICO, icon: FileText }
];