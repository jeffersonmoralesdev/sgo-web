import Image from "next/image";

export function Logo() {
  return (
    <Image
      src="/images/oficina-logo.png"
      alt="Logo do sistema"
      width={64}
      height={64}
      priority
    />
  );
}