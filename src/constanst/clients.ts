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
  console.log('-----Probando conexiones de red-----');
  
  try {
    const avalancheBlock = await avalancheClient.getBlockNumber();
    console.log(`-----Avalanche conectado - Bloque actual: ${avalancheBlock}-----`);
    
    const sonicBlock = await sonicClient.getBlockNumber();
    console.log(`-----Sonic conectado - Bloque actual: ${sonicBlock}-----`);
    
    return { avalanche: avalancheBlock, sonic: sonicBlock };
  } catch (error) {
    console.error(' Error de conexión:', error);
    throw error;
  }
}