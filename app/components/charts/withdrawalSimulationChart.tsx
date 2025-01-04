"use client"

import { withdrawalSimulationChartProps, withdrawalSimulationMonthlyType } from "@/app/utils/types"
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@/components/ui/card"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BadgeInfo } from "lucide-react"
import { useTranslation } from "react-i18next"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"

export const WithdrawalSimulationChart = (props: withdrawalSimulationChartProps) => {
    const chartData: withdrawalSimulationMonthlyType[] = props.monthly_data
    // const [firstDate, setFirstDate] = useState<number>()
    // const [lastDate, setLastDate] = useState<number>()
    const { t } = useTranslation('common')
    const investTitle: { [key: string]: string } = {
        "how_many_years": `${(props.invest_years as number[])[0]}${t("tags_detail.years")} ${(props.invest_years as number[])[1]}${t("chart.monthly")}`,
        "withdrawable_amount": `${props.monthly_withdrawal.toFixed(0)}${t("tags_detail.monney")}`,
        "initial_amount": `${props.initial_balance.toFixed(0)}${t("tags_detail.monney")}`,
    }
    const noInvestTitle: {[key: string]: string} = {
        "how_many_years": `${(props.no_invest as number[])[0]}${t("tags_detail.years")} ${(props.no_invest as number[])[1]}${t("chart.monthly")}`,
        "withdrawable_amount": `${Array.isArray(props.no_invest) ? "" : (props.no_invest as number).toFixed(0)}${t("tags_detail.monney")}`,
        "initial_amount": `${Array.isArray(props.no_invest) ? "" : (props.no_invest as number).toFixed(0)}${t("tags_detail.monney")}`,
      }

    const chartConfig = {
        Balance: {
            label: t('chart.all_amount'),
            color: "hsl(var(--chart-2))",
        },
    } satisfies ChartConfig



    return (
        <Card>
            <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
                 <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
                    {/* <CardTitle>{t('chart.principal_increased')}</CardTitle> */}
                    <CardDescription>
                        {/* {moment(firstDate).format("YYYY-MM")} —— {moment(lastDate).format("YYYY-MM")} */}
                    </CardDescription>
                </div>
                <div className="flex">
                    <button
                        className="relative z-30 inline-flex flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                    >
                        <span className="text-xs text-muted-foreground">
                            {t('chart.invest')}
                        </span>
                        <span className="text-lg font-bold leading-none sm:text-3xl">
                        {
                                props.type ? (
                                    <>
                                    {investTitle[props.type]}
                                    </>
                                ) : null
                            }
                        </span>
                    </button>
                    <button
                        className="relative z-30 inline-flex flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                    >
                        <span className="text-xs text-muted-foreground">
                            {t('chart.no_invest')}
                        </span>
                        <span className="text-lg font-bold leading-none sm:text-3xl">
                            {
                                props.type ? (
                                    <>
                                    {noInvestTitle[props.type]}
                                    </>
                                ) : null
                            }
                           
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
                            dataKey="Month"
                            tickLine={false}
                            axisLine={true}
                            tickMargin={8}
                            minTickGap={64}
                            tickFormatter={(value) => {
                                return `${value}ヶ月`
                            }}
                        />
                        <ChartTooltip cursor={false} content={
                            ({ active, payload, label}) => {
                                return (
                                    <ChartTooltipContent
                                        active={active}
                                        payload={payload}
                                        label={`${label}${t("chart.unit_monthly")}`}
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
                        <Area type="natural" dataKey="Balance" stroke="var(--color-Balance)" fillOpacity={1} fill="url(#colorBalance)" />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
            <CardFooter>
                <div className="flex w-full items-start gap-2 text-sm">
                    <div className="grid gap-2">
                        <div className="flex items-center gap-2 font-medium leading-none">
                            {t('chart.service_notice')} <BadgeInfo className="h-4 w-4" />
                        </div>
                        <div className="flex items-center gap-2 leading-none text-muted-foreground">
                            {t('chart.calculated_figures_notice')}
                        </div>
                    </div>
                </div>
            </CardFooter>
        </Card>
    )
}