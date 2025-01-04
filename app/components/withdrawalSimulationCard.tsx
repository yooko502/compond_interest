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
import { useTranslation } from "react-i18next"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useEffect, useState } from "react"
import { useWithdrawalSimulation } from "../hooks/useWithdrawalSimulation"
import { withDrawalSimulationFormType } from "../utils/types"
import { WithdrawalSimulationChart } from "./charts/withdrawalSimulationChart"
import { CheckScreenWidthAlert } from "./screenWidthAlert"


const WithdrawalFormSchema = z.object({
    annual_return: z.coerce.number().positive(),
    initial_balance: z.coerce.number().positive().optional(),
    monthly_withdrawal: z.coerce.number().positive().optional(),
    years: z.coerce.number().positive().optional()
})

export default function WithdrawalSimulationCard() {
    const { t } = useTranslation("common")

    const [type, setType] = useState<string>("how_many_years")
    const [open, setOpen] = useState<boolean>(false)
    const [shouldListen, setShouldListen] = useState(false)

    const [plateTypeShow, setPlateTypeShow] = useState({
        years: false,
        monthly_withdrawal: true,
        annual_return: true,
        initial_balance: true
    })

    const form = useForm<z.infer<typeof WithdrawalFormSchema>>({
        resolver: zodResolver(WithdrawalFormSchema),
        defaultValues: {
            annual_return: 10,
            initial_balance: 1000,
            monthly_withdrawal: 10,
            years: 10
        },
    })
    const [formData, setformData] = useState<withDrawalSimulationFormType | null>(null)
    const onSubmit = (values: z.infer<typeof WithdrawalFormSchema>) => {
        if (window.screen.orientation.type === 'landscape-primary' || 
            window.screen.orientation.angle === 90 ||
            window.screen.orientation.angle === -90
        ) {
          setOpen(false);
          setShouldListen(false);
        } else {
            setOpen(true);
            setShouldListen(true);
            return
        }
        switch (type) {
            case "how_many_years":
                delete values.years
                break;
            case "withdrawable_amount":
                delete values.monthly_withdrawal
                break;
            case "initial_amount":
                delete values.initial_balance
                break;
            default:
                break
        }
        const newValues = { ...values, annual_return: values.annual_return / 100 }
        setformData(newValues)
        console.log(newValues)

    }

    useEffect(() => {
        const checkScreenWidth = () => {
          return window.screen.orientation.type === 'landscape-primary' ||
           window.screen.orientation.angle === 90 || 
           window.screen.orientation.angle === -90
        };
      
        if (shouldListen) {
          // 初始检测
          checkScreenWidth();
          // 添加监听器
          window.addEventListener('resize', checkScreenWidth);
          window.addEventListener('orientationchange', checkScreenWidth);
      
          return () => {
            // 清理监听器
            window.removeEventListener('resize', checkScreenWidth);
            window.removeEventListener('orientationchange', checkScreenWidth);
          };
        }
      }, [shouldListen])

    const { chartData, showChart, setShowChart } = useWithdrawalSimulation(formData, type)

    useEffect(() => {
        switch (type) {
            case "how_many_years":
                setPlateTypeShow({
                    years: false,
                    monthly_withdrawal: true,
                    annual_return: true,
                    initial_balance: true
                })
                break;
            case "withdrawable_amount":
                setPlateTypeShow({
                    years: true,
                    monthly_withdrawal: false,
                    annual_return: true,
                    initial_balance: true
                })
                break;
            case "initial_amount":
                setPlateTypeShow({
                    years: true,
                    monthly_withdrawal: true,
                    annual_return: true,
                    initial_balance: false
                })
                break;
            default:
                break
        }
    }, [type])

    return (
        <>
            <Card className="p-6 bg-primary-50">
                <CardHeader>
                    <CardTitle>{t("tags_detail.withdrawal_simulation")}</CardTitle>
                    <CardDescription>
                        {t("tags_detail.withdrawal_simulation_detail")}
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Label >{t("tags_detail.withdrawal_simulation_method_title")}</Label>
                    <RadioGroup
                        defaultValue="how_many_years"
                        onValueChange={(value) => { setType(value); setShowChart(false) }}
                        className="mb-36"
                    >
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="how_many_years" id="r1" />
                            <Label htmlFor="r1">{t("tags_detail.how_many_years")}</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="withdrawable_amount" id="r2" />
                            <Label htmlFor="r2">{t("tags_detail.withdrawable_amount")}</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="initial_amount" id="r3" />
                            <Label htmlFor="r3">{t("tags_detail.initial_amount")}</Label>
                        </div>
                    </RadioGroup>
                    <Separator />
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            {plateTypeShow.initial_balance ? <FormField
                                control={form.control}
                                name="initial_balance"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t("tags_detail.initial_balance")}</FormLabel>
                                        <div className="flex w-full max-w-5xl mx-auto items-center space-x-2">
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <Label>{t("tags_detail.monney")}</Label>
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            /> : null}
                            {plateTypeShow.monthly_withdrawal ? <FormField
                                control={form.control}
                                name="monthly_withdrawal"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t("tags_detail.monthly_withdrawal")}</FormLabel>
                                        <div className="flex w-full max-w-5xl mx-auto items-center space-x-2">
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <Label>{t("tags_detail.monney")}</Label>
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            /> : null}
                            {plateTypeShow.years ? <FormField
                                control={form.control}
                                name="years"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t("tags_detail.withdrawal_years")}</FormLabel>
                                        <div className="flex w-full max-w-5xl mx-auto items-center space-x-2">
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <Label>{t("tags_detail.years")}</Label>
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            /> : null}
                            {plateTypeShow.annual_return ? <FormField
                                control={form.control}
                                name="annual_return"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t("tags_detail.expected_return")}</FormLabel>
                                        <div className="flex w-full max-w-5xl mx-auto items-center space-x-2">
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <Label>{t("tags_detail.percent")}</Label>
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            /> : null}
                            <Button type="submit" className="bg-primary-950">{t("button.calculate")}</Button>
                        </form>
                    </Form>
                    {
                        showChart ?
                            <div className="p-5">
                                <WithdrawalSimulationChart
                                    monthly_data={chartData?.monthly_data || []}
                                    initial_balance={chartData?.initial_balance || 0}
                                    invest_years={chartData?.invest_years || 0}
                                    type={type}
                                    monthly_withdrawal={chartData?.monthly_withdrawal || 0}
                                    no_invest={chartData?.no_invest || 0}
                                />
                            </div> : null
                    }
                </CardContent>
            </Card>
            <CheckScreenWidthAlert open={open} setOpen={setOpen} />
        </>
    )
};
