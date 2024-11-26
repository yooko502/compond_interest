"use client"
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";


interface fixedInvestmentFormType {
  investmentMethod: string
};
export function FixedInvestmentForm() {
  const form = useForm<fixedInvestmentFormType>()

  function onSubmit(data: fixedInvestmentFormType) {
    const type = data.investmentMethod;
    console.log(type)
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>选择你的定投计算方式</CardTitle>
        <CardDescription>按照你想要的方式计算定投效果</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-max space-y-6">
            <FormField
              control={form.control}
              name="investmentMethod"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="1" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          1. 根据每月投资金额和预期年化收益率和投资时间计算预期资产总额。
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="2" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          2. 根据预期资产总额和预期年化收益率和投资时间计算每月应定投金额。
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            >
              Submit
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
};
