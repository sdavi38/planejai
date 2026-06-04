import { ArrowLeft, ArrowRight, type LucideIcon } from "lucide-react";
import { Input, type InputProps } from "../../../../components/Shared/Input";
import { Button } from "../../../../components/Shared/Button";
import type { SyntheticEvent } from "react";
import { useState } from "react";
import { formatCurrencyMask } from "../../../../utils/currency";

export interface FormStepProps {
    id: string
    icon: LucideIcon;
    title: string;
    question: string;
    inputProps: InputProps;
    submitButtonProps?: {
        label?: string;
        emojiIcon?: string;


    }

}

interface ActionButtonsProps {
    onBack: () => void
    onNext: (value: string) => void
    hiderBackButton?: boolean
}

export default function FormStep({ icon: Icon, title, question, inputProps, submitButtonProps, onBack, onNext, hiderBackButton }: FormStepProps & ActionButtonsProps) {

    const [inputValue, setInputValue] = useState("")

    const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!inputValue) return
        onNext(inputValue)
    }


    return (
        <div className="bg-card rounded-2xl p-6 shadow-[4px_4px_18px_0px_rgba(0,0,0,0.2)] sm:p-8">
            <div className="bg-primary mb-4 flex h-15 w-15 items-center justify-center rounded-xl">
                <Icon size={32} className="text-primary-foreground" />
            </div>
            <h2 className="mb-1 text-xl font-semibold text-primary uppercase tracking-widest">
                {title}

            </h2>
            <h2 className="text-foreground mb-6 text-xl leading-snug font-semibold sm:text-2xl">
                {question}
            </h2>
            <form
                onSubmit={handleSubmit}
                className=" flex flex-col gap-6">
                <Input

                    {...inputProps} value={inputValue}
                    onChange={(e) =>
                        setInputValue(
                            inputProps.prefix === 'R$' ?
                                formatCurrencyMask(e.target.value) : e.target.value)} />
                <div className="flex flex-col gap-3 sm:flex-row sm:gap-6">
                    {!hiderBackButton && (
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={onBack}
                            icon={ArrowLeft}
                            className="order-2 flex-1 justify-center rounded-xl  py-3 sm:order-1">
                            Voltar</Button>
                    )}

                    <Button
                        type="submit"

                        variant="primary"
                        className="order-1 flex-1 sm:order-2"
                        icon={!submitButtonProps ? ArrowRight : undefined}
                        disabled={!inputValue}
                    >
                        {submitButtonProps?.label ?? "Próximo"}
                        {submitButtonProps?.emojiIcon}

                    </Button>
                </div>
            </form>


        </div>
    )
}