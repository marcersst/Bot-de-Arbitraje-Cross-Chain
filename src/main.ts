import dotenv from 'dotenv';
import { avalancheClient, sonicClient, testConnections } from './constanst/clients.js';
import { testSimpleBridge } from './bridges/visuls.js';
import { comparePrices, monitorPrices } from './auxs/index.js';

dotenv.config();

async function initializeBot() {
  console.log('-----Iniciando Bot de Arbitraje Cross-Chain-----');
  
  try {
    const blocks = await testConnections();
     
    console.log('----Estado de las redes:----', blocks);
   
    
    await testSimpleBridge();
    
    console.log('\n[*] Iniciando monitoreo de precios...');
    const priceAnalysis = await comparePrices();
    
    if (priceAnalysis.hasArbitrageOpportunity) {
      console.log('\n[!] ¡Oportunidad de arbitraje encontrada!');
      console.log(`[%] Diferencia de precio: ${priceAnalysis.percentageDiff.toFixed(4)}%`);
    }
    
    console.log('\n-----Bot inicializado exitosamente!-----');
    console.log('Iniciando monitoreo continuo cada 10 segundos...');
    
    return true;
  } catch (error) {
    console.error('Error al inicializar el bot:', error);
    return false;
  }
}


async function main() {
  const initialized = await initializeBot();
  
  if (!initialized) {
    process.exit(1);
  }
  
  setInterval(monitorPrices, 10000);
  
// Ejecutar Arbitraje si es posible, el threshold se calcula dinámicamente
// basado en costos reales (swap + bridge) + 0.5% de margen de seguridad, dado que es un pool estable es muy dificil de que llegue a esa diferencia del 3%
  // tendria que ser un redito mayor a 3%
  
}

main().catch(console.error);

export { avalancheClient, sonicClient, testConnections };