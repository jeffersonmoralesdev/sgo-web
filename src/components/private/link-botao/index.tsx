import { LucideIcon } from "lucide-react";
import Link from "next/link";
type LinkBotaoProps = {
    url: string;
    text: string;
    icon: LucideIcon;
}
export default function LinkBotao({ url, text, icon: Icon }: LinkBotaoProps) {
    return (
        <Link href={url} className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 font-semibold text-white transition-colors duration-200 hover:bg-blue-700 m-w-50 px-3">
            <Icon size={18} />
            <span>{text}</span>
        </Link>
    )
}