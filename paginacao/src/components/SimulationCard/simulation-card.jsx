import { Simulacao } from "../Header/header"

const SimulationCard = () => {
    return (
        <div>
            <Simulacao />
            <button>Anterior</button>
            <button>Próximo</button>
            <button>Auto play</button>
            <div>
                Passo: 4/20
            </div>
            <div>
                Quadro de avisos acerto | falha | quadro vazio
            </div>
            <div>
                Passo 1: Acesso à página 5
                ✗ FALHA DE PÀGINA

                Página carregada no quadro vazio 0
            </div>
            <div>
                Frames do buffer
            </div>
        </div>
    )
}

export default SimulationCard;