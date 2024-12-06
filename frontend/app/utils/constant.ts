export const apiBaseUrl = process.env.NEXT_PUBLIC_BASE_URL

export const presentMethodsCard = ["amount", "rate", "horizon"] 

export enum presentCommonType {
  amount="rate",
  rate="amount",
  horizon="horizon"
}

export const presentCommonTitle: { [key: string]: string } = {
  "amount": "毎月積立額",
  "rate": "利回り",
  "horizon": "積立期間"
}

export const presentCommonDescription: { [key: string]: string } = {
  "amount": "目標額を達成するための毎月積立額を計算する",
  "rate": "目標額を達成するための利回りを計算する",
  "horizon": "目標額を達成するための積立期間を計算する"
}

export const presenCommonUnit: {[key: string]: string} = {
  "amount": "万円",
  "rate": "%",
  "horizon": "年"
}
