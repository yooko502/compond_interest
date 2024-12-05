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
import { finalBalanceResultType, fixedInvestmentFormType } from "../hooks/types"
import { FixedInvestmentChart } from "./charts/fixedInvestmentChart"

const fixedInvestmentFormSchema = z.object({
  initial_investment: z.number().positive(),
  monthly_reserve: z.number().positive(),
  reserve_periods: z.number().positive(),
  year_return: z.number().positive(),
  increment: z.number().nonnegative(),
  incre_period: z.number().nonnegative(),
})

export default function FixedInvestmentCard() {
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

  const onSubmit = (values: z.infer<typeof fixedInvestmentFormSchema>) => {
    setformData(values)
  }
 
  useEffect(() => {
    setFinalBalanceData(finalBalance)
  },[finalBalance])

  return (
    <Card className="p-6 bg-primary-50">
      <CardHeader>
        <CardTitle>将来いくらになるかを知りたい</CardTitle>
        <CardDescription>
          つみたて投資すると将来いくらになる？
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
                  <FormLabel>初期投資額</FormLabel>
                  <div className="flex w-full max-w-5xl mx-auto items-center space-x-2">
                    <FormControl>
                      <Input type="number" placeholder="100" {...field} />
                    </FormControl>
                    <Label>万円</Label>
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
                  <FormLabel>毎月の積立額</FormLabel>
                  <div className="flex w-full max-w-5xl mx-auto items-center space-x-2">
                    <FormControl>
                      <Input type="number" placeholder="10" {...field} />
                    </FormControl>
                    <Label>万円</Label>
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
                  <FormLabel>積立期間</FormLabel>
                  <div className="flex w-full max-w-5xl mx-auto items-center space-x-2">
                    <FormControl>
                      <Input type="number" placeholder="10" {...field} />
                    </FormControl>
                    <Label>年</Label>
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
                  <FormLabel>想定リターン（年率）</FormLabel>
                  <div className="flex w-full max-w-5xl mx-auto items-center space-x-2">
                    <FormControl>
                      <Input type="number" placeholder="3" {...field} />
                    </FormControl>
                    <Label>%</Label>
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
                      <Input type="number" placeholder="0" {...field} />
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
                      <Input type="number" placeholder="0" {...field} />
                    </FormControl>
                    <Label>年</Label>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">計算する</Button>
          </form>
        </Form>
        {
            showTable ? 
            <div className="p-5">
              <FixedInvestmentChart
                finalBalanceChartData={finalBalanceData?.monthly_data || []}
                totalPrincipal={finalBalanceData?.total_principal || 0}
                finalBalance={finalBalanceData?.final_balance || 0}
              />
            </div> : null
        }
      </CardContent>
    </Card>
  )
}
