import { Address } from 'viem';
import { getStargateFeesUSDC } from './stargateQuotes.js';

const S_TO_USDC_RATE = 0.35;   
const AVAX_TO_USDC_RATE = 19;  

export async function getNetUSDCAfterBridge(
  fromChain: 'AVALANCHE' | 'SONIC',
  toChain: 'AVALANCHE' | 'SONIC',
  walletAddress: Address
): Promise<number> {
  try {
    // Obtener cotización para 10 USDC
    const quoteResult = await getStargateFeesUSDC(
      fromChain,
      toChain,
      walletAddress,
      walletAddress,
      '10', 
      2 
    );
    
    if (!quoteResult.success || !quoteResult.data) {
      throw new Error(`Error obteniendo cotización: ${quoteResult.error || 'Desconocido'}`);
    }
    
    const { data } = quoteResult;
    
    let feesInUSDC: number;
    if (fromChain === 'SONIC') {
      feesInUSDC = parseFloat(data.totalFeeETH) * S_TO_USDC_RATE;
    } else {
      feesInUSDC = parseFloat(data.totalFeeETH) * AVAX_TO_USDC_RATE;
    }
    
    const netUSDC = parseFloat(data.outputUSDC) - feesInUSDC;
    
    return netUSDC;
  } catch (error) {
    console.error('Error calculando USDC neto:', error);
    return 0;
  }
}