import PiggyBank from "../../../../assets/images/piggy-bank.png"



export default function SimulationHero() {
    return (
        <div className="mb-8 text-center">
            <div className="flex flex-col items-center sm: flex-row">
                <h1 className="text-foreground text-3xl font-semibold sm:text-4xl">
                    Vamos planeja seu futuro
                </h1>

                <img src={PiggyBank}
                    aria-hidden="true"
                    alt="Piggy Bank"
                    className="h-16 w-16 sm:-mt-2 sm: -ml-3"
                />
            </div>
            <p className="text-muted-foreground text-sm">
                Responda algumas qustões para ter insights financeiros personalizados</p>
        </div>
    )
}