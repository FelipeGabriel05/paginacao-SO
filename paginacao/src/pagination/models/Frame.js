// É importante, pois será usado em todos os algoritmos e retornaremos isso na tela.
// Essa função criar um frame único
export function criarFrame() {
    return {
        pagina: null,
        modificada: false,
        carregadaEm: null,
        ultimoAcesso: null,
        acessos: 0,
        referencia: 0
    };
}