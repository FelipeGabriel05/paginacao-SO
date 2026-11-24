export function parsePages(texto) {
    return texto
        // Aceita vírgula ou quebra de linha como separador
        .split(/[,\n]/)
        .map(item => item.trim())
        .filter(item => item !== "")
        .map(item => {
            // Verifica se existe operação R ou W
            const match = item.match(/^(\d+)\s*([RW])?$/i);

            if (!match) {
                throw new Error(`Referência inválida: ${item}`);
            }

            const pagina = Number(match[1]);
            const operacao = match[2]
                ? match[2].toUpperCase()
                : "R";

            return {
                pagina,
                operacao
            };
        });
}