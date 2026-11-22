import { Resultados } from "../Header/header";

const ResultsCard = () => {
    return (
        <>
            <div>
                <Resultados/>
                <div>
                    <label htmlFor="">Algoritmo usado: FIFO</label>
                    <label htmlFor="">Frames: 3</label>
                    <label htmlFor="">Referências: 20</label>
                    <label htmlFor="">Taxa de faltas: 60%</label>
                    <label htmlFor="">Evicções: 9</label>
                    <label htmlFor="">Escritas em disco: 0</label>
                </div>
            </div>
        </>
    )
}

export default ResultsCard;