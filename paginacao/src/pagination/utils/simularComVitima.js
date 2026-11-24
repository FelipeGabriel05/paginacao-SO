import { criarFrames } from "./criarFrames";
import { criarResultado } from "../models/SimulationResult";

// LRU, LFU e MFU fazem tudo igual, só muda quem é escolhido como vítima
//  quando a memória está cheia. Então a parte comum fica aqui e cada
// algoritmo manda só a função escolherVitima (padrão Strategy).
export function simularComVitima(listaPaginas, totalFrames, escolherVitima) {
    if (!Number.isInteger(totalFrames) || totalFrames < 1) {
        throw new Error("O número de frames deve ser um inteiro maior ou igual a 1.");
    }

    const frames = criarFrames(totalFrames);
    const resultado = criarResultado();

    // i funciona como o "relógio" da simulação
    for (let i = 0; i < listaPaginas.length; i++) {
        const { pagina, escrita } = normalizarReferencia(listaPaginas[i]);

        const frameEncontrado = frames.findIndex(f => f.pagina === pagina);

        // Acerto: só atualiza os dados de controle
        if (frameEncontrado !== -1) {
            const frame = frames[frameEncontrado];
            frame.acessos++;
            frame.ultimoAcesso = i;
            frame.referencia = 1;
            if (escrita) frame.modificada = true;

            // structuredClone copia os frames, senão todos os passos do
            // histórico apontariam pro mesmo vetor
            resultado.historico.push({
                passo: i + 1,
                pagina,
                resultado: "acerto",
                frames: structuredClone(frames)
            });
            continue;
        }

        // Falta de página
        resultado.faltas++;

        // usa o menor frame livre, se tiver
        let frameDestino = frames.findIndex(f => f.pagina === null);
        let paginaRemovida = null;
        let escritaDisco = false;

        // sem frame livre: evicção, e o algoritmo escolhe a vítima
        if (frameDestino === -1) {
            frameDestino = escolherVitima(frames, i);
            paginaRemovida = frames[frameDestino].pagina;
            resultado.eviccoes++;

            // vítima modificada (M = 1) tem que ir pro disco
            if (frames[frameDestino].modificada) {
                resultado.escritas++;
                escritaDisco = true;
            }
        }

        // carrega a página nova. O acessos volta pra 1, que é o contador
        // zerando quando a página é removida
        const frame = frames[frameDestino];
        frame.pagina = pagina;
        frame.modificada = escrita;
        frame.carregadaEm = i;
        frame.ultimoAcesso = i;
        frame.acessos = 1;
        frame.referencia = 1;

        resultado.historico.push({
            passo: i + 1,
            pagina,
            resultado: "falha",
            frames: structuredClone(frames),
            // extras pra interface mostrar quem entrou e quem saiu
            frameAfetado: frameDestino,
            paginaRemovida,
            escritaDisco
        });
    }

    return {
        frames,
        faltas: resultado.faltas,
        eviccoes: resultado.eviccoes,
        escritas: resultado.escritas,
        historico: resultado.historico
    };
}

// Devolve o índice do melhor frame segundo a função comparar
// (negativo = o primeiro é melhor candidato a vítima).
// Desempate do enunciado: sai quem está há mais tempo na memória.
export function escolherMelhorFrame(frames, comparar) {
    let melhor = 0;
    for (let k = 1; k < frames.length; k++) {
        const c = comparar(frames[k], frames[melhor]);
        if (c < 0 || (c === 0 && frames[k].carregadaEm < frames[melhor].carregadaEm)) {
            melhor = k;
        }
    }
    return melhor;
}

// Aceita número (7), texto da linha do trace ("1 W") ou objeto
// ({ pagina: 1, tipo: "W" }). Sem letra é leitura.
function normalizarReferencia(ref) {
    if (typeof ref === "string") {
        const [p, t] = ref.trim().split(/\s+/);
        return { pagina: Number(p), escrita: (t ?? "").toUpperCase() === "W" };
    }
    if (typeof ref === "object" && ref !== null) {
        return {
            pagina: Number(ref.pagina),
            escrita: String(ref.tipo ?? "").toUpperCase() === "W" || ref.escrita === true
        };
    }
    return { pagina: ref, escrita: false };
}
