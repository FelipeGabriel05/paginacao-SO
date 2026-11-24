import { simularComVitima, escolherMelhorFrame } from "../utils/simularComVitima";

// LFU: remove a página com menos acessos desde que foi carregada.
// Se empatar, sai a que está há mais tempo na memória.
function lfu(Lista_pages, total_frames) {
    return simularComVitima(Lista_pages, total_frames, frames =>
        escolherMelhorFrame(frames, (a, b) => a.acessos - b.acessos)
    );
}

export default lfu;
