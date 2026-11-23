// import { Configuracao } from "../Header/header";
import "./index.css";
import ResultsCard from "../ResultsCard/results-card";
import HistoryCard from "../../components/HistoryCard/history-card";
import SimulationCard from "../../components/SimulationCard/simulation-card";
import { useState } from "react";

const ConfigurationCard = () => {
    const [frames, setFrames] = useState(0);
    const [pages, setPages] = useState(0);
    const [taxa, setTaxas] = useState(0);
    const [evic, setEvics] = useState(0);
    const [w_disco, setW_disco] = useState(0);
    return (
        <>
            <div className="configuration-card">
                {/* <Configuracao /> */}
                <div className="box-config">
                    <div className="box-pai">
                        <div className="box">
                            <label htmlFor="algoritmo">Algoritmo: </label>
                            <select name="algoritmo" id="algoritmo">
                                <option value="FIFO">FIFO (First-In, First-Out)</option>
                                <option value="LRU">LRU (Least Recently Used)</option>
                                <option value="OTIMO">Ótimo</option>
                                <option value="CLOCK">Clock (Second Chance)</option>
                                <option value="NRU">NRU (Not Recently Used)</option>
                                <option value="LFU">LFU (Least Frequently Used)</option>
                                <option value="MFU">MFU (Most Frequently Used)</option>
                            </select>
                        </div>

                        <div className="box">
                            <label htmlFor="frames">Frames (1 a 10): </label>
                            <input
                                type="number"
                                name="frames"
                                id="frames"
                                min="1"
                                max="10"
                                required
                            />
                        </div>
                    </div>

                    <label htmlFor="pages">Lista de páginas: </label>
                    <textarea name="pages" id="pages">
                        7, 0, 1, 2, 0, 3, 0, 4, 2, 3, 0, 3, 2, 1, 2, 0, 1, 7, 0, 1
                    </textarea>
                </div>
                <div>
                    <button className="start-button">Iniciar Simulação</button>
                    <button className="reset-button">Resetar</button>
                </div>
            </div>
            <ResultsCard n_frames={frames} pages={pages} taxa_faltas={taxa} evic={evic} w_disco={w_disco} />
            <SimulationCard />
            <HistoryCard />
        </>
    );
};

export default ConfigurationCard;
