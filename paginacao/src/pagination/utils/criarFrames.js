import { criarFrame } from "../models/Frame";

export function criarFrames(totalFrames) {
    // temos uma função que vai retornar um vetor de frames
    return Array.from(
        { length: totalFrames },
        () => criarFrame()
    );
}

// const frames = criarFrames(3);

// resposta
// [
//     {
//         pagina: null,
//         modificada: false,
//         carregadaEm: null,
//         ultimoAcesso: null,
//         acessos: 0,
//         referencia: 0
//     },
//     {
//         pagina: null,
//         modificada: false,
//         carregadaEm: null,
//         ultimoAcesso: null,
//         acessos: 0,
//         referencia: 0
//     },
//     {
//         pagina: null,
//         modificada: false,
//         carregadaEm: null,
//         ultimoAcesso: null,
//         acessos: 0,
//         referencia: 0
//     }
// ]