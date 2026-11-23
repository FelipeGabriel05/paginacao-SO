// import { Resultados } from "../Header/header";
import "./index.css";

const ResultsCard = ({n_frames, pages, taxa_faltas, evic, w_disco}) => {
    return (
        <>
            <div>
                {/* <Resultados/> */}
                <div className="results-card">
                    <div className="box-inform">
                        <h3>Frames</h3>
                        <p>{n_frames}</p>
                    </div>
                    <div className="box-inform">
                        <h3>Referências</h3>
                        <p>{pages}</p>
                    </div>
                    <div className="box-inform">
                        <h3>Taxa de faltas</h3>
                        <p>{taxa_faltas}%</p>
                    </div>
                    <div className="box-inform">
                        <h3>Evicções</h3>
                        <p>{evic}</p>
                    </div>
                    <div className="box-inform">
                        <h3>Escritas em disco</h3>
                        <p>{w_disco}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ResultsCard;