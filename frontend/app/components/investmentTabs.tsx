import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import FixedInvestmentCard from "./fixedInvestmentCard"
import PresentCommonCard from "./presentCommonCard"
// import MonthlySavingsCard from "./monthlySavingsCard"
import { presentMethodsCard } from "../utils/constant"


export function InvestmentTabs() {
  return (
    <Tabs defaultValue="accumulation" >
      <TabsList className="grid grid-cols-4 max-w-5xl mx-auto w-full">
        <TabsTrigger value="accumulation">つみたて投資シミュレーション</TabsTrigger>
        <TabsTrigger value="rate">利回りシミュレーション</TabsTrigger>
        <TabsTrigger value="amount">毎月積立額シミュレーション</TabsTrigger>
        <TabsTrigger value="horizon">積立期間シミュレーション</TabsTrigger>
      </TabsList>
      <TabsContent value="accumulation" className="max-w-5xl mx-auto w-full">
        <FixedInvestmentCard />
      </TabsContent>
      {presentMethodsCard.map((item: string) => {
        return(
          <TabsContent key={item} value={item}>
            <PresentCommonCard key={item} type={item}/>
          </TabsContent>
        )})
      }
      {/* <TabsContent value="monthlySavings">
        <MonthlySavingsCard />
      </TabsContent> */}
    </Tabs>
  )
}
