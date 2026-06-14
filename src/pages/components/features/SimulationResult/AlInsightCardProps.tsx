import { useInsight } from "../../../../hooks/useInsight"
import { Content } from "../insights/Content"
import { Error } from "../insights/Error"

interface AIInsightCardProps {
    simulationId: string
}
export function AIInsightCard({ simulationId }: AIInsightCardProps) {
    const { insight, isLoading, error, fetchInsigh } = useInsight(simulationId)

    return (
        <div className="bg-card order-2 rounded-2xl lg:order-1 lg:col-span-2 p-6 shadow-[4px_4px_18px_0px_rgba(0,0,0,0.2)]">
            <div className="mb-3 flex items-center gap-1.5">
                <span>✨</span>
                <span className="text-primary text-xs font-semibold tracking-widest uppercase">
                    Insight Financeiro Personalizado
                </span>

            </div>
            {isLoading && <p>Gerando seus insights...</p>}
            {!isLoading && error && (
                <Error simulationId={simulationId} message={error}
                    onRetry={() => { fetchInsigh(simulationId) }} />
            )}
            {!isLoading && insight && error && <Content />}
        </div>
    )
}