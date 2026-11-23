import { criarFrames } from "../utils/criarFrames";
import { criarResultado } from "../models/SimulationResult";

// passando como parâmetro um vetor
function fifo(Lista_pages, total_frames) {
    // vetor dinâmico com base no total de frames
    const frames = criarFrames(total_frames)
    const resultado = criarResultado();
    let ponteiro = 0;

    for(let i = 0; i < Lista_pages.length; i++) {
        const pagina = Lista_pages[i];

        // Verifica se a página já está na memória
        // findIndex retorna -1 quando não encontra nenhum elemento.
        // Se ele encontra o elemento, ele retorna o índice onde ele está.
        const frameEncontrado = frames.findIndex(
            frame => frame.pagina === pagina
        );

        // Acerto
        if(frameEncontrado !== -1) {
            frames[frameEncontrado].acessos++;
            frames[frameEncontrado].ultimoAcesso = i;

            resultado.historico.push({
                passo: i + 1,
                pagina: pagina,
                resultado: "acerto",
                frames: structuredClone(frames)
            });

            continue;
        }

        // Falha
        resultado.faltas++;
        // Procura o primeiro frame vazio
        const frameVazio = frames.findIndex(
            frame => frame.pagina === null
        );

        if (frameVazio !== -1) {
            // Coloca a página no menor frame vazio
            frames[frameVazio].pagina = pagina;
            frames[frameVazio].carregadaEm = i;
            frames[frameVazio].ultimoAcesso = i;
            frames[frameVazio].acessos = 1;
        } else {
            // Todos os frames estão ocupados
            frames[ponteiro].pagina = pagina;   
            frames[ponteiro].carregadaEm = i;
            frames[ponteiro].ultimoAcesso = i;
            frames[ponteiro].acessos = 1;

            resultado.eviccoes++;
            // FIFO: vai para o próximo frame a que está há mais tempo nesse momento.
            ponteiro = (ponteiro + 1) % total_frames;
        }

        resultado.historico.push({
            passo: i + 1,
            pagina: pagina,
            resultado: "falha",
            frames: structuredClone(frames)
        });
        // structuredClone(frames) = salva o histórico de cada rodada.
    }

    return {
        frames,
        faltas: resultado.faltas,
        eviccoes: resultado.eviccoes,
        escritas: resultado.escritas,
        historico: resultado.historico
    }
}

export default fifo;