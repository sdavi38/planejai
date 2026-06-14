import { useCallback, useEffect, useState } from "react";
import { getInsight, type InsightData } from "../services/aiServices";
import { useSimulationStorage } from "./useSimulationStorage";
import { builAIPrompt } from "../data/aiPrompt";



export const useInsigh = (id: string) => {
    const [insight, setInsightData] = useState<InsightData | null>(null)
    const [isLoading, setLoading] = useState(false)
    const [error, setError] = useState<Error | null>(null)


    const { getFormData } = useSimulationStorage()

    const fetchInsigh = useCallback(async (
        simulationId: string) => {
        const simulation = getFormData(simulationId)
        if (!simulation) {
            setError(new Error("Simulação não encontrada"))
            return;

        }
        setLoading(true)
        setError(null)

        try {
            const prompt = builAIPrompt(simulation)
            const data = await getInsight(prompt)
            setInsightData(data)

            return data
        } catch (error) {
            console.error(error)
            setError(new Error('Erro ao gerar o diagnstico financeiro.Tente novamente ou verifique.'))
        } finally {
            setLoading(false)
        }

    }, [getFormData])

    useEffect(() => {
        if (insight || isLoading || error) {
            return;
        }
        fetchInsigh(id).then((data) => {
            if (!data) {
                return
            }
            setInsightData(data)
        })

    }, [id, isLoading, error, insight, fetchInsigh])

    return { insight, isLoading, error, fetchInsigh }
}