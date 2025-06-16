import { getPrices } from './priceComparator.js';


export async function monitorPrices() {
  try {
    const prices = await getPrices();
    
    const difference = Math.abs(prices.avalanche - prices.sonic);
    const percentageDiff = (difference / Math.min(prices.avalanche, prices.sonic)) * 100;
    const ARBITRAGE_THRESHOLD = 3;
    const hasArbitrageOpportunity = percentageDiff > ARBITRAGE_THRESHOLD;
    
    const timestamp = new Date().toLocaleTimeString();
    
    if (hasArbitrageOpportunity) {
      console.log(`[${timestamp}] [!] OPORTUNIDAD DE ARBITRAJE DISPONIBLE!`);
      console.log(`[%] Diferencia: ${percentageDiff.toFixed(4)}% | Avalanche: $${prices.avalanche.toFixed(6)} | Sonic: $${prices.sonic.toFixed(6)}`);
    } else {
      console.log(`[${timestamp}] [i] No hay oportunidades de arbitraje (${percentageDiff.toFixed(2)}%)`);
    }
  } catch (error) {
    const timestamp = new Date().toLocaleTimeString();
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error(`[${timestamp}] [ERROR] Error en monitoreo:`, errorMessage);
  }
}