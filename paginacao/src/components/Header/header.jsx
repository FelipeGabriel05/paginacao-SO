import "./header.css"
import { CiSettings, CiPlay1, CiViewTimeline } from "react-icons/ci";
import { LuChartColumn } from "react-icons/lu";

export const Header = () => {
    return (
        <h1 className="title">
            Substituição de Página - Sistemas Operacionais
        </h1>
    )
}

export const Configuracao = () => {
    return (
        <h2 className="title">
            <CiSettings /> Configuração
        </h2>
    )
}

export const Resultados = () => {
    return (
        <h2 className="title">
            <LuChartColumn/> Resultados
        </h2>
    )
}

export const Simulacao = () => {
    return (
        <h2 className="title">
            <CiPlay1/> Simulação
        </h2>
    )
}

export const Historico = () => {
    return (
        <h2 className="title">
            <CiViewTimeline/> Histórico
        </h2>
    )
}