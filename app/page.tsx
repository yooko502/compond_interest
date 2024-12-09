import { InvestmentFooter } from "./components/investmentFooter";
import { InvestmentHeaders } from "./components/investmentHeaders";
import { InvestmentTabs } from "./components/investmentTabs";


export default function Home() {
  return (
    <div className="grid grid-rows-[80px_1fr_20px] justify-items-center min-h-screen gap-8 md:gap-16">
      <InvestmentHeaders/>
      <main className="flex flex-col row-start-2 max-w-5xl mx-auto w-full">
        <InvestmentTabs />
      </main>
      <InvestmentFooter/>
    </div>
  );
}