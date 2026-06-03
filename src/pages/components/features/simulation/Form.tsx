import { PiggyBank } from "lucide-react"
import StepProgress from "./Progress"
import FormStep from "./FormStep"



export default function SimulationForm() {
    return (
        <div>
            <StepProgress currentStep={3} totalSteps={10} />
            <FormStep
                icon={PiggyBank}
                title="Renda Mensal Bruta"
                question="Qual o valor de renda mensal (somando todos os depositos)?"
                inputProps={{
                    placeholder: "ex: 2.500,00",
                    type: "text",

                    prefix: "R$",

                }}
            />
        </div>
    )
}