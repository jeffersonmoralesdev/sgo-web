import { loadEnvConfig } from "@next/env";
loadEnvConfig(process.cwd());

async function seedAdmin() {
  const { eq } = await import("drizzle-orm");
  const { db } = await import("../index");
  const { usuarios } = await import("../schema");
  const { createPasswordHash } = await import("@/src/utils/senha-hash");

  console.log({
    DATABASE_URL: process.env.DATABASE_URL ? "existe" : "não existe",
  });

  const adminEmail = process.env.ADMIN_EMAIL;
  const adminSenha = process.env.ADMIN_PASSWORD;
  const adminNome = process.env.ADMIN_NAME ?? "Administrador";

  if (!adminEmail || !adminSenha) {
    throw new Error("ADMIN_EMAIL e ADMIN_PASSWORD precisam estar configurados.");
  }

  const [adminExistente] = await db
    .select()
    .from(usuarios)
    .where(eq(usuarios.email, adminEmail))
    .limit(1);

  if (adminExistente) {
    console.log("Usuário administrador já existe. Seed ignorado.");
    return;
  }

  const senhaHash = await createPasswordHash(adminSenha);

  await db.insert(usuarios).values({
    nome: adminNome,
    email: adminEmail,
    senhaHash,
    perfil: "ADMIN",
    ativo: true,
  });

  console.log("Usuário administrador criado com sucesso.");
}

seedAdmin()
  .then(() => {
    console.log("Seed finalizado.");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Erro ao executar seed:", error);
    process.exit(1);
  });