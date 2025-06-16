import { getPriceAvalanche } from './avalanchePrice.js';
import { getPriceSonic } from './sonicPrice.js';

export async function getPrices() {
  try {
    console.log('\n' + '='.repeat(60));
    console.log('>> STARTING PRICE RETRIEVAL ON BOTH NETWORKS');
    console.log('='.repeat(60));
    console.log('');
    
    const [avalanchePrice, sonicPrice] = await Promise.all([
      getPriceAvalanche(),
      getPriceSonic()
    ]);
    
    console.log('\n[OK] Prices obtained successfully\n');
    
    return {
      avalanche: avalanchePrice,
      sonic: sonicPrice
    };
  } catch (error) {
    console.error('\n Error obtaining prices:', error);
    throw error;
  }
}

export async function comparePrices() {
  try {
    const prices = await getPrices();
    
    console.log('\n' + '='.repeat(60));
    console.log('*** PRICE COMPARISON BETWEEN NETWORKS ***');
    console.log('='.repeat(60));
    console.log('');
    
    console.log('*** CURRENT PRICES ***');
    console.log(`   [A] Avalanche: $${prices.avalanche.toFixed(6)}`);
    console.log(`   [S] Sonic:     $${prices.sonic.toFixed(6)}`);
    console.log('');
    
    const difference = Math.abs(prices.avalanche - prices.sonic);
    const percentageDiff = (difference / Math.min(prices.avalanche, prices.sonic)) * 100;
    
    console.log('*** DIFFERENCE ANALYSIS ***');
    console.log(`   [$] Absolute difference: $${difference.toFixed(6)}`);
    console.log(`   [%] Percentage difference: ${percentageDiff.toFixed(2)}%`);
    console.log('');
    
    // Determine which network has the best price
    console.log('*** BEST PRICE ***');
    if (prices.avalanche < prices.sonic) {
      console.log('   [+] Avalanche has the best price');
    } else if (prices.sonic < prices.avalanche) {
      console.log('   [+] Sonic has the best price');
    } else {
      console.log('   [=] Equal prices on both networks');
    }
    console.log('');
    
    const ARBITRAGE_THRESHOLD = 3; 
    console.log('*** ARBITRAGE OPPORTUNITY ***');
    if (percentageDiff > ARBITRAGE_THRESHOLD) {
      console.log(`   [!] OPPORTUNITY DETECTED! (${percentageDiff.toFixed(2)}%)`);
      console.log('');
      
      if (prices.avalanche < prices.sonic) {
        console.log('   [*] RECOMMENDED STRATEGY:');
        console.log('      [<] Buy on Avalanche');
        console.log('      [>] Sell on Sonic');
      } else {
        console.log('   [*] RECOMMENDED STRATEGY:');
        console.log('      [<] Buy on Sonic');
        console.log('      [>] Sell on Avalanche');
      }
    } else {
      console.log(`   [i] No significant opportunity (${percentageDiff.toFixed(2)}% < ${ARBITRAGE_THRESHOLD}%)`);
    }
    
    console.log('');
    console.log('='.repeat(60));
    console.log('[OK] COMPARISON COMPLETED');
    console.log('='.repeat(60) + '\n');
    
    return {
      avalanche: prices.avalanche,
      sonic: prices.sonic,
      difference,
      percentageDiff,
      hasArbitrageOpportunity: percentageDiff > ARBITRAGE_THRESHOLD
    };
  } catch (error) {
    console.error('\n Error en comparación de precios:', error);
    console.error('='.repeat(60) + '\n');
    throw error;
  }
}

export const getPrice = comparePrices;