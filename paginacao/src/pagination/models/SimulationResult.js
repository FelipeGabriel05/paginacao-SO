export function criarResultado(totalReferencias) {
    return {
        referencias: totalReferencias,
        faltas: 0,
        eviccoes: 0,
        escritas: 0,
        historico: []
    };
}