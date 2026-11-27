import { criarFrames } from "../utils/criarFrames";
import { criarResultado } from "../models/SimulationResult";

// MFU: remove a página com o maior contador de acessos (frame.acessos).
// O contador começa em 1 quando a página é carregada e volta a 1 se ela for removida e recarregada.
// Empate: sai a que foi carregada primeiro (menor carregadaEm).

// passando como parâmetro um vetor
function mfu(Lista_pages, total_frames) {
    // vetor dinâmico com base no total de frames
    const frames = criarFrames(total_frames);
    const resultado = criarResultado();

    let frameAlterado;      // Guarda qual frame foi alterado nesta referência

    for (let i = 0; i < Lista_pages.length; i++) {
        const referencia = Lista_pages[i];

        const pagina = referencia.pagina;
        const operacao = referencia.operacao;

        // Verifica se a página já está na memória
        // findIndex retorna -1 quando não encontra nenhum elemento.
        // Se encontra, retorna o índice onde ele está.
        const frameEncontrado = frames.findIndex(
            frame => frame.pagina === pagina
        );

        // ACERTO
        if (frameEncontrado !== -1) {
            const frame = frames[frameEncontrado];

            frame.acessos++;
            frame.ultimoAcesso = i;

            // Se a operação for W, a página foi modificada.
            if (operacao === "W") {
                frame.modificada = true;
            }

            resultado.historico.push({
                passo: i + 1,
                pagina: pagina,
                resultado: "acerto",
                frameAlterado: frameEncontrado,
                escrita: false,         // Não houve escrita em disco neste passo
                paginaEscrita: null,    // descreve qual página foi escrita no disco
                frames: structuredClone(frames)
            });

            continue;
        }

        // FALHA
        resultado.faltas++;

        // Procura o primeiro frame vazio
        const frameVazio = frames.findIndex(
            frame => frame.pagina === null
        );

        let escrita = false;    // Indica se houve escrita em disco
        let paginaEscrita = null; // Indica qual página foi escrita

        if (frameVazio !== -1) {

            frameAlterado = frameVazio;

            // Coloca a página no frame vazio
            frames[frameVazio].pagina = pagina;
            frames[frameVazio].carregadaEm = i;
            frames[frameVazio].ultimoAcesso = i;
            frames[frameVazio].acessos = 1;

            // Define se a página entrou modificada. Se a operação = W retorna true.
            frames[frameVazio].modificada = operacao === "W";

        } else {

            // Todos os frames estão ocupados

            // Escolhe o frame com o maior contador
            const vitima = escolheVitima(frames);

            // O frame escolhido será substituído
            frameAlterado = vitima;

            // Verifica se a página que será removida
            // foi modificada. Se true significa que vai ocorrer uma escrita.
            if (frames[vitima].modificada) {
                // será necessário escrever a página no disco.
                escrita = true;
                paginaEscrita = frames[vitima].pagina;
                resultado.escritas++;
            }

            // Substitui a página
            frames[vitima].pagina = pagina;
            frames[vitima].carregadaEm = i;
            frames[vitima].ultimoAcesso = i;
            frames[vitima].acessos = 1;

            // A nova página começa modificada somente
            // se a operação atual for W.
            frames[vitima].modificada = operacao === "W";

            resultado.eviccoes++;
        }

        resultado.historico.push({
            passo: i + 1,
            pagina: pagina,
            resultado: "falha",
            frameAlterado: frameAlterado,   // Frame que recebeu a nova página
            escrita: escrita,
            paginaEscrita: paginaEscrita,
            frames: structuredClone(frames)
        });
        // structuredClone(frames) = faz uma cópia. Representa o histórico desse momento de execução
    }

    // Calcula a taxa de faltas
    const taxaFaltas = (resultado.faltas / Lista_pages.length) * 100;

    return {
        frames,
        referencias: Lista_pages.length,
        faltas: resultado.faltas,
        taxaFaltas: taxaFaltas,
        eviccoes: resultado.eviccoes,
        escritas: resultado.escritas,
        historico: resultado.historico
    };
}

// Retorna o índice do frame com o maior contador
// Empate: o que foi carregado primeiro
function escolheVitima(frames) {
    let pos = 0;

    for (let k = 1; k < frames.length; k++) {
        if (
            frames[k].acessos > frames[pos].acessos ||
            (frames[k].acessos === frames[pos].acessos &&
                frames[k].carregadaEm < frames[pos].carregadaEm)
        ) {
            pos = k;
        }
    }

    return pos;
}

export default mfu;
