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

export default function WithdrawalCard() {
  return (
    <Card className="p-6 bg-primary-50">
          <CardHeader>
            <CardTitle>利回り</CardTitle>
            <CardDescription>
              目標額を達成するための利回りを計算する
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="target_amount">目標額</Label>
              <Input id="target_amount" defaultValue="1000" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="monthly_reserve">毎月の積立額</Label>
              <Input id="monthly_reserve" defaultValue="10" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="reserve_periods">積立期間</Label>
              <Input id="reserve_periods" defaultValue="10" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>計算する</Button>
          </CardFooter>
    </Card>
  )
};
