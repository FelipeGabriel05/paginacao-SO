import "./index.css";
import ResultsCard from "../ResultsCard/results-card";
import HistoryCard from "../../components/HistoryCard/history-card";
import SimulationCard from "../../components/SimulationCard/simulation-card";
import fifo from "../../pagination/algorithms/fifo";
import { parsePages } from "../../pagination/utils/parsePages";
import { useState } from "react";

const ConfigurationCard = () => {
    const [algoritmo, setAlgoritmo] = useState("FIFO");
    const [frames, setFrames] = useState(3);
    const [pages, setPages] = useState(
        "7, 0, 1, 2, 0, 3, 0, 4, 2, 3, 0, 3, 2, 1, 2, 0, 1, 7, 0, 1"
    );
    const [totalPages, setTotalPages] = useState(0);
    const [taxa, setTaxas] = useState(0);
    const [evic, setEvics] = useState(0);
    const [w_disco, setW_disco] = useState(0);
    const [resultado, setResultado] = useState(null);

    const iniciarSimulacao = () => {
        const listaPages = parsePages(pages);
        setTotalPages(listaPages.length);
        console.log("Algoritmo:", algoritmo);
        console.log("Frames:", frames);
        console.log("Páginas:", listaPages);

        if (algoritmo === "FIFO") {
            const resultado = fifo(listaPages, frames);
            setResultado(resultado);
            console.log("Resultado:", resultado);

            setTaxas(resultado.taxaFaltas);
            setEvics(resultado.eviccoes);
            setW_disco(resultado.escritas);
        }
    };

    return (
        <>
            <div className="configuration-card">

                <div className="box-config">

                    <div className="box-pai">

                        <div className="box">
                            <label htmlFor="algoritmo">
                                Algoritmo:
                            </label>

                            <select
                                name="algoritmo"
                                id="algoritmo"
                                value={algoritmo}
                                onChange={(e) => setAlgoritmo(e.target.value)}
                            >
                                <option value="FIFO">
                                    FIFO (First-In, First-Out)
                                </option>

                                <option value="LRU">
                                    LRU (Least Recently Used)
                                </option>

                                <option value="OTIMO">
                                    Ótimo
                                </option>

                                <option value="CLOCK">
                                    Clock (Second Chance)
                                </option>

                                <option value="NRU">
                                    NRU (Not Recently Used)
                                </option>

                                <option value="LFU">
                                    LFU (Least Frequently Used)
                                </option>

                                <option value="MFU">
                                    MFU (Most Frequently Used)
                                </option>
                            </select>
                        </div>

                        <div className="box">
                            <label htmlFor="frames">
                                Frames (1 a 10):
                            </label>

                            <input
                                type="number"
                                name="frames"
                                id="frames"
                                min="1"
                                max="10"
                                value={frames}
                                onChange={(e) => setFrames(Number(e.target.value))}
                                required
                            />
                        </div>

                    </div>

                    <label htmlFor="pages">
                        Lista de páginas:
                    </label>

                    <textarea
                        name="pages"
                        id="pages"
                        value={pages}
                        onChange={(e) => setPages(e.target.value)}
                        placeholder="Ex.: 1, 3, 4, 5 ou 1R, 2W, 3R"
                    />

                </div>

                <div>
                    <button
                        className="start-button"
                        onClick={iniciarSimulacao}
                    >
                        Iniciar Simulação
                    </button>

                    <button className="reset-button">
                        Resetar
                    </button>
                </div>

            </div>

            <ResultsCard
                n_frames={frames}
                pages={totalPages}
                taxa_faltas={taxa}
                evic={evic}
                w_disco={w_disco}
            />

            <SimulationCard resultado={resultado}/>

            <HistoryCard />
        </>
    );
};

export default ConfigurationCard;