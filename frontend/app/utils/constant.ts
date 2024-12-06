export const apiBaseUrl = process.env.NEXT_PUBLIC_BASE_URL

export const presentMethodsCard = ["amount", "rate", "horizon"] 

export enum presentCommonType {
  amount="rate",
  rate="amount",
  horizon="horizon"
}