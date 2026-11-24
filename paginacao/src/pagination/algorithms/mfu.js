import { simularComVitima, escolherMelhorFrame } from "../utils/simularComVitima";

// MFU: igual ao LFU, mas remove a página com MAIS acessos
// (a comparação é só invertida).
function mfu(Lista_pages, total_frames) {
    return simularComVitima(Lista_pages, total_frames, frames =>
        escolherMelhorFrame(frames, (a, b) => b.acessos - a.acessos)
    );
}

export default mfu;
