import { Calendar, CalendarClock, Goal } from "lucide-react";
import PageHero from "../components/Shared/pageHero";
import { Card } from "./components/features/SimulationResult/Card";
import type { SimulationFormData } from "../data/simulation";

/* Simulação local */
const mock: SimulationFormData = {
    goalName: 'Viagem para Argentina',
    income: 'R$ 3.500,00',
    expenses: 'R$ 1.250,00',
    debts: 'R$ 500,00',
    goalAmount: 'R$ 2.793,25',
    goalDeadLine: '12',
}



export default function SimulationResultPage() {

    const data: SimulationFormData = mock;
    return (
        <main className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
            <PageHero
                title="Resultado da sua simulação"
                subtitle="Com base no seu perfil financeiro e objetivos"
            />
            <div className="mb-6 grid grid-cols-1 gap-4 lg:grid-cols-3  ">

                <Card
                    icon={Goal}
                    label="Custo da Meta"
                    value={data.goalAmount}
                    subtitle={data.goalName}
                />
                <Card
                    icon={CalendarClock}
                    label="Prazo"
                    value={`${data.goalDeadLine} meses`}
                    subtitle={'Prazo para atingir a meta'}
                />




            </div>
        </main>
    )
}
