export function calculatePriceFromSqrtPriceX96(sqrtPriceX96: bigint): number {
  const Q96 = 2n ** 96n;
  const price = (Number(sqrtPriceX96) / Number(Q96)) ** 2;
  return price;
}

export function calculatePercentageDifference(price1: number, price2: number): number {
  const priceDifference = Math.abs(price1 - price2);
  const percentageDifference = (priceDifference / Math.min(price1, price2)) * 100;
  return percentageDifference;
}

export function detectArbitrageOpportunity(percentageDifference: number, threshold: number = 0.1): boolean {
  return percentageDifference > threshold;
}