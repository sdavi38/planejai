import type { InsightData } from "../../../../services/aiServices"

interface ContentProps {
    insight: InsightData
}

function Paragraph({ children }: { children: React.ReactNode }) {
    return <p className="text-muted-foreground text-sm leading-relaxed">{children}</p>
}

function SectionTitle({ children }: { children: React.ReactNode }) {
    return <h3 className="text-foreground mt-5 mb-1.5 text-sm leading-relaxed font-semibold">{children}</h3>
}

function OrderedList({ items }: { items: string[] }) {
    return (
        <ul className="text-muted-foreground text-sm leading-relaxed list-decimal ml-6">
            {items.map((items, index) => (
                <li key={index} className="pl-1">{items}</li>
            ))}
        </ul>
    )

}

const statusStyles = {
    viable: {
        label: 'Meta Viável no prazo',
        className: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
    },
    needs_adjustments: {
        label: 'Ajustes necessários',
        className: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
    },
    needsAdjustment: {
        label: 'Ajustes necessários',
        className: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
    },
    unfeasible: {
        label: 'Meta inviável no prazo',
        className: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
    }
}

export function Content({ insight }: ContentProps) {
    const status = statusStyles[insight.feasibility.status] ?? null


    return (
        <>
            <div className="lg:scrollbar-thin lg:max-h-93 lg:overflow-y-auto lg:pr-2
            lg:[scrollbar-color-var(--border)_transparent] ">
                <section className="flex flex-col gap-2">
                    <div className="flex flex-col items-start gap-2 sm:flex-row">
                        <span className="text-foreground text-sm font-semibold">
                            Vialibilidade de Meta
                        </span>
                        {status && (
                            <span className={`w-fit rounded-full px-2.5 py-0.5 text-xs 
                            font-semibold ${status.className}`}>
                                {status.label}
                            </span>
                        )}
                    </div>

                    <Paragraph> {insight.feasibility.content}</Paragraph>
                </section>

                <section>
                    <SectionTitle>Diagnóstico Financeiro</SectionTitle>
                    <Paragraph>{insight.diagnosis.content}</Paragraph>

                </section>
                <section>
                    <SectionTitle>Sugestões Práticas</SectionTitle>
                    <OrderedList
                        items={insight.suggestion?.items || []} />

                </section>
                <section>
                    <SectionTitle>Sugestão de Investimento</SectionTitle>
                    <OrderedList items={insight.investment?.items || (insight as any).investiment?.items || []} />
                </section>
                <section>
                    <SectionTitle>Mensagem Final</SectionTitle>
                    <Paragraph>{insight.motivation.content}</Paragraph>
                </section>

            </div>
        </>
    )
}