import { useInsight } from "../../../../hooks/useInsight"


interface AIInsightCardProps {
    simulationId: string
}
export function AIInsightCard({ simulationId }: AIInsightCardProps) {
    const { insight } = useInsight(simulationId)
    console.log(insight)

    return (
        <div className="bg-card order-2 rounded-2xl lg:order-1 lg:col-span-2 p-6 shadow-[4px_4px_18px_0px_rgba(0,0,0,0.2)]">
            painel insigth
        </div>
    )
}