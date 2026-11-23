import "./index.css";

const SimulationCard = () => {
    return (
        <div className="simulation-card">
            {/* <Simulacao /> */}

            <div className="simulation-controls">
                <button className="previous-button">Anterior</button>
                <button className="next-button">Próximo</button>
                <button className="autoplay-button">Auto play</button>
            </div>

            <div className="box-step">
                Passo: 4/20
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
                    {/* Os frames serão adicionados aqui depois */}
                </div>
            </div>
        </div>
    );
};

export default SimulationCard;