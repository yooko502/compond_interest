import { useEffect, useState } from "react"
import { withdrawalSimulationChartProps, withDrawalSimulationFormType } from "../utils/types"
import { apiBaseUrl } from "../utils/constant"

export const useWithdrawalSimulation = (formData: withDrawalSimulationFormType| null, type: string) => {
    const [showChart, setShowChart] = useState<boolean>(false)
    const [chartData, setChartData] = useState<withdrawalSimulationChartProps | null>(null)

    useEffect(() => {
        if (formData === null) return
        const fetchData = async () => {
            const apiUrl = `${apiBaseUrl}/withdrawal_data?target=${type}`
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData)
            })
            if (!response.ok) return
            const data = await response.json()
            setChartData(data)
            setShowChart(true)
        }
        fetchData()
    }, [formData])

    return {chartData, showChart, setShowChart}
}