import type { BaseHTMLAttributes } from "react"
import type { LucideIcon } from "lucide-react"

interface ButtonProps extends BaseHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'danger' | 'ghost'
    icon?: LucideIcon
    type?: "button" | "submit" | "reset"

}
const baseClasses = 'flex cursor-pointer items-center justify-center text-sm px-4 py-3 font-mediun gap-2 transition-opacity hover:opacity-80 disabled:opacity-80 disabled:cursor-not-allowed'
const vatiantClass = {
    primary: 'bg-primary text-primary-foregroun font-semibold rounded-xl',
    secondary: 'bg-secondary-button border border-border rounded-3xl',

    ghost: 'text-foreground rounded-lg',
}

export function Button({

    variant,
    icon: Icon,
    type,
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