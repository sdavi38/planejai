import type { BaseHTMLAttributes } from "react"
import type { LucideIcon } from "lucide-react"

interface ButtonProps extends BaseHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'danger' | 'ghost'
    icon?: LucideIcon

}
const baseClasses = 'flex cursor-pointer items-center justify-center px-4 py-3 font-mediun gap-2 transition-opacity hover:opacity-80 disabled:opacity-80 disabled:cursor-not-allowed'
const vatiantClass = {
    primary: 'bg-primary text-primary-foregroun font-semibold rounded-xl',
    secondary: 'bg-secondary text-secondary-foreground rounded-3xl',

    ghost: 'bg-transparent text-foreground rounded-lg',
}

export function Button({

    variant,
    icon: Icon,
    className,
    children,
    ...props
}: ButtonProps) {
    return (
        <button {...props} className={`${baseClasses} ${vatiantClass[variant]} ${className}`}>
            {Icon && <Icon size={20} />}

            {children}
        </button >
    )
}