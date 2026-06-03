import { ArrowLeft, ArrowRight, type LucideIcon } from "lucide-react";
import { Input, type InputProps } from "../../../../components/Shared/Input";
import { Button } from "../../../../components/Shared/Button";

interface FormStepProps {
    icon: LucideIcon;
    title: string;
    question: string;
    inputProps: InputProps;
    submitButtonProps?: {
        label?: string;
        emojiIcon?: string;


    }

}

export default function FormStep({ icon: Icon, title, question, inputProps, submitButtonProps }: FormStepProps) {

    return (
        <div className="bg-card rounded-2xl p-6 shadow-[4px_4px_18px_0px_rbga(0,0,0,0.2)] sm:p-8">
            <div className="bg-primary mb-4 flex h-15 w-15 items-center justify-center rounded-xl">
                <Icon size={32} className="text-primary-foreground" />
            </div>
            <h2 className="mb-1 text-xl font-semibold text-primary uppercase tracking-widest">
                {title}

            </h2>
            <h2 className="text-foreground mb-6 text-xl leading-snug font-semibold sm:text-2xl">
                {question}
            </h2>
            <form className=" flex flex-col gap-6">
                <Input {...inputProps} />
                <div className="flex flex-col gap-3 sm:flex-row sm:gap-6">

                    <Button
                        type="button"
                        variant="ghost"
                        icon={ArrowLeft}
                        className="order-2 flex-1 justify-center rounded-xl py-3 sm:order-1">
                        Voltar</Button>

                    <Button
                        type="submit"
                        variant="primary"
                        className="order-1 flex-1 sm:order-2"
                        icon={!submitButtonProps ? ArrowRight : undefined}
                    >
                        {submitButtonProps?.label ?? "Próximo"}
                        {submitButtonProps?.emojiIcon}

                    </Button>
                </div>
            </form>


        </div>
    )
}