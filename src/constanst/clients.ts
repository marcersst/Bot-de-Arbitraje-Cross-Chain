import { createPublicClient, http } from 'viem';
import { avalanche, sonic } from './chains.js';

export const avalancheClient = createPublicClient({
  chain: avalanche,
  transport: http(process.env.AVALANCHE_RPC_URL)
});

export const sonicClient = createPublicClient({
  chain: sonic,
  transport: http(process.env.SONIC_RPC_URL)
});

export async function testConnections() {
  console.log('-----Testing network connections-----');
  
  try {
    const avalancheBlock = await avalancheClient.getBlockNumber();
    console.log(`-----Avalanche connected - Current block: ${avalancheBlock}-----`);
    
    const sonicBlock = await sonicClient.getBlockNumber();
    console.log(`-----Sonic connected - Current block: ${sonicBlock}-----`);
    
    return { avalanche: avalancheBlock, sonic: sonicBlock };
  } catch (error) {
    console.error(' Connection error:', error);
    throw error;
  }
}