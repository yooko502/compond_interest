import { useEffect, useState } from "react";
import { apiBaseUrl } from "./constant"
import { fixedInvestmentFormType, finalBalanceType } from "./types";

export const useFinalBalanceData = (data: fixedInvestmentFormType) => {
    const [finalBalance, setFinalBalance] = useState<finalBalanceType| null>(null);
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`${apiBaseUrl}/final_balance`,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
                })
                if (! response.ok) {
                    setFinalBalance({"final_balance" : "11111"})
                }
                console.log(response.json())
                const result = await response.json();
                setFinalBalance(result)
        }
        fetchData()
    }, [data, finalBalance])
    return finalBalance
}