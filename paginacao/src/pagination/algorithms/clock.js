import {criarFrames} from "../utils/criarFrames";
import {criarResultado} from "../models/SimulationResult";

//retorna o indice do frame que tem a pagina, ou -1 se nada
function procurarFrame(frames, pagina) {
    for (let k = 0; k < frames.length; k++) {
        if (frames[k].pagina === pagina) {
            return k;
        }
    }
    return -1;
}

//gira o ponteiro zerando o R ate achar um com R = 0
function escolherVitima(frames, ponteiro) {
    while (frames[ponteiro].referencia === 1) {
        frames[ponteiro].referencia = 0;
        ponteiro = (ponteiro + 1) % frames.length;
    }
    return ponteiro;
}

function clock(Lista_pages, total_frames) {
    const frames = criarFrames(total_frames);
    const resultado = criarResultado();
    let ponteiro = 0; //so anda quando tem eviccao
    for (let i = 0; i < Lista_pages.length; i++) {
        const pagina = Lista_pages[i].pagina;
        const operacao = Lista_pages[i].operacao;
        let tipo = "acerto";
        let escrita = false;
        let paginaEscrita = null;
        let paginaRemovida = null;
        let pos = procurarFrame(frames, pagina);
        if (pos !== -1) {
            //acerto: so liga o R de novo
            frames[pos].referencia = 1;
            if (operacao === "W") frames[pos].modificada = true;
        } else {
            tipo = "falha";
            resultado.faltas++;
            pos = procurarFrame(frames, null); //frame vazio tem pagina null
            if (pos === -1) {
                //memoria cheia, o ponteiro escolhe quem sai
                pos = escolherVitima(frames, ponteiro);
                paginaRemovida = frames[pos].pagina;
                resultado.eviccoes++;
                if (frames[pos].modificada) {
                    escrita = true;
                    paginaEscrita = paginaRemovida;
                    resultado.escritas++;
                }
                ponteiro = (pos + 1) % total_frames;
            }
            frames[pos].pagina = pagina;
            frames[pos].referencia = 1;
            frames[pos].modificada = operacao === "W";
        }
        resultado.historico.push({
            passo: i + 1,
            pagina: pagina,
            resultado: tipo,
            frameAlterado: pos,
            escrita: escrita,
            paginaEscrita: paginaEscrita,
            paginaRemovida: paginaRemovida,
            frames: structuredClone(frames)
        });
    }
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

export default clock;