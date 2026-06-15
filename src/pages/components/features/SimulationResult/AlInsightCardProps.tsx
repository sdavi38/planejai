
import { useState, useEffect, useRef } from "react";
import "react-loading-skeleton/dist/skeleton.css";
import { useInsight } from "../../../../hooks/useInsight";
import { Content } from "../insights/Content";
import { Error } from "../insights/Error";
import Skeleton from "react-loading-skeleton";
import { Input } from "../../../../components/Shared/Input";
import { Button } from "../../../../components/Shared/Button";
import { Send } from "lucide-react";
import { useSimulationStorage } from "../../../../hooks/useSimulationStorage";
import { getChatResponse, type ChatMessage } from "../../../../services/aiServices";

interface AIInsightCardProps {
    simulationId: string;
}

export function AIInsightCard({ simulationId }: AIInsightCardProps) {
    const { insight, isLoading, error, fetchInsigh } = useInsight(simulationId);
    const { getFormData, updateSimulation } = useSimulationStorage();

    const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
    const [question, setQuestion] = useState("");
    const [isWaitingForAi, setIsWaitingForAi] = useState(false);
    const chatContainerRef = useRef<HTMLDivElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Load messages from simulation record when component mounts or simulationId changes
    useEffect(() => {
        const sim = getFormData(simulationId);
        if (sim && (sim as any).chatHistory) {
            setChatMessages((sim as any).chatHistory);
        } else {
            setChatMessages([]);
        }
    }, [simulationId, getFormData]);

    // Scroll to the bottom of the chat container when a new message arrives or AI starts/ends thinking
    useEffect(() => {
        const timer = setTimeout(() => {
            if (chatContainerRef.current) {
                chatContainerRef.current.scrollTo({
                    top: chatContainerRef.current.scrollHeight,
                    behavior: "smooth",
                });
            }
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }, 100);
        return () => clearTimeout(timer);
    }, [chatMessages, isWaitingForAi]);

    const handleSend = async () => {
        if (!question.trim() || isWaitingForAi) return;

        const currentQuestion = question.trim();
        setQuestion(""); // Clear the input field

        const userMsg: ChatMessage = {
            sender: "user",
            text: currentQuestion,
            timestamp: new Date().toISOString(),
        };

        const updatedMessages = [...chatMessages, userMsg];
        setChatMessages(updatedMessages);

        // Save immediately to local storage
        const sim = getFormData(simulationId);
        if (sim) {
            updateSimulation(simulationId, {
                ...sim,
                chatHistory: updatedMessages,
            } as any);
        }

        setIsWaitingForAi(true);

        try {
            if (!insight) {
                throw new window.Error("Insight não carregado");
            }
            const aiReply = await getChatResponse(
                sim,
                insight,
                chatMessages,
                currentQuestion
            );

            const aiMsg: ChatMessage = {
                sender: "ai",
                text: aiReply,
                timestamp: new Date().toISOString(),
            };

            const finalMessages = [...updatedMessages, aiMsg];
            setChatMessages(finalMessages);

            // Save the AI response to local storage
            if (sim) {
                updateSimulation(simulationId, {
                    ...sim,
                    chatHistory: finalMessages,
                } as any);
            }
        } catch (err) {
            console.error("Erro na resposta do chat:", err);
            const errorMsg: ChatMessage = {
                sender: "ai",
                text: "Desculpe, ocorreu um erro ao processar sua pergunta. Por favor, verifique sua conexão ou tente novamente.",
                timestamp: new Date().toISOString(),
            };
            setChatMessages([...updatedMessages, errorMsg]);
        } finally {
            setIsWaitingForAi(false);
        }
    };

    return (
        <div className="bg-card order-2 rounded-2xl lg:order-1 lg:col-span-2 p-6 shadow-[4px_4px_18px_0px_rgba(0,0,0,0.2)] flex flex-col justify-between">
            <div>
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
                            className="flex mb-3 rounded-lg"
                            inline
                        />
                    </div>
                )}

                {!isLoading && error && (
                    <Error
                        simulationId={simulationId}
                        message={typeof error === "string" ? error : error.message}
                        onRetry={() => {
                            fetchInsigh(simulationId);
                        }}
                    />
                )}

                {!isLoading && insight && !error && <Content insight={insight} />}

                {/* Chat History Area */}
                {!isLoading && insight && !error && (
                    <div className="mt-6 border-t border-border pt-6">
                        <h4 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2">
                            💬 Converse com seu Assistente
                        </h4>

                        <div
                            ref={chatContainerRef}
                            className="flex flex-col gap-4 max-h-[300px] overflow-y-auto pr-2 mb-4 scrollbar-thin scrollbar-thumb-rounded"
                        >
                            {chatMessages.length === 0 ? (
                                <div className="text-xs text-muted-foreground bg-muted-primary border border-primary/10 rounded-xl p-4 text-center">
                                    Olá! Sou seu assistente de finanças pessoais do Planej.ai. Pergunte-me qualquer dúvida sobre o diagnóstico ou como atingir sua meta!
                                </div>
                            ) : (
                                chatMessages.map((msg, index) => (
                                    <div
                                        key={index}
                                        className={`flex flex-col max-w-[85%] ${msg.sender === "user" ? "self-end items-end" : "self-start items-start"
                                            }`}
                                    >
                                        <span className="text-sm text-muted-foreground mb-1 px-1">
                                            {msg.sender === "user" ? "Você" : "Resposta da IA"} • {new Date(msg.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                                        </span>
                                        <div
                                            className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${msg.sender === "user"
                                                ? "bg-primary text-primary-foreground rounded-tr-none shadow-md shadow-primary/10"
                                                : "bg-secondary-button text-foreground rounded-tl-none border border-border"
                                                }`}
                                            style={{ whiteSpace: "pre-line" }}
                                        >
                                            {msg.text}
                                        </div>
                                    </div>
                                ))
                            )}

                            {isWaitingForAi && (
                                <div className="self-start flex flex-col max-w-[85%] items-start">
                                    <span className="text-[10px] text-muted-foreground mb-1 px-1">
                                        Analisando sua pergunta...
                                    </span>
                                    <div className="rounded-2xl rounded-tl-none bg-secondary-button text-foreground border border-border px-4 py-3 flex items-center gap-1.5">
                                        <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0ms" }} />
                                        <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "150ms" }} />
                                        <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "300ms" }} />
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>
                    </div>
                )}
            </div>

            {/* Input and Send Button Area */}
            {!isLoading && insight && !error && (
                <div className="flex items-center gap-3 mt-4 text-amber-50 w-full">
                    <Input
                        containerClassName="flex-1 shadow-none border border-border"
                        placeholder="Faça uma pergunta sobre sua simulação..."
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                handleSend();
                            }
                        }}
                        disabled={isWaitingForAi}
                    />
                    <Button
                        icon={Send}
                        variant="primary"
                        className="rounded-2xl py-4 px-5 shrink-0 cursor-pointer disabled:opacity-50"
                        title="Enviar pergunta"
                        onClick={handleSend}
                        disabled={isWaitingForAi || !question.trim()}
                    />
                </div>
            )}
        </div>
    );
}
