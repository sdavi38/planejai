import { CalendarClock, CreditCardIcon, Goal, Landmark, PiggyBank, Wallet2 } from "lucide-react";
import PageHero from "../components/Shared/pageHero";
import { Card } from "./components/features/SimulationResult/Card";
;
import { simulateFinancialCalculation } from "../utils/simulation";
import Divider from "../components/Shared/Divider";
import { useParams } from "react-router-dom";
import { useSimulationStorage } from "../hooks/useSimulationStorage";
import { AIInsightCard } from "./components/features/SimulationResult/AlInsightCardProps";

/* Simulação local */
/* const mock: SimulationFormData = {
    goalName: 'Viagem para Argentina',
    income: 'R$ 3.500,00',
    expenses: 'R$ 1.250,00',
    debts: 'R$ 500,00',
    goalAmount: 'R$ 2.793,25',
    goalDeadLine: '12',
}
 */


export default function SimulationResultPage() {
    const { id } = useParams<{ id: string }>()

    const { getFormData } = useSimulationStorage()

    const data = id ? getFormData(id) : null

    if (!data) {
        return <div>
            <h1>Simulação não encontrada</h1>
            <p>A simulação que você está tentando acessar não existe ou foi removida.</p>
        </div>
    }

    const monthlySavings = simulateFinancialCalculation(data);
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
                    value={`${data.goalDeadline} meses`}
                    subtitle={'Prazo para atingir a meta'}
                />
                <Card
                    variant="primary"
                    icon={PiggyBank}
                    label="Economia Mensal"
                    value={`R$ ${monthlySavings.toLocaleString('pt-BR', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                    })}`}
                    subtitle={'Economia Mensal Necessária'}
                />




            </div>


            <div className="grid gap-6 lg:grid-cols-3">
                <AIInsightCard simulationId={data.id} />

                <div className="order-1 flex flex-col gap-6 lg:order-2">

                    <div className="bg-card order-2 rounded-2xl lg:order-1 lg:col-span-2 p-6 shadow-[4px_4px_18px_0px_rgba(0,0,0,0.2)]">
                        <div className="flex  justify-between ">
                            <div className="flex flex-col">
                                <h2 className="text-xl font-semibold">Resumo das suas finanças</h2>
                                <div className="flex items-center gap-2 mt-6">
                                    <Wallet2 size={24} className="text-primary" />
                                    <span className="text-xs font-semibold uppercase tracking-wider text-primary">Renda Mensal</span>
                                </div>
                                <p className="text-3xl font-semibold mb-2 text-foreground">{data.income}</p>
                                <span className="text-muted-foreground mt-1 text-sm">Renda total brutal por mês</span>

                                <Divider orientation="horizontal" />

                                <div className="flex items-center gap-2">
                                    <CreditCardIcon size={24} className="text-primary" />
                                    <span className="text-xs font-semibold uppercase tracking-wider text-primary">Custo Fixo de vida</span>
                                </div>
                                <p className="text-3xl font-semibold mb-2 text-foreground">{data.expenses}</p>
                                <span className="text-muted-foreground mt-1 text-sm">Gastos Fixos essenciais do mês</span>

                                <Divider orientation="horizontal" />

                                <div className="flex items-center gap-2">
                                    <Landmark size={24} className="text-primary" />
                                    <span className="text-xs font-semibold uppercase tracking-wider text-primary">Dividas | Parcelas</span>
                                </div>
                                <p className="text-3xl font-semibold mb-2 text-foreground">{data.debts}</p>
                                <span className="text-muted-foreground mt-1 text-sm">Valor Comprometido parcelas / depósitos</span>




                            </div>

                        </div>
                        <div>

                        </div>
                    </div>


                </div>

            </div>


        </main>
    )
}
