import {z} from 'zod'

const ANO_MIN_VEICULO = 1900;
const ANO_ATUAL = new Date().getFullYear();

export const createVeiculoSchema = z.object({
    placa:z.string().
        trim().
        transform((placa)=> placa.replace(/[^A-Za-z0-9]/g,"").toUpperCase()).                
        refine((placaLimpa)=>{
            const placaAntiga = /^[A-Z]{3}\d{4}$/;
            const placaMercosul = /^[A-Z]{3}\d[A-Z]\d{2}$/

            return placaAntiga.test(placaLimpa) || placaMercosul.test(placaLimpa);

        },"Placa do veiculo inválida."),
    marca:z.string().min(2,"A marca do veículo deve ter pelo menos 2 caracteres"),
    modelo:z.string().min(2,"O modelo do veículo deve ter pelo menos 2 caracteres"),
    ano:z.preprocess((value)=> value === "" ? undefined: value,
        z.coerce.number({error:"Informe o ano do veículo"}).
        int("O ano deve ser um número inteiro").
        min(ANO_MIN_VEICULO, `O ano deve ser maior ou igual a ${ANO_MIN_VEICULO}`).
        max(ANO_ATUAL,`O ano do veículo não pode ser maior que ${ANO_ATUAL}`)),
    cor:z.preprocess((value)=> value === "" ? undefined : value,
        z.string().
        trim().
        min(2,"A cor deve ter pelo menos 2 caracteres").
        max(30, "A cor deve ter no máximo 30 caracteres").
        optional()),
    quilometragem: z.preprocess((value) => value === "" ? undefined : value,
        z.coerce.number({error: "Informe a quilometragem do veículo",}).
        int("A quilometragem deve ser um número inteiro").
        min(0, "A quilometragem não pode ser negativa").
        max(999999, "A quilometragem não pode ultrapassar 999.999 km")),
    clienteId:z.preprocess((value) => value === "" ? undefined : value,
        z.coerce.number({ error:"Informe o cliente do veículo"}).
        int({error:"O ID do cliente deve ser um número inteiro"}).
        positive("O cliente informado é inválido"))
});

export const idVeiculoSchema = z.preprocess((value)=> value === "" ? undefined : value,
        z.coerce.number({error:"ID inválido"}).
        int("O ID deve ser um número inteiro").
        positive("O ID deve ser maior que zero")
);

export const updateVeiculoSchema = createVeiculoSchema.partial();