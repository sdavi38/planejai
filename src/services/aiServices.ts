interface GeminiResponse {
    candidates: {
        content: {
            parts: { text: string }[]
        }
    }[]
}


export interface InsightData {
    feasibility: {
        status: "viable" | "needs_adjustments" | "unfeasible"
        content: string
    }
    diagnosis: {
        content: string
    }
    suggestion: {
        items: string[]
    }
    extraIncome: {
        items: string[]
    }
    investment: {
        items: string[]
    }
    motivation: {
        content: string
    }

}


const API_KEY = String(import.meta.env.VITE_GEMINI_API_KEY)
const MODEL_NAME = 'gemini-flash-latest'
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${API_KEY}`

const callGeminiAPI = async (prompt: string) => {

    const response = await fetch(GEMINI_API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }]
        })
    })

    if (!response.ok) {
        throw new Error(`Erro ao chamar API do Gemini: ${response.statusText}`);
    }
    return (await response.json()) as GeminiResponse
}

export const getInsight = async (prompt: string) => {
    const response = await callGeminiAPI(prompt)
    const json = response.candidates[0].content.parts[0].text

    if (!json) {
        throw new Error("Resposta vazia da IA")
    }

    try {
        return JSON.parse(json) as InsightData
    } catch (error) {
        console.error("Erro ao parsear JSON", error)
        throw new Error("Erro ao parsear JSON")
    }
}

export interface ChatMessage {
    sender: "user" | "ai";
    text: string;
    timestamp: string;
}

/* chatHistory: ChatMessage[] = [] */
export const getChatResponse = async (
    simulation: any,
    initialInsight: InsightData,
    chatHistory: ChatMessage[],
    userQuestion: string
) => {
    const historyText = chatHistory
        .map((msg) => `${msg.sender === "user" ? "Usuário" : "IA"}: ${msg.text}`)
        .join("\n");

    // Defensively extract lists to handle typos or omitted fields in the initial AI JSON response
    const investmentItems = initialInsight?.investment?.items || (initialInsight as any)?.investiment?.items || [];
    const suggestionItems = initialInsight?.suggestion?.items || [];
    const extraIncomeItems = initialInsight?.extraIncome?.items || [];

    const prompt = `
Você é um educador financeiro especializado em finanças pessoais e atua como assistente virtual do Planej.ai. 
Você está conversando com um usuário sobre a simulação financeira dele.

Informações sobre a simulação do usuário:
- Renda Mensal: ${simulation?.income || "Não informado"}
- Custos fixos essenciais: ${simulation?.expenses || "Não informado"}
- Dívidas e Parcelas mensais: ${simulation?.debts || "Não informado"}
- Meta: ${simulation?.goalName || simulation?.golName || "Não informado"}
- Custo da meta: ${simulation?.goalAmount || "Não informado"}
- Prazo desejado: ${simulation?.goalDeadline || "Não informado"} meses

Diagnóstico Inicial da IA sobre a meta:
- Viabilidade: ${initialInsight?.feasibility?.content || "Não informado"} (Status: ${initialInsight?.feasibility?.status || "Não informado"})
- Diagnóstico do orçamento: ${initialInsight?.diagnosis?.content || "Não informado"}
- Recomendações de investimentos sugeridas: ${investmentItems.join(", ") || "Não informado"}
- Sugestões para o orçamento: ${suggestionItems.join(", ") || "Não informado"}
- Ideias de renda extra: ${extraIncomeItems.join(", ") || "Não informado"}

Histórico da Conversa:
${historyText || "(Nenhuma mensagem anterior)"}

Usuário perguntou: "${userQuestion}"

Por favor, responda à pergunta do usuário de forma clara, prestativa, didática e direta. Mantenha um tom encorajador e profissional. Siga estas regras:
1. Responda diretamente ao usuário (fale na segunda pessoa: "você").
2. Seja objetivo e evite respostas excessivamente longas.
3. Forneça conselhos financeiros práticos e seguros (não faça recomendações de compra/venda de ativos específicos fora do contexto educacional).
4. Retorne apenas o texto da resposta (pode usar quebras de linha e formatação básica como negrito com asteriscos).
`;

    const response = await callGeminiAPI(prompt);
    const text = response.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) {
        throw new Error("Erro ao gerar resposta do chat. Tente novamente.");
    }
    return text.trim();
};
