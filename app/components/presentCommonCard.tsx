"use client"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import { z } from "zod";
import { useForm } from "react-hook-form"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Label } from "@/components/ui/label"
import { apiBaseUrl, presentCommonDescription, presentCommonTitle } from "../utils/constant"
import { PresentCommonResultType } from "../utils/types"
import { useEffect, useState } from "react"
import { CommonChart } from "./charts/commonChart"
import { CheckScreenWidthAlert } from "./screenWidthAlert"

const presentCommonFormSchema = z.object({
    target_amount: z.coerce.number().positive(),// 目标金额
    monthly_reserve: z.coerce.number().nonnegative(), // 毎月の積立額
    reserve_periods: z.coerce.number().nonnegative(), // 積立期間
    year_return: z.coerce.number().nonnegative(), // 想定リターン（年率）
    initial_investment: z.coerce.number().nonnegative(), // 默认参数 初期投資額
    increment: z.coerce.number().nonnegative(), // 暂不开放 年間積立増額
    incre_period: z.coerce.number().nonnegative(), // 暂不开放 増額年数
})


export default function PresentCommonCard({ type }: { type: string }) {
    console.log("type", type)
    const form = useForm<z.infer<typeof presentCommonFormSchema>>({
        resolver: zodResolver(presentCommonFormSchema),
        defaultValues: {
            target_amount: 1000,
            monthly_reserve: 0,
            reserve_periods: 1,
            year_return: 0,
            //
            initial_investment: 0,
            incre_period: 0,
            increment: 0
        },
    })
    const [presentCommonData, setPresentCommonData] = useState<PresentCommonResultType>()
    const [defaultColumnShow, setDefaultColumnShow] = useState<boolean>(false)
    const [showChart, setShowChart] = useState<boolean>(false)
    const [formValus, setFormValus] = useState<z.infer<typeof presentCommonFormSchema> | null>(null)

    const [plateTypeShow, setPlateTypeShow] = useState({
        "year_return": false,
        "reserve_periods": false,
        "monthly_reserve": false
    })

    useEffect(() => {
        switch (type) {
            case "rate":
                setPlateTypeShow({
                    "year_return": false,
                    "reserve_periods": true,
                    "monthly_reserve": true,
                })
                break;
            case "amount":
                setPlateTypeShow({
                    "year_return": true,
                    "reserve_periods": true,
                    "monthly_reserve": false,
                })
                break;
            case "horizon":
                setPlateTypeShow({
                    "year_return": true,
                    "reserve_periods": false,
                    "monthly_reserve": true,
                })
                break;
            default:
                setPlateTypeShow({
                    "year_return": false,
                    "reserve_periods": false,
                    "monthly_reserve": false
                })
                setDefaultColumnShow(false)
        }
    }, [type])

    console.log("plateshow", plateTypeShow)
    const [open, setOpen] = useState<boolean>(false)

    const onSubmit = async (values: z.infer<typeof presentCommonFormSchema>) => {
        if (window.screen.width < 768) {
            setOpen(true)
            return
        }
        setFormValus(values)
    }

    useEffect(() => {
        if (formValus) {
            const fetchData = async () => {
                const response = await fetch(`${apiBaseUrl}/present_data?target=${type}`, {
                    "method": "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(formValus)
                })
                if (!response.ok) return
                const res = await response.json()
                console.log("res", res)

                setPresentCommonData(res)
                setShowChart(true)
            }
            fetchData()
        }
    }, [formValus])

    console.log("presentCommonData", presentCommonData)

    return (
        <>
            <Card className="p-6 bg-primary-50">
                <CardHeader>
                    <CardTitle>{presentCommonTitle[type]}</CardTitle>
                    <CardDescription>
                        {presentCommonDescription[type]}
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="target_amount"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>目標額</FormLabel>
                                        <div className="flex w-full max-w-5xl mx-auto items-center space-x-2">
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <Label>万円</Label>
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {plateTypeShow.monthly_reserve ? <FormField
                                control={form.control}
                                name="monthly_reserve"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>毎月の積立額</FormLabel>
                                        <div className="flex w-full max-w-5xl mx-auto items-center space-x-2">
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <Label>万円</Label>
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            /> : null}
                            {plateTypeShow.reserve_periods ? <FormField
                                control={form.control}
                                name="reserve_periods"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>積立期間</FormLabel>
                                        <div className="flex w-full max-w-5xl mx-auto items-center space-x-2">
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <Label>年</Label>
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            /> : null}
                            {plateTypeShow.year_return ? <FormField
                                control={form.control}
                                name="year_return"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>想定リターン（年率）</FormLabel>
                                        <div className="flex w-full max-w-5xl mx-auto items-center space-x-2">
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <Label>%</Label>
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            /> : null}
                            {
                                defaultColumnShow ? (<>
                                    <FormField
                                        control={form.control}
                                        name="initial_investment"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>初期投資額</FormLabel>
                                                <div className="flex w-full max-w-5xl mx-auto items-center space-x-2">
                                                    <FormControl>
                                                        <Input {...field} />
                                                    </FormControl>
                                                    <Label>万円</Label>
                                                </div>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="increment"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>年間積立増額</FormLabel>
                                                <div className="flex w-full max-w-5xl mx-auto items-center space-x-2">
                                                    <FormControl>
                                                        <Input {...field} />
                                                    </FormControl>
                                                    <Label>万円</Label>
                                                </div>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="incre_period"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>増額年数</FormLabel>
                                                <div className="flex w-full max-w-5xl mx-auto items-center space-x-2">
                                                    <FormControl>
                                                        <Input {...field} />
                                                    </FormControl>
                                                    <Label>年</Label>
                                                </div>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </>
                                ) : null
                            }

                            <Button type="submit" className="bg-primary-950">計算する</Button>
                        </form>
                    </Form>
                    {
                        showChart ?
                            <div className="p-5">
                                <CommonChart
                                    finalBalanceChartData={presentCommonData?.chart_data.monthly_data || []}
                                    totalPrincipal={presentCommonData?.chart_data.total_principal || 0}
                                    finalBalance={presentCommonData?.chart_data.final_balance || 0}
                                    type={type}
                                    backToPresent={presentCommonData?.back_to_present || 0}
                                />
                            </div> : null
                    }
                </CardContent>
            </Card>
            <CheckScreenWidthAlert open={open} setOpen={setOpen} />
        </>
    )
};
