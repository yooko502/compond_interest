import { InvestmentTabs } from "./components/investmentTabs";


export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] justify-items-center min-h-screen gap-16">
      <div>定投小工具</div>
      <main className="flex flex-col row-start-2 max-w-5xl mx-auto w-full">
        <InvestmentTabs />
      </main>
      <div>xiaoyang xiaozhuo kaifagongju</div>
    </div>
  );
}
