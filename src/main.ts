import dotenv from 'dotenv';
import { avalancheClient, sonicClient, testConnections } from './constanst/clients.js';
import { testSimpleBridge } from './bridges/visuls.js';
import { comparePrices, monitorPrices } from './auxs/index.js';

dotenv.config();

async function initializeBot() {
  console.log('-----Starting Cross-Chain Arbitrage Bot-----');
  
  try {
    const blocks = await testConnections();
     
    console.log('----Network Status:----', blocks);
   
    
    await testSimpleBridge();
    
    console.log('\n[*] Starting price monitoring...');
    const priceAnalysis = await comparePrices();
    
    if (priceAnalysis.hasArbitrageOpportunity) {
      console.log('\n[!] Arbitrage opportunity found!');
      console.log(`[%] Price difference: ${priceAnalysis.percentageDiff.toFixed(4)}%`);
    }
    
    console.log('\n-----Bot initialized successfully!-----');
    console.log('Starting continuous monitoring every 10 seconds...');
    
    return true;
  } catch (error) {
    console.error('Error initializing bot:', error);
    return false;
  }
}


async function main() {
  const initialized = await initializeBot();
  
  if (!initialized) {
    process.exit(1);
  }
  
  setInterval(monitorPrices, 10000);
  
// Execute Arbitrage if possible, the threshold is calculated dynamically
// based on real costs (swap + bridge) + 0.5% safety margin, given that it's a stable pool it's very difficult to reach that 3% difference
  // it would have to be a return greater than 3%
  
}

main().catch(console.error);

export { avalancheClient, sonicClient, testConnections };