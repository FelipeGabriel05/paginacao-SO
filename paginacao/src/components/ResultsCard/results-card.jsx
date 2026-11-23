// import { Resultados } from "../Header/header";
import "./index.css";

const ResultsCard = () => {
    return (
        <>
            <div>
                {/* <Resultados/> */}
                <div className="results-card">
                    <div className="box-inform">
                        <h3>Frames</h3>
                        <p>3</p>
                    </div>
                    <div className="box-inform">
                        <h3>Referências</h3>
                        <p>20</p>
                    </div>
                    <div className="box-inform">
                        <h3>Taxa de faltas</h3>
                        <p>60%</p>
                    </div>
                    <div className="box-inform">
                        <h3>Evicções</h3>
                        <p>9</p>
                    </div>
                    <div className="box-inform">
                        <h3>Escritas em disco</h3>
                        <p>0</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ResultsCard;