import "./index.css";
import { useEffect, useRef } from "react";

const pages = [1, 2, 3, 4,];
const historico = [
    {
        step: 1,
        n_pages: `Página ${pages[0]}`,
        hit: "Acerto"
    },
    {
        step: 2,
        n_pages: `Página ${pages[1]}`,
        hit: "Falha"
    },
    {
        step: 3,
        n_pages: `Página ${pages[2]}`,
        hit: "Acerto"
    },
    {
        step: 4,
        n_pages: `Página ${pages[3]}`,
        hit: "Acerto"
    },

]

const HistoryCard = () => {
    const passoAtual = 4;
    const passoSelecionado = useRef(null);

    useEffect(() => {
        passoSelecionado.current?.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    }, [passoAtual]);


    return (
        <div className="history-card">
            <h3>Histórico de execução</h3>
            <div className="box-history">
                {historico.map((linha, index) => {
                    const selecionado = linha.step === passoAtual;
                    return (
                        <span
                            key={index}
                            ref={selecionado ? passoSelecionado : null} 
                            className={`
                                steps
                                ${linha.hit === "Acerto" ? "hit" : "fault"}
                                ${linha.step === passoAtual ? "active" : ""}
                            `}
                        >
                            Passo {linha.step}: {linha.n_pages} - {linha.hit}
                        </span>
                    )
                })}
            </div>
        </div>
    )
}

export default HistoryCard;