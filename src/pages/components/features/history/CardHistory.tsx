import { useNavigate } from "react-router-dom";
import { ExternalLink, Trash2, Calendar, Goal } from "lucide-react";
import type { SimulationRecord } from "../../../../data/simulation";
import { Button } from "../../../../components/Shared/Button";
import { simulateFinancialCalculation } from "../../../../utils/simulation";

interface CardHistoryProps {
   simulation: SimulationRecord;
   onDelete: (id: string, e: React.MouseEvent) => void;
}

export function CardHistory({ simulation, onDelete }: CardHistoryProps) {
   const navigate = useNavigate();

   const formatDate = (isoString?: string) => {
      if (!isoString) return new Date().toLocaleDateString('pt-BR');
      try {
         const date = new Date(isoString);
         return date.toLocaleDateString('pt-BR');
      } catch {
         return new Date().toLocaleDateString('pt-BR');
      }
   };

   const getGoalName = () => {
      return simulation.goalName || (simulation as any).golName || "Sem nome";
   };

   /* const getStatusDetails = () => {
      if (!simulation.insight) {
         return {
            label: "Sem diagnóstico",
            className: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400"
         };
      }
      try {
         const parsed = JSON.parse(simulation.insight);
         const status = parsed?.feasibility?.status;
         if (status === "viable") {
            return {
               label: "Saudável",
               className: "bg-green-100 text-green-700 dark:bg-green-950/30 dark:text-green-400"
            };
         } else if (status === "needs_adjustments" || status === "needsAdjustment") {
            return {
               label: "Ajustes necessários",
               className: "bg-amber-100 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400"
            };
         } else if (status === "unfeasible") {
            return {
               label: "Preocupante",
               className: "bg-red-100 text-red-700 dark:bg-red-950/30 dark:text-red-400"
            };
         }
      } catch (e) {
         console.error("Erro ao ler status de viabilidade do insight:", e);
      }
      return {
         label: "Sem diagnóstico",
         className: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400"
      };
   };

   const monthlySavings = simulateFinancialCalculation(simulation); */
   //const status = getStatusDetails();

   const monthlySavings = simulateFinancialCalculation(simulation);

   return (
      <div
         className=" rounded-2xl border border-(--border) bg-card p-5 shadow-[4px_4px_18px_0px_rgba(0,0,0,0.05)] hover:shadow-[4px_4px_22px_0px_rgba(0,0,0,0.12)] hover:border-primary/25 transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-4 w-full"
      >
         {/* Esquerda: Título, Data e Status */}
         <div className="flex flex-col gap-2 w-full md:w-auto md:min-w-[280px] md:max-w-[320px]">
            <div className="flex items-center gap-3 w-full">
               <div className="bg-primary/60 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl">
                  <Goal size={20} className="text-primary-foreground" />
               </div>
               <h3 className="tracking-wider nd font-semibold group-hover:text-primary transition-colors line-clamp-1 flex-1">
                  {getGoalName()}
               </h3>
               {/* <span className={`shrink-0 inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold ${status.className}`}>
                  {status.label}
               </span> */}
            </div>

            <div className="flex items-center gap-1.5 pl-12 text-xs text-muted-foreground">
               <Calendar size={12} />
               <span>{formatDate(simulation.createdAt)}</span>
            </div>
         </div>

         {/* Centro: Informações Financeiras */}
         <div className="flex flex-row items-center  justify-between md:justify-center 
         gap-4 md:gap-10 border-y md:border-y-0 md:border-x border-(--border) py-4 md:py-0 px-0 md:px-8 flex-1">
            <div className="flex items-center text-sm gap-4">

               <div className="flex flex-col ">
                  <span className="uppercase tracking-wider text-muted-foreground font-semibold">Custo Meta</span>
                  <span className=" font-bold text-foreground mt-2">
                     {simulation.goalAmount}
                  </span>
               </div>
            </div>

            <div className="flex items-center text-sm gap-2">

               <div className="flex flex-col">
                  <span className="uppercase tracking-wider text-muted-foreground font-semibold">Prazo</span>
                  <span className=" font-bold text-foreground mt-2">
                     {simulation.goalDeadline} meses
                  </span>
               </div>
            </div>

            <div className="flex items-center text-sm gap-2">

               <div className="flex flex-col">
                  <span className="uppercase tracking-wider text-muted-foreground font-semibold">Economia</span>
                  <span className=" font-bold text-foreground mt-2">
                     R$ {monthlySavings.toLocaleString('pt-BR', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                     })}
                  </span>
               </div>
            </div>
         </div>

         {/* Direita: Ações */}
         <div className="flex items-center gap-2 justify-end shrink-0" onClick={(e) => e.stopPropagation()}>
            <Button
               variant="secondary"
               onClick={() => navigate(`/result/${simulation.id}`)}
               title="Ver detalhes"
               icon={ExternalLink}
               className="text-xs font-semibold py-2 px-4 inline-flex items-center justify-center gap-1.5"
            >
               Ver detalhes
            </Button>

            <Button
               variant="danger"
               icon={Trash2}
               onClick={(e) => onDelete(simulation.id, e)}
               title="Excluir"
               className="p-2.5 rounded-xl shrink-0"
            />
         </div>
      </div>
   );
}
