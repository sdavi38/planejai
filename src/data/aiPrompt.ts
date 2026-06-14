import { paserCurrency } from "../utils/currency"
import { simulateFinancialCalculation } from "../utils/simulation"
import type { SimulationRecord } from "./simulation"

const RESPONSE_SCHEMA = `{
"feasibility":{
"status: "viable" |"needs_adjustments" | "unfeasible",
"content":"<Análise objetiva sobre se meta é atingivel no prazo e valor disponivel.Mencione os  numeros relevantes>"
},
"diagnosis":{
"content":"<Diagnostico focado no compromentimneto do orçamento: quanto % da renda está comprometida com gastos e dividas>"

},
"suggestion":{

    "items":[<"Sugestões práticas de como cortar gastos ou aumentar renda para atingir a meta, ou reorganizar o orçamento"]
},
"extraIcome":{

"items":[<"Ideas de Renda Extra com baixo ou nenhum investimento inicial,compativel com a realidade brasileira">]

},
"investiment":{
    "items":[<"Sugestão de investimento acessivel para o perfil apresentado, com foco em atingir a meta>"],

},
"motivation":{
"content":<"Mensagem final motivacional e personalizada, citando a meta pelo nome. >
}

}`

export function builAIPrompt(simulation: SimulationRecord) {
    const { income, goalName, expenses, debts, goalAmount, goalDeadline } = simulation

    const monthlySavings = simulateFinancialCalculation(simulation)
    const monthSavingsNeeded = paserCurrency(goalAmount) / parseInt(goalDeadline)

    return `
  Você é um educador financeiro em finanças pessoais, e analista de investimentos 
  analise os dados abaixo e gere um diagnostico financeiro personalizado com linguagem clara, didática e encorajadora,
    volatada para pessoas sem conhecimento financeiro.O diagnóstico será exibido em um card na página de resultados da simulação.
  fale sempre na segunda pesssoa("voçe tem.. ", "sua meta")

  dados da simulação:
- Renda Mensal: ${income}
- Custos fixos essenciais: ${expenses}
- Dívidas e Parcelas mensais: ${debts}p
-Valor disponivel por mês: ${monthlySavings} reais
    - Meta: ${goalName}
- Custo da meta: ${goalAmount}
- Prazo desejado: ${goalDeadline} meses

    Retorne Apenas um JSON VÁLIDO, sem texto adcional, sem bloco de código, neste formato exato:
    
    ${RESPONSE_SCHEMA}


Regras:
-Todos os textos em portugues Brasil
-Máximo de 4 itens por lista
- Seja especifico ao ciitar valores calculados
-Não repita informações entre seções
-Nunca use markdown dentro dos valores JSON
-Para o campo feasibility.status use apenas os seguintes criterios:
-"viable": Saldo após reseva para a meta é maior ou igual a 0 
-"needs_adjustments": Saldo negativo atá 20% da economia do valor mensal necessaria
 -"unfeasible": Saldo negativo superior a 20% da economia do valor mensal necessaria

    `

}