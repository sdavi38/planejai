interface Props {
    className?: string
    orientation?: 'horizontal' | 'vertical'
    spacing?: number
}

export default function Divider({
    className, orientation = 'horizontal', spacing = 16 }: Props) {
    const style = orientation === 'horizontal' ?
        { marginTop: spacing, marginBottom: spacing } :
        { marginLeft: spacing, marginRight: spacing }

    const classNameOrientation = {
        horizontal: 'h-px w-full',
        vertical: 'self-stretch w-px'
    }
    return (
        <div
            role="separator"
            aria-orientation={orientation}
            aria-label="Divisor"
            style={style}
            className={['bg-border', classNameOrientation[orientation], className]
                .filter(Boolean)
                .join(' ')}
        />
    )
}