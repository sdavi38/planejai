import type { ButtonHTMLAttributes } from "react"
import type { LucideIcon } from "lucide-react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'danger' | 'ghost'
    icon?: LucideIcon
    type?: "button" | "submit" | "reset"

}
const baseClasses = 'flex cursor-pointer items-center justify-center text-sm px-4 py-3 font-mediun gap-2 transition-opacity hover:opacity-80 disabled:opacity-80 disabled:cursor-not-allowed'
const vatiantClass = {
    primary: 'bg-primary text-primary-foregroun font-semibold rounded-xl',
    secondary: 'bg-secondary-button border border-border rounded-3xl',
    ghost: 'text-foreground rounded-lg',
    danger: 'bg-destructive  text-red-600 hover:text-red-900/90 font-semibold ',
}

export function Button({
    variant = 'primary',
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