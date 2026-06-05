import type { SimulationFormData } from "../data/simulation";
import { paserCurrency } from "./currency";


export function simulateFinancialCalculation(data: SimulationFormData) {
    return (
        paserCurrency(data.income) -
        paserCurrency(data.expenses) -
        paserCurrency(data.debts)

    )

}