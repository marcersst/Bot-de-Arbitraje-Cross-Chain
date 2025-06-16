import { sonicClient } from '../constanst/clients.js';
import { SONIC_ADDRESSES } from '../constanst/addresses.js';
import { UNISWAP_V3_POOL_ABI } from '../constanst/utils/abis.js';
import { calculatePriceFromSqrtPriceX96 } from './priceCalculator.js';

// Función para obtener precio en Sonic
export async function getPriceSonic(): Promise<number> {
  try {
    console.log('----Obteniendo precio USDT/USDC en Sonic---  ');
    
    const poolData = await sonicClient.readContract({
      address: SONIC_ADDRESSES.POOLS.USDT_USDC as `0x${string}`,
      abi: UNISWAP_V3_POOL_ABI,
      functionName: 'slot0'
    });
    
    const price = calculatePriceFromSqrtPriceX96(poolData[0]);
    console.log(` ----Precio Sonic: ${price.toFixed(6)}----`);
    
    return price;
  } catch (error) {
    console.error('Error obteniendo precio en Sonic:', error);
    throw error;
  }
}