import { simularComVitima, escolherMelhorFrame } from "../utils/simularComVitima";

// LRU: remove a página que ficou mais tempo sem ser acessada.
// O ultimoAcesso é atualizado no motor a cada acerto/carga, então a vítima
// é o frame com o menor ultimoAcesso.
function lru(Lista_pages, total_frames) {
    return simularComVitima(Lista_pages, total_frames, frames =>
        escolherMelhorFrame(frames, (a, b) => a.ultimoAcesso - b.ultimoAcesso)
    );
}

export default lru;
