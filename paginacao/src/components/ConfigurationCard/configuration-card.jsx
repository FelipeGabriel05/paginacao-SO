import "./index.css";
import ResultsCard from "../ResultsCard/results-card";
import HistoryCard from "../../components/HistoryCard/history-card";
import SimulationCard from "../../components/SimulationCard/simulation-card";
import fifo from "../../pagination/algorithms/fifo";
import { parsePages } from "../../pagination/utils/parsePages";
import { useState } from "react";
import optimal from "../../pagination/algorithms/optimal";
import clock from "../../pagination/algorithms/clock";

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
    const [step, setStep] = useState(1);
    const [faltas, setFaltas] = useState(0);

    const inputsT = [
        "7, 0, 1, 2, 0, 3, 0, 4, 2, 3, 0, 3, 2, 1, 2, 0, 1, 7, 0, 1",
        "1, 2, 3, 4, 1, 2, 5, 1, 2, 3, 4, 5",
        "1w, 2r, 3w, 1r, 4r, 2w, 5r, 3r, 1w, 4r"
    ]

    const iniciarSimulacao = () => {
        try {
            resetar();
            const listaPages = parsePages(pages);
            setTotalPages(listaPages.length);
            console.log("Algoritmo:", algoritmo);
            console.log("Frames:", frames);
            console.log("Páginas:", listaPages);

            let resultado;

            switch (algoritmo) {

                case "FIFO":
                    resultado = fifo(listaPages, frames);
                    break;

                case "OTIMO":
                    resultado = optimal(listaPages, frames);
                    break;

                case "CLOCK":
                    resultado = clock(listaPages, frames);
                    break;

                default:
                    console.error("Algoritmo não implementado:", algoritmo);
                    return;
            }
            console.log("Resultado:", resultado);

            setResultado(resultado);
            setTaxas(resultado.taxaFaltas);
            setEvics(resultado.eviccoes);
            setW_disco(resultado.escritas);
            setFaltas(resultado.faltas);
        } catch (erro) {
            console.error(
                "Erro ao iniciar simulação:",
                erro
            );
        }
    };

    const resetar = () => {
        setResultado(null);
        setStep(1);
        setTotalPages(0);
        setTaxas(0);
        setEvics(0);
        setW_disco(0);
        setFaltas(0);
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
                        <select
                            name="traco"
                            id="traco"
                            onChange={(e) => setPages(e.target.value)}
                        >
                            <option value={`${inputsT[0]}`}>
                                Traço 1
                            </option>

                            <option value={`${inputsT[1]}`}>
                                Traço 2 (Anomalia de Belady)
                            </option>

                            <option value={`${inputsT[2]}`}>
                                Traço 3 (Acessos de Escrita)
                            </option>
                        </select>
                    </label>

                    <textarea
                        name="pages"
                        id="pages"
                        value={pages}
                        onChange={(e) => setPages(e.target.value)}
                    />

                </div>

                <div>
                    <button
                        className="start-button"
                        onClick={iniciarSimulacao}
                    >
                        Iniciar Simulação
                    </button>

                    <button
                        className="reset-button"
                        onClick={resetar}
                    >
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
                faltas={faltas}
            />

            <SimulationCard
                resultado={resultado}
                step={step}
                setStep={setStep}
            />

            <HistoryCard
                historico={resultado?.historico || []}
                step={step}
            />
        </>
    );
};

export default ConfigurationCard;