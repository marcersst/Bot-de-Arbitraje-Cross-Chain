import { avalanche } from 'viem/chains';

export const sonic = {
  id: 146,
  name: 'Sonic',
  network: 'sonic',
  nativeCurrency: {
    decimals: 18,
    name: 'Sonic',
    symbol: 'S',
  },
  rpcUrls: {
    default: {
      http: [process.env.SONIC_RPC_URL || 'https://rpc.soniclabs.com'],
    },
    public: {
      http: [process.env.SONIC_RPC_URL || 'https://rpc.soniclabs.com'],
    },
  },
  blockExplorers: {
    default: { name: 'Sonic Explorer', url: 'https://explorer.soniclabs.com' },
  },
} as const;

export { avalanche };

export const CHAINS = {
  AVALANCHE: avalanche,
  SONIC: sonic,
} as const;

export const CHAIN_IDS = {
  AVALANCHE: 43114,
  SONIC: 146,
} as const;