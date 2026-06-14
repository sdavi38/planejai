import { CalendarClock, Goal, PiggyBank, Wallet, Landmark } from "lucide-react";

import type { FormStepProps } from "../pages/components/features/simulation/FormStep";

export const simulationFormSteps = [
    {
        id: "income",
        icon: PiggyBank,
        title: "Renda Mensal Bruta",
        question: "Qual o valor de renda mensal (somando todos os depositos)?",
        inputProps: {
            placeholder: "Ex:2.500,00",
            maxLength: 12,
            prefix: "R$"
        }
    },
    {
        id: "expenses",
        icon: Wallet,
        title: "Custos fixos de vida",
        question: "Qual o valor de despesas fixas mensais (aluguel, contas, etc..)?",
        inputProps: {
            placeholder: "Ex:1.200,00",
            maxLength: 12,
            prefix: "R$"
        }
    },
    {
        id: "debts",
        icon: Landmark,
        title: "Dívidas e Empréstimos",
        question: "Você possui dívidas ou empréstimos com parcelas mensais?",
        inputProps: {
            placeholder: "Ex:R$500,00",
            maxLength: 12,
            prefix: "R$"
        }
    },
    {
        id: "golName",
        icon: Goal,
        title: "Nome da meta",
        question: "Qual o objetivo que você deseja alcançar?",
        inputProps: {
            placeholder: "Ex:Viagem para Londres",
            maxLength: 50,
        }
    },
    {
        id: "goalAmount",
        icon: Wallet,
        title: "Valor total para a meta",
        question: "Qual o valor total que você deseja alcançar?",
        inputProps: {
            placeholder: "Ex:R$12.000,00",
            maxLength: 12,
            prefix: "R$",
        }
    },
    {
        id: "goalDeadline",
        icon: CalendarClock,
        title: "Prazo da meta",
        question: "Por quanto tempo você pretende deixar o dinheiro investido?",
        inputProps: {
            type: "number",
            placeholder: "Ex:12",
            suffix: "meses",
            min: 1,
            max: 12,

        },

    },
    {
        id: "investmentHorizon",
        icon: CalendarClock,
        title: "Prazo de Investimento",
        question: "Por quanto tempo você pretende deixar o dinheiro investido?",
        inputProps: {
            placeholder: "Ex:5 anos",
            maxLength: 12,
        },
        submitButtonProps: {
            label: "Gerar simulação",
            emojiIcon: "🚀",

        }
    },

] satisfies FormStepProps[]

export type SimulationFormData = Record<typeof simulationFormSteps[number]["id"], string>

export type SimulationRecord = SimulationFormData & { id: string; insight?: string }