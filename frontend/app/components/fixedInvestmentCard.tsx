"use client"
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function FixedInvestmentCard() {
  return (
    <Card className="rounded-lg shadow-lg p-6 bg-primary-50">
      <CardHeader>
        <CardTitle>选择你的定投计算方式</CardTitle>
        <CardDescription>按照你想要的方式计算定投效果</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-8 items-center justify-items-center pb-10">
          <Button variant="outline" asChild className="w-full max-w-2xl">
            <Link href="/investment/forecast-assets">1. 根据每月投资金额和预期年化收益率和投资时间计算预期资产总额。</Link>
          </Button>
          <Button variant="outline" asChild className="w-full max-w-2xl">
            <Link href="/investment/calculate-monthly-investment"> 2. 根据预期资产总额和预期年化收益率和投资时间计算每月应定投金额。</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
};
