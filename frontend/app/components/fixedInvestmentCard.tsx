"use client"
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function FixedInvestmentCard() {
  return (
    <Card className="p-6 bg-primary-50">
          <CardHeader>
            <CardTitle>将来いくらになるかを知りたい</CardTitle>
            <CardDescription>
              つみたて投資すると将来いくらになる？
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="initial_investment">初期投資額</Label>
              <Input id="initial_investment" defaultValue="10" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="monthly_reserve">毎月の積立額</Label>
              <Input id="monthly_reserve" defaultValue="10" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="reserve_periods">積立期間</Label>
              <Input id="reserve_periods" defaultValue="10" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="year_return">想定リターン（年率）</Label>
              <Input id="year_return" defaultValue="10" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>計算する</Button>
          </CardFooter>
    </Card>
  )
};
