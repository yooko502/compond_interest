import { useEffect, useState } from "react";
import { apiBaseUrl } from "./constant"
import { fixedInvestmentFormType, finalBalanceResultType, finalBalanceChartType } from "./types";

export const useFinalBalanceData = (data: fixedInvestmentFormType | null) => {
    const [finalBalance, setFinalBalance] = useState<finalBalanceResultType| null>(null);
    const [showTable, setShowTable] = useState<boolean>(false);
    useEffect(() => {
        if (data === null) return
        const fetchData = async () => {
            const response = await fetch(`${apiBaseUrl}/final_balance`,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
                })
                if (! response.ok) {
                    setFinalBalance(null)
                    setShowTable(false)
                }
                
                const res = await response.json();
                
                const result = res.result
                const chartData:finalBalanceChartType[]  = result.monthly_data

                setFinalBalance({...result, monthly_data: chartData})
                setShowTable(true)
        }
        fetchData()
    }, [data])
    return {finalBalance, showTable}
}