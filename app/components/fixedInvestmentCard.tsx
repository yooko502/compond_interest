"use client"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
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
import { useFinalBalanceData } from "../hooks/useFixedInvestment"
import { useEffect, useState } from "react"
import { finalBalanceResultType, fixedInvestmentFormType } from "../utils/types"
import { CommonChart } from "./charts/commonChart"
import { CheckScreenWidthAlert } from "./screenWidthAlert"
import { useTranslation } from "react-i18next"

const fixedInvestmentFormSchema = z.object({
  initial_investment: z.coerce.number().nonnegative(),
  monthly_reserve: z.coerce.number().positive(),
  reserve_periods: z.coerce.number().positive(),
  year_return: z.coerce.number().positive(),
  increment: z.coerce.number().nonnegative(),
  incre_period: z.coerce.number().nonnegative(),
})

export default function FixedInvestmentCard() {
  const { t } = useTranslation('common')
  const form = useForm<z.infer<typeof fixedInvestmentFormSchema>>({
    resolver: zodResolver(fixedInvestmentFormSchema),
    defaultValues: {
      initial_investment: 100,
      monthly_reserve: 10,
      reserve_periods: 10,
      year_return: 3,
      increment: 0,
      incre_period: 0
    },
  })

  const [formData, setformData] = useState<fixedInvestmentFormType | null>(null)
  const {finalBalance, showTable} = useFinalBalanceData(formData)
  const [finalBalanceData, setFinalBalanceData] = useState<finalBalanceResultType | null>()
  const [open, setOpen] = useState<boolean>(false)
  const [shouldListen, setShouldListen] = useState(false);

  const onSubmit = (values: z.infer<typeof fixedInvestmentFormSchema>) => {
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
    setformData(values)
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
  }, [shouldListen]);
  
  useEffect(() => {
    setFinalBalanceData(finalBalance)
  },[finalBalance])

  return (
    <>
    <Card className="p-6 bg-primary-50">
      <CardHeader>
        <CardTitle>{t('tags_detail.cost_in_the_future')}</CardTitle>
        <CardDescription>
          {t('tags_detail.cost_in_the_future_detail')}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="initial_investment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('tags_detail.initial_investment_amount')}</FormLabel>
                  <div className="flex w-full max-w-5xl mx-auto items-center space-x-2">
                    <FormControl>
                      <Input type="number" placeholder="100" {...field} />
                    </FormControl>
                    <Label>{t("tags_detail.monney")}</Label>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="monthly_reserve"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("tags_detail.monthly_savings_amount")}</FormLabel>
                  <div className="flex w-full max-w-5xl mx-auto items-center space-x-2">
                    <FormControl>
                      <Input type="number" placeholder="10" {...field} />
                    </FormControl>
                    <Label>{t("tags_detail.monney")}</Label>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="reserve_periods"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("tags_detail.accumulation_period")}</FormLabel>
                  <div className="flex w-full max-w-5xl mx-auto items-center space-x-2">
                    <FormControl>
                      <Input type="number" placeholder="10" {...field} />
                    </FormControl>
                    <Label>{t("tags_detail.years")}</Label>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="year_return"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("tags_detail.expected_return")}</FormLabel>
                  <div className="flex w-full max-w-5xl mx-auto items-center space-x-2">
                    <FormControl>
                      <Input type="number" placeholder="3" {...field} />
                    </FormControl>
                    <Label>{t("tags_detail.percent")}</Label>
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
                  <FormLabel>{t("tags_detail.annual_savings_increase")}</FormLabel>
                  <div className="flex w-full max-w-5xl mx-auto items-center space-x-2">
                    <FormControl>
                      <Input type="number" placeholder="0" {...field} />
                    </FormControl>
                    <Label>{t("tags_detail.monney")}</Label>
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
                  <FormLabel>{t("tags_detail.number_increase")}</FormLabel>
                  <div className="flex w-full max-w-5xl mx-auto items-center space-x-2">
                    <FormControl>
                      <Input type="number" placeholder="0" {...field} />
                    </FormControl>
                    <Label>{t("tags_detail.years")}</Label>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="bg-primary-950">{t("button.calculate")}</Button>
          </form>
        </Form>
        {
            showTable ? 
            <div className="p-5">
              <CommonChart
                finalBalanceChartData={finalBalanceData?.monthly_data || []}
                totalPrincipal={finalBalanceData?.total_principal || 0}
                finalBalance={finalBalanceData?.final_balance || 0}
              />
            </div> : null
        }
      </CardContent>
    </Card>
    <CheckScreenWidthAlert open={open} setOpen={setOpen}/>
    </>
  )
}
