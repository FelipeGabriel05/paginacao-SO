import ConfigurationCard from "../../components/ConfigurationCard/configuration-card";
import { Header } from "../../components/Header/header"
import HistoryCard from "../../components/HistoryCard/history-card";
import ResultsCard from "../../components/ResultsCard/results-card";
import SimulationCard from "../../components/SimulationCard/simulation-card";

const Home = () => {
    return (
        <>
            <Header />
            <section>
                <ConfigurationCard />
                <ResultsCard/>
                <SimulationCard/>
                <HistoryCard/>
            </section>

        </>
    )
}

export default Home;