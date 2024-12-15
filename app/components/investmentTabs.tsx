import {useTranslation} from 'react-i18next'
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
  const { t } = useTranslation('common')
  return (
    <Tabs defaultValue="accumulation">
      <TabsList className="grid grid-cols-1 mb-32 md:mb-4 md:grid-cols-4 gap-1 bg-transparent md:bg-muted md:gap-2">
        <TabsTrigger value="accumulation" className="data-[state=active]:bg-muted md:data-[state=active]:bg-[#ffffff]">{t("tags_title.accumulation_investment_simulation")}</TabsTrigger>
        <TabsTrigger value="rate" className="data-[state=active]:bg-muted md:data-[state=active]:bg-[#ffffff]">{t("tags_title.yield_simulation")}</TabsTrigger>
        <TabsTrigger value="amount" className="data-[state=active]:bg-muted md:data-[state=active]:bg-[#ffffff]">{t("tags_title.monthly_savings_simulation")}</TabsTrigger>
        <TabsTrigger value="horizon" className="data-[state=active]:bg-muted md:data-[state=active]:bg-[#ffffff]">{t("tags_title.accumulation_period_simulation")}</TabsTrigger>
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
