import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import FixedInvestmentCard from "./fixedInvestmentCard"
import WithdrawalCard from "./withdrawalCard"
import MonthlySavingsCard from "./monthlySavingsCard"

export function InvestmentTabs() {
  return (
    <Tabs defaultValue="accumulation" >
      <TabsList className="grid grid-cols-3 max-w-5xl mx-auto w-full">
        <TabsTrigger value="accumulation">つみたて投資シミュレーション</TabsTrigger>
        <TabsTrigger value="withdrawal">利回りシミュレーション</TabsTrigger>
        <TabsTrigger value="monthlySavings">毎月積立額シミュレーション</TabsTrigger>
      </TabsList>
      <TabsContent value="accumulation" className="max-w-5xl mx-auto w-full">
        <FixedInvestmentCard />
      </TabsContent>
      <TabsContent value="withdrawal">
        <WithdrawalCard />
      </TabsContent>
      <TabsContent value="monthlySavings">
        <MonthlySavingsCard />
      </TabsContent>
    </Tabs>
  )
}
