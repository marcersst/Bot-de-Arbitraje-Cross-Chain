import { getNetUSDCAfterBridge } from './bridgeUSDC.js';
import { estimateSwapFeeFor10USDT } from '../constanst/utils/simulateSwap.js';
import { avalancheClient, sonicClient } from '../constanst/clients.js';

export async function testSimpleBridge() {
  const testAddress = '0x1234567890abcdef1234567890abcdef12345678' as `0x${string}`;
  const poolAddress = '0x184B487c7e811f1d9734D49E78293e00b3768079';
  
  try {
    const [swapAvax, swapSonic] = await Promise.all([
      estimateSwapFeeFor10USDT(avalancheClient, poolAddress),
      estimateSwapFeeFor10USDT(sonicClient, '0x9053fE060f412ad5677f934F89e07524343eE8E7')
    ]);
    
    console.log('[TEST] Testing bridge of 10 USDC from SONIC to AVALANCHE...');
    const netUSDC_SonicToAvalanche = await getNetUSDCAfterBridge('SONIC', 'AVALANCHE', testAddress);
    console.log(`[RESULT] Net USDC to receive (SONIC -> AVALANCHE): ${netUSDC_SonicToAvalanche.toFixed(6)} USDC`);
    
    const bridgeLoss_SonicToAvalanche = 10 - netUSDC_SonicToAvalanche;
    const totalCost_SonicToAvalanche = Number(swapSonic.feeAmount) + bridgeLoss_SonicToAvalanche + Number(swapAvax.feeAmount);
    const totalCostPercent_SonicToAvalanche = (totalCost_SonicToAvalanche / 10) * 100;
    
    console.log('[TEST] Testing bridge of 10 USDC from AVALANCHE to SONIC...');
    const netUSDC_AvalancheToSonic = await getNetUSDCAfterBridge('AVALANCHE', 'SONIC', testAddress);
    console.log(`[RESULT] Net USDC to receive (AVALANCHE -> SONIC): ${netUSDC_AvalancheToSonic.toFixed(6)} USDC`);
    
    const bridgeLoss_AvalancheToSonic = 10 - netUSDC_AvalancheToSonic;
    const totalCost_AvalancheToSonic = Number(swapAvax.feeAmount) + bridgeLoss_AvalancheToSonic + Number(swapSonic.feeAmount);
    const totalCostPercent_AvalancheToSonic = (totalCost_AvalancheToSonic / 10) * 100;
    
    console.log('\nTOTAL ARBITRAGE COSTS SUMMARY (10 USDT)');
    console.log('=' .repeat(60));
    
    console.log('[SONIC -> AVALANCHE]:');
    console.log(`   Swap Sonic: ${swapSonic.feeAmount} USDT`);
    console.log(`   Bridge: ${bridgeLoss_SonicToAvalanche.toFixed(6)} USDT`);
    console.log(`   Swap Avalanche: ${swapAvax.feeAmount} USDT`);
    console.log(`   TOTAL COST: ${totalCost_SonicToAvalanche.toFixed(6)} USDT (${totalCostPercent_SonicToAvalanche.toFixed(2)}%)`);
    console.log(`   Final amount: ${(10 - totalCost_SonicToAvalanche).toFixed(6)} USDT\n`);
    
    console.log('[AVALANCHE -> SONIC]:');
    console.log(`   Swap Avalanche: ${swapAvax.feeAmount} USDT`);
    console.log(`   Bridge: ${bridgeLoss_AvalancheToSonic.toFixed(6)} USDT`);
    console.log(`   Swap Sonic: ${swapSonic.feeAmount} USDT`);
    console.log(`   TOTAL COST: ${totalCost_AvalancheToSonic.toFixed(6)} USDT (${totalCostPercent_AvalancheToSonic.toFixed(2)}%)`);
    console.log(`   Final amount: ${(10 - totalCost_AvalancheToSonic).toFixed(6)} USDT`);
    
    console.log('=' .repeat(60));
    
  } catch (error) {
    console.error('[ERROR] Error en test de bridge simplificado:', error);
  }
}
