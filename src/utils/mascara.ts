export function aplicarMascaraCpf(value: string) {
    return value
        .replace(/\D/g, "")
        .slice(0, 11)
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}

export function mascararCpfParcial(cpf: string) {
    const apenasNumeros = cpf.replace(/\D/g, "");
    if (apenasNumeros.length !== 11) {
        return cpf;
    }
    return `***.***.${apenasNumeros.slice(6, 9)}-${apenasNumeros.slice(9, 11)}`;
}


export function aplicarMascaraTelefone(value: string) {
    const apenasNumeros = value.replace(/\D/g, "").slice(0, 11);

    if (apenasNumeros.length <= 10) {
        return apenasNumeros
            .replace(/(\d{2})(\d)/, "($1) $2")
            .replace(/(\d{4})(\d)/, "$1-$2");
    }

    return apenasNumeros
        .replace(/(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{5})(\d)/, "$1-$2");
}

export function aplicarMascaraPlaca(placa: string) {
    return placa
        .replace(/[^A-Za-z0-9]/g, "")
        .toUpperCase()
        .slice(0, 7)
        .replace(/^([A-Z]{3})([A-Z0-9]+)$/, "$1-$2");
}