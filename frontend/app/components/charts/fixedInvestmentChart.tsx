"use client"

import { BadgeInfo } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import moment from 'moment'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import { finalBalanceChartType, FixedInvestmentChartParams } from "../../utils/types"
import { useMemo, useState } from "react"


const chartConfig = {
    Balance: {
        label: "予想資産額",
        color: "hsl(var(--chart-2))",
    },
    Principal: {
        label: "投資元本",
        color: "hsl(var(--chart-1))",
    },
} satisfies ChartConfig

export function FixedInvestmentChart(props:FixedInvestmentChartParams) {
    const chartData: finalBalanceChartType[] = props.finalBalanceChartData
    const [firstDate, setFirstDate] = useState<number>()
    const [lastDate, setLastDate] = useState<number>()

    useMemo(()=>{
        if (chartData === undefined) return
        if (chartData.length === 0) return 
        setFirstDate(chartData[0].Date)
        setLastDate(chartData[chartData.length - 1].Date)
    },[chartData])

    console.log(lastDate)

    return (
        <Card>
            <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
                <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
                    <CardTitle>積立元本 + 増えた額</CardTitle>
                    <CardDescription>
                        {moment(firstDate).format("YYYY-MM")} —— {moment(lastDate).format("YYYY-MM")}
                    </CardDescription>
                </div>
                <div className="flex">
                    <button
                        className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                    >
                        <span className="text-xs text-muted-foreground">
                            投資元本
                        </span>
                        <span className="text-lg font-bold leading-none sm:text-3xl">
                            {props.totalPrincipal}
                        </span>
                    </button>
                    <button
                        className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                    >
                        <span className="text-xs text-muted-foreground">
                            予想資産額
                        </span>
                        <span className="text-lg font-bold leading-none sm:text-3xl">
                            {props.finalBalance}
                        </span>
                    </button>
                </div>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <AreaChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="Date"
                            tickLine={false}
                            axisLine={true}
                            tickMargin={8}
                            minTickGap={64}
                            tickFormatter={(value) => {
                                return moment(value).format("YYYY-MM")
                            }}
                        />
                        <ChartTooltip cursor={false} content={
                            ({ active, payload, label }) => {
                                return (
                                    <ChartTooltipContent
                                        active={active}
                                        payload={payload}
                                        label={moment(label).format("YYYY-MM-DD")}
                                        indicator="dot"
                                    />
                                )
                            }} 
                        />
                        <YAxis />
                        <defs>
                            <linearGradient id="colorPrincipal" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="var(--color-Principal)" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="var(--color-Principal)" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="var(--color-Balance)" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="var(--color-Balance)" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <Area type="natural" dataKey="Principal" stroke="var(--color-Principal)" fillOpacity={1} fill="url(#colorPrincipal)" />
                        <Area type="natural" dataKey="Balance" stroke="var(--color-Balance)" fillOpacity={0.3} fill="url(#colorBalance)" />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
            <CardFooter>
                <div className="flex w-full items-start gap-2 text-sm">
                    <div className="grid gap-2">
                        <div className="flex items-center gap-2 font-medium leading-none">
                            ご利用にあたっての留意事項 <BadgeInfo className="h-4 w-4"/>
                        </div>
                        <div className="flex items-center gap-2 leading-none text-muted-foreground">
                            計算された数値は、あくまでもシミュレーションであり、将来の市場環境の変動や運用成果等を示唆および保証するものではありません。また、税金、手数料、費用等を考慮しておりません。
                        </div>
                    </div>
                </div>
            </CardFooter>
        </Card>
    )
}
