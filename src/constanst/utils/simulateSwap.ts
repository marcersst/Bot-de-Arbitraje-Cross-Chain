import { parseAbi, PublicClient } from 'viem';


const poolAbi = parseAbi([
  'function fee() external view returns (uint24)'
]);

export async function estimateSwapFeeFor10USDT(
  client: PublicClient,
  poolAddress: `0x${string}`
) {
  const amountIn = 10_000_000n; //(6 decimales)

  const result = await client.readContract({
    address: poolAddress,
    abi: poolAbi,
    functionName: 'fee'
  });

  const feeBps = Number(result); 
  const feeAmount = (amountIn * BigInt(feeBps)) / 10_000n;

  return {
    feePercentage: feeBps / 100,
    feeAmount: Number(feeAmount) / 1e6,
    amountIn: Number(amountIn) / 1e6
  };
}


