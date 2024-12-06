export type fixedInvestmentFormType = {
    initial_investment: number,
    monthly_reserve: number,
    reserve_periods: number,
    year_return: number,
    increment: number,
    incre_period: number,
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

export type PresentCommonResultType = {
    chart_data: finalBalanceChartType[],
    back_to_present: number
}