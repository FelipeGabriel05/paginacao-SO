import "./index.css";
import Frame from "./frames";
import { useState } from "react";

const SimulationCard = ({ resultado }) => {
    const [step, setStep] = useState(1);
    if (!resultado) {
        return (
            <div className="simulation-card">
                <p>Inicie uma simulação para visualizar os passos.</p>
            </div>
        );
    }
    const historico = resultado.historico;
    const passoAtual = historico[step - 1]

    const proximoPasso = () => {
        if (step < resultado.referencias) {
            setStep(step + 1);
        }
    };

    const passoAnterior = () => {
        if (step > 1) {
            setStep(step - 1);
        }
    };

    // Ainda não existe simulação
    return (
        <div className="simulation-card">

            <div className="simulation-controls">
                <button 
                    className="previous-button"
                    onClick={passoAnterior}
                >
                    Anterior
                </button>
                <button 
                    className="next-button"
                    onClick={proximoPasso}
                >
                    Próximo
                </button>
                <button className="autoplay-button">Auto play</button>
            </div>

            <div className="box-step">
                Passo: {step}/{resultado.referencias}
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
                <strong>Passo {passoAtual.passo}: Acesso à página {passoAtual.pagina}</strong>

                <span
                    className={
                        passoAtual.resultado === "falha"
                            ? "fault-text"
                            : "hit-text"
                    }
                >
                    {passoAtual.resultado === "falha"
                        ? "✗ FALHA DE PÁGINA"
                        : "✓ ACERTO"
                    }
                </span>

                {/* Mostra somente quando houve escrita */}
                {passoAtual.escrita && (
                    <span className="write-text">
                        ⚠ Escrita em disco necessária: página {" "}
                        {passoAtual.paginaEscrita}
                    </span>
                )}

            </div>

            <div className="box-frame">
                <h3>Frames do buffer</h3>

                <div className="frames-container">
                    {passoAtual.frames.map((frame, index) => {

                        let estado = "unused";

                        if (frame.pagina === null) {
                            estado = "empty";
                        }

                        if (index === passoAtual.frameAlterado) {
                            estado =
                                passoAtual.resultado === "acerto"
                                    ? "hit"
                                    : "fault";
                        }

                        return (
                            <Frame
                                key={index}
                                numero={index}
                                pagina={frame.pagina}
                                estado={estado}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default SimulationCard;