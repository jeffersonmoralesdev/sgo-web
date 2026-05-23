function calcularDigitoVerificador(cpfParcial:number[], multiplicadorInicial:number):number{
    
    let soma = 0;

    for (let index = 0; index < cpfParcial.length; index++) {
        soma += cpfParcial[index] * multiplicadorInicial;
        multiplicadorInicial--;
    }

    const resto = soma % 11;

    return resto < 2 ? 0 : 11 - resto;
};



export function verificarCpf(cpfString:string):boolean{
    
    const cpfNumeros = [...cpfString.replace(/\D/g, "")].map(Number)
    
    if (cpfNumeros.length !== 11) return false 
    
    if (cpfNumeros.every(num => num === cpfNumeros[0])) return false;
    
    const primeiroDigito = calcularDigitoVerificador(cpfNumeros.slice(0,9),10);

    if(primeiroDigito !== cpfNumeros[9]) return false;

    const segundoDigito = calcularDigitoVerificador(cpfNumeros.slice(0,10),11)

    if (segundoDigito !== cpfNumeros[10]) return false;

    return true;

}