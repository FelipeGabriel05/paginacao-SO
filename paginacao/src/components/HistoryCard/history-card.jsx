import "./index.css";
import { useEffect, useRef } from "react";

const HistoryCard = ({ historico, step }) => {

    const passoSelecionado = useRef(null);

    useEffect(() => {

        passoSelecionado.current?.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    }, [step]);

    return (
        <div className="history-card">

            <h3>Histórico de execução</h3>

            <div className="box-history">

                {historico.map((linha, index) => {

                    const passo = index + 1;

                    return (
                        <span
                            key={index}
                            ref={
                                passo === step
                                    ? passoSelecionado
                                    : null
                            }
                            className={`
                                steps
                                ${linha.resultado === "acerto"
                                    ? "hit"
                                    : "fault"
                                }
                                ${passo === step ? "active" : ""}
                            `}
                        >
                            Passo {linha.passo}: Página{" "}
                            {linha.pagina} -{" "}
                            {linha.resultado === "acerto"
                                ? "Acerto"
                                : "Falha"
                            }
                        </span>
                    );
                })}

            </div>

        </div>
    );
};

export default HistoryCard;