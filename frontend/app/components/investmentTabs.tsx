import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import FixedInvestmentCard from "./fixedInvestmentCard"
import WithdrawalCard from "./withdrawalCard"

export function InvestmentTabs() {
  return (
    <Tabs defaultValue="accumulation" >
      <TabsList className="grid grid-cols-2 max-w-5xl mx-auto w-full">
        <TabsTrigger value="accumulation">つみたて投資シミュレーション</TabsTrigger>
        <TabsTrigger value="withdrawal">取り崩しシミュレーション</TabsTrigger>
      </TabsList>
      <TabsContent value="accumulation" className="max-w-5xl mx-auto w-full">
        <FixedInvestmentCard />
      </TabsContent>
      <TabsContent value="withdrawal">
        <WithdrawalCard />
      </TabsContent>
    </Tabs>
  )
}
