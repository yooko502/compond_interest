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
import { useState } from "react"
import { finalBalanceType, fixedInvestmentFormType } from "../hooks/types"

const fixedInvestmentFormSchema = z.object({
  initial_investment: z.string().min(0),
  monthly_reserve: z.string().min(0),
  reserve_periods: z.string().min(0),
  year_return: z.string().min(0),
  increment: z.string().min(0),
  incre_period: z.string().min(0),
})

export default function FixedInvestmentCard() {
  const form = useForm<z.infer<typeof fixedInvestmentFormSchema>>({
    resolver: zodResolver(fixedInvestmentFormSchema),
    defaultValues: {
      initial_investment: "100",
      monthly_reserve: "10",
      reserve_periods: "10",
      year_return: "3",
      increment: "0",
      incre_period: "0"
    },
  })

  const [formData, setformData] = useState<fixedInvestmentFormType>(form.getValues())
  const final_balance = useFinalBalanceData(formData || null) as finalBalanceType;
  
  const onSubmit = (values: z.infer<typeof fixedInvestmentFormSchema>) => {
    setformData(values)
  }
  
  console.log(final_balance)
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
                      <Input placeholder="100" {...field} />
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
                      <Input placeholder="10" {...field} />
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
                      <Input placeholder="10" {...field} />
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
                      <Input placeholder="3" {...field} />
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
                      <Input placeholder="0" {...field} />
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
                      <Input placeholder="0" {...field} />
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
      </CardContent>
    </Card>
  )
}
