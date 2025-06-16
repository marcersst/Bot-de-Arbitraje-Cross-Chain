import { getPriceAvalanche } from './avalanchePrice.js';
import { getPriceSonic } from './sonicPrice.js';

export async function getPrices() {
  try {
    console.log('\n' + '='.repeat(60));
    console.log('>> INICIANDO OBTENCIÓN DE PRECIOS EN AMBAS REDES');
    console.log('='.repeat(60));
    console.log('');
    
    const [avalanchePrice, sonicPrice] = await Promise.all([
      getPriceAvalanche(),
      getPriceSonic()
    ]);
    
    console.log('\n[OK] Precios obtenidos exitosamente\n');
    
    return {
      avalanche: avalanchePrice,
      sonic: sonicPrice
    };
  } catch (error) {
    console.error('\n Error obteniendo precios:', error);
    throw error;
  }
}

export async function comparePrices() {
  try {
    const prices = await getPrices();
    
    console.log('\n' + '='.repeat(60));
    console.log('*** COMPARACIÓN DE PRECIOS ENTRE REDES ***');
    console.log('='.repeat(60));
    console.log('');
    
    console.log('*** PRECIOS ACTUALES ***');
    console.log(`   [A] Avalanche: $${prices.avalanche.toFixed(6)}`);
    console.log(`   [S] Sonic:     $${prices.sonic.toFixed(6)}`);
    console.log('');
    
    const difference = Math.abs(prices.avalanche - prices.sonic);
    const percentageDiff = (difference / Math.min(prices.avalanche, prices.sonic)) * 100;
    
    console.log('*** ANÁLISIS DE DIFERENCIAS ***');
    console.log(`   [$] Diferencia absoluta: $${difference.toFixed(6)}`);
    console.log(`   [%] Diferencia porcentual: ${percentageDiff.toFixed(2)}%`);
    console.log('');
    
    // Determinar cuál red tiene mejor precio
    console.log('*** MEJOR PRECIO ***');
    if (prices.avalanche < prices.sonic) {
      console.log('   [+] Avalanche tiene el mejor precio');
    } else if (prices.sonic < prices.avalanche) {
      console.log('   [+] Sonic tiene el mejor precio');
    } else {
      console.log('   [=] Precios iguales en ambas redes');
    }
    console.log('');
    
    const ARBITRAGE_THRESHOLD = 3; 
    console.log('*** OPORTUNIDAD DE ARBITRAJE ***');
    if (percentageDiff > ARBITRAGE_THRESHOLD) {
      console.log(`   [!] ¡OPORTUNIDAD DETECTADA! (${percentageDiff.toFixed(2)}%)`);
      console.log('');
      
      if (prices.avalanche < prices.sonic) {
        console.log('   [*] ESTRATEGIA RECOMENDADA:');
        console.log('      [<] Comprar en Avalanche');
        console.log('      [>] Vender en Sonic');
      } else {
        console.log('   [*] ESTRATEGIA RECOMENDADA:');
        console.log('      [<] Comprar en Sonic');
        console.log('      [>] Vender en Avalanche');
      }
    } else {
      console.log(`   [i] No hay oportunidad significativa (${percentageDiff.toFixed(2)}% < ${ARBITRAGE_THRESHOLD}%)`);
    }
    
    console.log('');
    console.log('='.repeat(60));
    console.log('[OK] COMPARACIÓN COMPLETADA');
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