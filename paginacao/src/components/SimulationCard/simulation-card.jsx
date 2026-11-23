import "./index.css";
import Frame from "./frames";
import { useState } from "react";

const SimulationCard = () => {
    const [step, setStep] = useState(1)
    const total = 20
    return (
        <div className="simulation-card">

            <div className="simulation-controls">
                <button className="previous-button">Anterior</button>
                <button className="next-button">Próximo</button>
                <button className="autoplay-button">Auto play</button>
            </div>

            <div className="box-step">
                Passo: {step}/20
            </div>

            <div className="simulation-legend">
                <div className="legend-item">
                    <span className="legend-square hit"></span>
                    <span>Acerto</span>
                </div>

                <div className="legend-item">
                    <span className="legend-square fault"></span>
                    <span>Falha</span>
                </div>

                <div className="legend-item">
                    <span className="legend-square empty"></span>
                    <span>Quadro Vazio</span>
                </div>
            </div>

            <div className="box-step-history">
                <strong>Passo 1: Acesso à página 5</strong>

                <span className="fault-text">
                    ✗ FALHA DE PÁGINA
                </span>

                <span>
                    Página carregada no quadro vazio 0
                </span>
            </div>

            <div className="box-frame">
                <h3>Frames do buffer</h3>

                <div className="frames-container">
                    <Frame numero={0} pagina={7} estado="hit" />
                    <Frame numero={1} pagina={0} estado="fault" />
                    <Frame numero={2} pagina={1} estado="unused" />
                    <Frame numero={3} pagina={null} estado="empty" />
                    <Frame numero={0} pagina={null} estado="empty" />
                    <Frame numero={1} pagina={null} estado="empty" />
                    <Frame numero={2} pagina={null} estado="empty" />
                    <Frame numero={3} pagina={null} estado="empty" />
                    <Frame numero={0} pagina={null} estado="empty" />
                    <Frame numero={0} pagina={null} estado="empty" />

                    {/* {frames.map((frame, index) => (
                        <Frame
                            key={index}
                            numero={index}
                            pagina={frame.pagina}
                            estado={frame.estado}
                        />
                    ))} */}
                </div>
            </div>
        </div>
    );
};

export default SimulationCard;