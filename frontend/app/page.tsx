import FixedInvestmentCard from "./components/fixedInvestmentCard";


export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen gap-16">
      <div>定投小工具</div>
      <main className="flex flex-col row-start-2 items-center">
        <FixedInvestmentCard />
      </main>
      <div>xiaoyang xiaozuokaifagongju</div>
    </div>
  );
}
