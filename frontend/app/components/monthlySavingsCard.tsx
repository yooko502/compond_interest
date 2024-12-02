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

const WithdrawalFormSchema = z.object({
    target_amount: z.string().min(0),
    reserve_periods: z.string().min(0),
    year_return: z.string().min(0)
})

export default function MonthlySavingsCard() {
    const form = useForm<z.infer<typeof WithdrawalFormSchema>>({
        resolver: zodResolver(WithdrawalFormSchema),
        defaultValues: {
            target_amount: "1000",
            reserve_periods: "10",
            year_return: "10"
        },
      })
    const onSubmit = (values: z.infer<typeof WithdrawalFormSchema>) => {
        console.log(values)
    }

    return (
        <Card className="p-6 bg-primary-50">
            <CardHeader>
                <CardTitle>毎月積立額</CardTitle>
                <CardDescription>
                目標額を達成するための毎月積立額を計算する
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
                        <FormField
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
                        />
                        <FormField
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
                        />
                        <Button type="submit">計算する</Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
};
