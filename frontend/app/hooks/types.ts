export type fixedInvestmentFormType = {
    initial_investment: string,
    monthly_reserve: string,
    reserve_periods: string,
    year_return: string,
    increment: string,
    incre_period: string,
}

export type finalBalancePromiseType = {
    result: finalBalanceResultType
}

export type finalBalanceResultType = {
    final_balance: number,
    monthly_data: finalBalanceChartType[],
    total_principal: number,
    total_return: number
}

export type finalBalanceChartType = {
    Date: number,
    Principal: number,
    Return: number,
    Balance: number
}

export type FixedInvestmentChartParams = {
    finalBalanceChartData: finalBalanceChartType[]
    totalPrincipal: number,
    finalBalance: number
}