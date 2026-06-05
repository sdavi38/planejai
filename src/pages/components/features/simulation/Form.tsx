import { useState } from "react";
import { useNavigate } from "react-router-dom";
import StepProgress from "./Progress"
import FormStep from "./FormStep"
import { simulationFormSteps, type SimulationFormData } from "../../../../data/simulation"
import { useSimulationStorage } from "../../../../hooks/useSimulationStorage";

export default function SimulationForm() {
    const navigate = useNavigate()
    const { saveFormData } = useSimulationStorage()
    const [currentStepIndex, setCurrentStepIndex] = useState(0)
    const totalSteps = simulationFormSteps.length
    const currentStep = simulationFormSteps[currentStepIndex]
    const [formData, setFormData] = useState<SimulationFormData>({} as SimulationFormData)

    const handleNextStep = (value: string) => {
        const updateFormData = { ...formData, [currentStep.id]: value }
        setFormData(updateFormData)

        if (currentStepIndex + 1 >= totalSteps) {
            const id = saveFormData(updateFormData)
            navigate(`/result/${id}`)
            return
        }
        setCurrentStepIndex((prev) => prev + 1)
    }
    const handlePrevStep = () => {
        if (currentStepIndex === 0) {
            return
        }
        setCurrentStepIndex((prev) => prev - 1)

    }

    return (
        <div>
            <StepProgress currentStep={currentStepIndex + 1} totalSteps={totalSteps} />
            <FormStep
                key={currentStep.id}
                {...currentStep}
                onBack={handlePrevStep}
                onNext={handleNextStep}
                hiderBackButton={currentStepIndex === 0}
            />
        </div>
    )
}