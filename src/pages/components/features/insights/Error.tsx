import { RefreshCcw } from "lucide-react"
import { Button } from "../../../../components/Shared/Button"
import { TriangleAlert } from "lucide-react"

interface ErrorProps {
    simulationId: string;
    message: string;
    onRetry: () => void
}
export function Error({ simulationId, message, onRetry }: ErrorProps) {
    if (!simulationId || !message) {
        return null
    }


    return (
        <div className="flex h-full flex-col items-center justify-center gap-3 p-6">
            <p className="flex items-center gap-1 text-sm text-red-500"><TriangleAlert size={24} />{message}</p>
            <Button
                variant="primary"
                className="px-6"
                icon={RefreshCcw}
                onClick={onRetry}>Tentar novamente</Button>
        </div>
    )
}