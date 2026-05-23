import { ClienteModel, CreateClienteInput, UpdateClienteInput } from "@/src/model/cliente/cliente-model";
import { ClienteRepository } from "./cliente-repository";
import { db } from "@/src/db/drizzle";
import { clientes } from "@/src/db/drizzle/schema";
import { eq } from "drizzle-orm";

export class DrizzleClienteRepository implements ClienteRepository{
    
    async listarClientes(): Promise<ClienteModel[]> {
        return await db.select().from(clientes);
    }

     async buscarClientePorId(id: number): Promise<ClienteModel | null> {
        const [cliente] = await db.select().from(clientes).where(eq(clientes.id, id)).limit(1);
        return cliente ?? null;
    }
    
    async buscarClientePorEmail(email: string):Promise<ClienteModel | null>{
        const [cliente] = await db.select().from(clientes).where(eq(clientes.email,email)).limit(1);
        return cliente ?? null;
    }
      
    async buscarClientePorCpf(cpf: string):Promise<ClienteModel | null>{
        const [cliente] = await db.select().from(clientes).where(eq(clientes.cpf,cpf)).limit(1);
        return cliente ?? null;
    }

    async registrarCliente(cliente: CreateClienteInput): Promise<ClienteModel> {
        const result = await db.insert(clientes).values(cliente).$returningId();
        const id = result[0]?.id;
        if(!id) throw new Error("Cliente criado, mas o ID não foi retornado.");
        const clienteCriado = await this.buscarClientePorId(id);
        if (!clienteCriado)throw new Error("Cliente criado, mas não foi possível buscá-lo.");
        return clienteCriado;
    }
    
    async atualizarCliente(id: number, cliente: UpdateClienteInput):Promise<ClienteModel|null> {
        await db.update(clientes).set(cliente).where(eq(clientes.id, id));
        return await this.buscarClientePorId(id);
    }

    async deletarCliente(id: number): Promise<boolean> {
        await db.delete(clientes).where(eq(clientes.id, id));
        return true;
    }

}