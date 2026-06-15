
import "react-loading-skeleton/dist/skeleton.css"
import { useInsight } from "../../../../hooks/useInsight"
import { Content } from "../insights/Content"
import { Error } from "../insights/Error"
import Skeleton from "react-loading-skeleton"
import { Input } from "../../../../components/Shared/Input"
import { Button } from "../../../../components/Shared/Button"
import { Send } from "lucide-react"

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
            {isLoading && (
                <div className="flex">
                    <Skeleton
                        count={11.5}
                        baseColor="var(--color-skeleton-base)"
                        highlightColor="var(--color-skeleton-highlight)"
                        containerClassName="flex-1"
                        className=" flex mb-3 rounded-lg"
                        inline

                    />
                </div>
            )}



            {!isLoading && error && (
                <Error simulationId={simulationId} message={typeof error === "string" ? error : error.message}
                    onRetry={() => { fetchInsigh(simulationId) }} />
            )}
            {!isLoading && insight && !error && <Content insight={insight} />}
            <div className="flex items-center gap-3 mt-8 w-full">
                <Input
                    containerClassName="flex-1 shadow-none border border-border"
                    placeholder="Faça uma pergunta sobre sua simulação"
                />
                <Button
                    icon={Send}
                    variant="primary"
                    className="rounded-2xl py-4 px-5 shrink-0 cursor-pointer"
                    title="Enviar pergunta"
                />
            </div>
        </div>
    )
}