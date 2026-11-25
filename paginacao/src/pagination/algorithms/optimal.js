import { criarFrames } from "../utils/criarFrames";
import { criarResultado } from "../models/SimulationResult";

// passando como parâmetro um vetor
function optimal(Lista_page, total_frames) {
    // vetor dinâmico com base no total de frames
    const frames = criarFrames(total_frames);
    const resultado = criarResultado();

    let frameAlterado;      // Guarda qual frame foi alterado nesta referência
    for (let i = 0; i < Lista_page.length; i++) {
        const referencia = Lista_page[i];
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
                escrita: false,     // Não houve escrita em disco neste passo
                paginaEscrita: null,
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

            // Todos os frames estão ocupado
            const vetor_count = Array(frames.length).fill(null);
            for(let k = 0; k < frames.length; k++) {
                let count = encontraIndice(Lista_page, i + 1, frames[k].pagina);
                vetor_count[k] = count;
            }

            let ponteiro = escolheIndice(vetor_count);

            // O frame apontado pelo ponteiro será substituído
            frameAlterado = ponteiro;

            // Verifica se a página que será removida
            // foi modificada. Se true significa que vai ocorrer uma escrita.
            if (frames[ponteiro].modificada) {
                // será necessário escrever a página no disco.
                escrita = true;
                paginaEscrita = frames[ponteiro].pagina;
                resultado.escritas++;
            }

            // Substitui a página
            frames[ponteiro].pagina = pagina;
            frames[ponteiro].carregadaEm = i;
            frames[ponteiro].ultimoAcesso = i;
            frames[ponteiro].acessos = 1;

            // A nova página começa modificada somente
            // se a operação atual for W.
            frames[ponteiro].modificada = operacao === "W";

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
        // structuredClone(frames) = faz uma cópia. Representa o histórico desse momento de execução.
    }

    // Calcula a taxa de faltas
    const taxaFaltas = (resultado.faltas / Lista_page.length) * 100;

    return {
        frames,
        referencias: Lista_page.length,
        faltas: resultado.faltas,
        taxaFaltas: taxaFaltas,
        eviccoes: resultado.eviccoes,
        escritas: resultado.escritas,
        historico: resultado.historico
    };

}


function encontraIndice(Lista, i_atual, pagina) {

    let count = 0;

    for (let i = i_atual; i < Lista.length; i++) {

        if (Lista[i].pagina === pagina) {
            return count;
        }

        count++;
    }

    // A página não será utilizada novamente
    return -1;
}

function escolheIndice(Lista) {
    let maior = -1;
    let pos = 0;
    for(let i = 0; i < Lista.length; i++) {
        // Página que nunca mais será usada
        if(Lista[i] === -1) {
            return i;
        }

        if(Lista[i] > maior) {
            maior = Lista[i];
            pos = i; 
        }
    }
    return pos;
}

export default optimal;