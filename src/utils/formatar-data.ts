export function formataDataPadraoBrasil(data: string) {
    const dataPadrao = new Date(data);

    return dataPadrao.toLocaleString("pt-br", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit"
    })
}