import { Configuracao } from "../Header/header";

const ConfigurationCard = () => {
    return (
        <>
            <div className="card">
                <Configuracao />
                <label htmlFor="algoritmo">Algoritmo: </label>
                <select 
                    name="algoritmo" 
                    id="algoritmo"
                >
                    <option value="FIFO">FIFO (First-In, First-Out)</option>
                    <option value="LRU">LRU (Least Recently Used)</option>
                    <option value="OTIMO">Ótimo</option>
                    <option value="CLOCK">Clock (Second Chance)</option>
                    <option value="NRU">NRU (Not Recently Used)</option>
                    <option value="LFU">LFU (Least Frequently Used)</option>
                    <option value="MFU">MFU (Most Frequently Used)</option>
                </select>

                <label htmlFor="frames">Frames: </label>
                <input type="number" name="frames" id="frames" required/>

                <label htmlFor="pages">Lista de páginas: </label>
                <textarea name="pages" id="pages">7, 0, 1, 2, 0, 3, 0, 4, 2, 3, 0, 3, 2, 1, 2, 0, 1, 7, 0, 1</textarea>
            </div>

            <button>Iniciar Simulação</button>
            <button>Resetar</button>
        </>
    )
}

export default ConfigurationCard;