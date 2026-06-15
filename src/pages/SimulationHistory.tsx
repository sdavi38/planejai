import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TrendingUp } from "lucide-react";
import PageHero from "../components/Shared/pageHero";
import { useSimulationStorage } from "../hooks/useSimulationStorage";
import type { SimulationRecord } from "../data/simulation";
import { Button } from "../components/Shared/Button";
import { CardHistory } from "./components/features/history/CardHistory";
import { ConfirmModal } from "../components/Shared/ConfirmModal";

export default function SimulationHistory() {
    const navigate = useNavigate();
    const { getAllSimulations, deleteSimulation } = useSimulationStorage();
    const [simulations, setSimulations] = useState<SimulationRecord[]>([]);
    
    // Modal states
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [simulationToDelete, setSimulationToDelete] = useState<SimulationRecord | null>(null);

    useEffect(() => {
        setSimulations(getAllSimulations());
    }, []);

    const handleDeleteClick = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        const sim = simulations.find((s) => s.id === id);
        if (sim) {
            setSimulationToDelete(sim);
            setIsDeleteModalOpen(true);
        }
    };

    const handleConfirmDelete = () => {
        if (simulationToDelete) {
            deleteSimulation(simulationToDelete.id);
            setSimulations(getAllSimulations());
            setIsDeleteModalOpen(false);
            setSimulationToDelete(null);
        }
    };

    const getGoalName = (sim: SimulationRecord | null) => {
        if (!sim) return "";
        return sim.goalName || (sim as any).golName || "Sem nome";
    };

    return (
        <main className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
            <PageHero
                title="Histórico de Simulações"
                subtitle="Acompanhe o histórico de seus planos financeiros."
            />

            {simulations.length === 0 ? (
                <div className="mt-8 flex flex-col items-center justify-center rounded-2xl border border-dashed border-(--border) p-12 text-center bg-card shadow-[4px_4px_18px_0px_rgba(0,0,0,0.05)]">
                    <h3 className="text-lg font-semibold text-foreground mb-1">Nenhuma simulação encontrada</h3>
                    <p className="text-sm text-muted-foreground max-w-sm mb-6">
                        Você ainda não realizou nenhuma simulação de planejamento financeiro. Comece agora mesmo!
                    </p>
                    <Button
                        variant="primary"
                        onClick={() => navigate("/")}
                        icon={TrendingUp}
                    >
                        Nova Simulação
                    </Button>
                </div>
            ) : (
                <div className="mt-8 flex flex-col gap-4 w-full">
                    {simulations.map((sim) => (
                        <CardHistory
                            key={sim.id}
                            simulation={sim}
                            onDelete={handleDeleteClick}
                        />
                    ))}
                </div>
            )}

            {/* Confirm Delete Modal */}
            <ConfirmModal
                isOpen={isDeleteModalOpen}
                onClose={() => {
                    setIsDeleteModalOpen(false);
                    setSimulationToDelete(null);
                }}
                onConfirm={handleConfirmDelete}
                title="Excluir Simulação"
                description={
                    <span>
                        Tem certeza que deseja excluir a simulação de meta{" "}
                        <strong className="text-foreground font-semibold">
                            "{getGoalName(simulationToDelete)}"
                        </strong>
                        ? Esta ação é irreversível e todos os dados associados serão apagados permanentemente.
                    </span>
                }
                confirmText="Excluir"
                cancelText="Cancelar"
                variant="danger"
            />
        </main>
    );
}

