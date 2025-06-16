import { avalancheClient } from '../constanst/clients.js';
import { AVALANCHE_ADDRESSES } from '../constanst/addresses.js';
import { UNISWAP_V3_POOL_ABI } from '../constanst/utils/abis.js';
import { calculatePriceFromSqrtPriceX96 } from './priceCalculator.js';

export async function getPriceAvalanche(): Promise<number> {
  try {
    console.log('📊 Obteniendo precio USDT/USDC en Avalanche...');
    
    const poolData = await avalancheClient.readContract({
      address: AVALANCHE_ADDRESSES.POOLS.USDT_USDC as `0x${string}`,
      abi: UNISWAP_V3_POOL_ABI,
      functionName: 'slot0'
    });
    
    const price = calculatePriceFromSqrtPriceX96(poolData[0]);
    console.log(`----Precio Avalanche: ${price.toFixed(6)}--`);
    
    return price;
  } catch (error) {
    console.error('Error obteniendo precio en Avalanche:', error);
    throw error;
  }
}