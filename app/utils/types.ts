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
    finalBalance: number,
    type?: string,
    backToPresent?: number
}

export type PresentCommonResultType = {
    chart_data: finalBalanceResultType,
    back_to_present: number
}

export type PresentCommonFormType = {
    initial_investment: number,
    monthly_reserve: number,
    reserve_periods: number,
    year_return: number,
    increment: number,
    incre_period: number,
    target_amount: number
}

export type screenWidthAlertProps = {
    open: boolean,
    setOpen: (open: boolean)=>void
}

export type withDrawalSimulationFormType = {
    annual_return: number,
    initial_balance?: number,
    monthly_withdrawal?: number,
    years?: number
}

export type withdrawalSimulationChartProps = {
    initial_balance: number,
    invest_years: number | number[],
    monthly_data: withdrawalSimulationMonthlyType[],
    monthly_withdrawal: number,
    no_invest: number | number[],
    type?: string
}

export type withdrawalSimulationMonthlyType = {
    Balance: number,
    Month: number
}