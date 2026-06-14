import { useCallback, useEffect, useRef, useState } from "react";
import { getInsight, type InsightData } from "../services/aiServices";
import { useSimulationStorage } from "./useSimulationStorage";
import { builAIPrompt } from "../data/aiPrompt";
import type { SimulationRecord } from "../data/simulation";



export const useInsight = (id: string) => {
    const isRequestPending = useRef(false)

    const { getFormData, updateSimulation } = useSimulationStorage()
    const [insight, setInsightData] = useState<InsightData | null>(() => {
        const simulation = getFormData(id)
        if (simulation?.insight) {
            try {
                return JSON.parse(simulation.insight) as InsightData
            } catch (e) {
                console.error("Erro ao parsear o insight salvo:", e)
            }
        }
        return null
    })




    const [isLoading, setLoading] = useState(false)
    const [error, setError] = useState<Error | null>(null)


    const fetchInsigh = useCallback(async (
        simulationId: string) => {
        const simulation = getFormData(simulationId)
        if (!simulation) {
            setError(new Error("Simulação não encontrada"))
            return;

        }
        /* evitando requisições antes de finalizar anterior */
        isRequestPending.current = true

        setLoading(true)
        setError(null)

        try {
            const prompt = builAIPrompt(simulation)
            const data = await getInsight(prompt)

            setInsightData(data)
            updateSimulation(simulationId, {
                ...simulation,
                insight: JSON.stringify(data)
            } as SimulationRecord)

        } catch (error) {
            console.error(error)
            setError(new Error('Erro ao gerar o diagnstico financeiro.Tente novamente ou verifique.'))
        } finally {
            isRequestPending.current = false
            setLoading(false)
        }

    }, [getFormData, updateSimulation])

    useEffect(() => {
        if (insight || isLoading || error || isRequestPending.current) {
            return;
        }
        fetchInsigh(id)

    }, [id, isLoading, error, insight, fetchInsigh])

    return { insight, isLoading, error, fetchInsigh }
}