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
    <Tabs defaultValue="accumulation">
      <TabsList className="grid grid-cols-1 mb-32 md:mb-4 md:grid-cols-4 gap-1 bg-transparent md:bg-muted md:gap-2">
        <TabsTrigger value="accumulation" className="data-[state=active]:bg-muted md:data-[state=active]:bg-[#ffffff]">つみたて投資シミュレーション</TabsTrigger>
        <TabsTrigger value="rate" className="data-[state=active]:bg-muted md:data-[state=active]:bg-[#ffffff]">利回りシミュレーション</TabsTrigger>
        <TabsTrigger value="amount" className="data-[state=active]:bg-muted md:data-[state=active]:bg-[#ffffff]">毎月積立額シミュレーション</TabsTrigger>
        <TabsTrigger value="horizon" className="data-[state=active]:bg-muted md:data-[state=active]:bg-[#ffffff]">積立期間シミュレーション</TabsTrigger>
      </TabsList>
      <TabsContent value="accumulation" className="mt-4 px-2 md:px-4">
        <FixedInvestmentCard />
      </TabsContent>
      {presentMethodsCard.map((item: string) => {
        return(
          <TabsContent key={item} value={item} className="mt-4 px-2 md:px-4">
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
