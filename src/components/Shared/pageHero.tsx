

interface PageHeroProps {
    title: string
    subtitle: string
}


export default function PageHero({ title, subtitle }: PageHeroProps) {
    return (
        <>

            <h1 className="text-2xl text-foreground mb-1 font-semibold sm:text-3xl">
                {title}
            </h1>
            <p className="mb-8 tetx-muted-foreground text-md">
                {subtitle}
            </p>

        </>
    )
}