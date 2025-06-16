import { Address } from 'viem';
import { AVALANCHE_ADDRESSES, SONIC_ADDRESSES } from '../constanst/addresses.js';

interface StargateFee {
  token: string;
  amount: string;
  type: string;
  chainKey: string;
}

interface StargateQuoteResponse {
  quotes: Array<{
    route: string;
    srcAddress: string;
    dstAddress: string;
    srcChainKey: string;
    dstChainKey: string;
    srcToken: string;
    dstToken: string;
    srcAmount: string;
    srcAmountMax: string;
    dstAmount: string;
    dstAmountMin: string;
    duration: {
      estimated: number;
    };
    allowance: string;
    dstNativeAmount: string;
    fees: StargateFee[];
    steps: Array<{
      type: 'approve' | 'bridge';
      sender: string;
      chainKey: string;
      transaction: {
        data: string;
        to: string;
        value?: string;
        from: string;
      };
    }>;
    error?: string;
  }>;
}

const STARGATE_CHAIN_KEYS = {
  AVALANCHE: 'avalanche',
  SONIC: 'sonic'
} as const;

const USDC_TOKENS = {
  AVALANCHE: AVALANCHE_ADDRESSES.TOKEN.USDC,
  SONIC: SONIC_ADDRESSES.TOKEN.USDC
} as const;


export async function getStargateFees(
  fromChain: 'AVALANCHE' | 'SONIC',
  toChain: 'AVALANCHE' | 'SONIC',
  srcAddress: Address,
  dstAddress: Address,
  amount: string, 
  minAmount?: string 
): Promise<{
  success: boolean;
  data?: {
    route: string;
    srcAmount: string;
    dstAmount: string;
    fees: StargateFee[];
    estimatedTime: number;
    totalFeeInWei: string;
    totalFeeInUSDC: string;
    slippage: string;
    slippagePercent: number;
  };
  error?: string;
}> {
  try {
    const calculatedMinAmount = minAmount || (BigInt(amount) * BigInt(98) / BigInt(100)).toString();
    
    const params = new URLSearchParams({
      srcToken: USDC_TOKENS[fromChain],
      dstToken: USDC_TOKENS[toChain],
      srcAddress,
      dstAddress,
      srcChainKey: STARGATE_CHAIN_KEYS[fromChain],
      dstChainKey: STARGATE_CHAIN_KEYS[toChain],
      srcAmount: amount,
      dstAmountMin: calculatedMinAmount
    });
    
    const apiUrl = `https://stargate.finance/api/v1/quotes?${params}`;
    
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
    }

    const data: StargateQuoteResponse = await response.json();
    
    if (!data.quotes || data.quotes.length === 0) {
      return {
        success: false,
        error: 'No se encontraron cotizaciones disponibles'
      };
    }

    const quote = data.quotes[0];
    
    if (quote.error) {
      return {
        success: false,
        error: `Error en la cotización: ${quote.error}`
      };
    }

    const totalFeeInWei = quote.fees.reduce((total, fee) => {
      return total + BigInt(fee.amount);
    }, BigInt(0)).toString();

    const srcAmountBigInt = BigInt(quote.srcAmount);
    const dstAmountBigInt = BigInt(quote.dstAmount);
    const slippageBigInt = srcAmountBigInt - dstAmountBigInt;
    const slippagePercent = Number(slippageBigInt * BigInt(10000) / srcAmountBigInt) / 100;

    return {
      success: true,
      data: {
        route: quote.route,
        srcAmount: quote.srcAmount,
        dstAmount: quote.dstAmount,
        fees: quote.fees,
        estimatedTime: quote.duration.estimated,
        totalFeeInWei,
        totalFeeInUSDC: (parseInt(totalFeeInWei) / 1e18).toFixed(6), 
        slippage: slippageBigInt.toString(),
        slippagePercent
      }
    };

  } catch (error) {
    console.error(' Error consultando fees de Stargate:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Error desconocido'
    };
  }
}

export async function getStargateFeesUSDC(
  fromChain: 'AVALANCHE' | 'SONIC',
  toChain: 'AVALANCHE' | 'SONIC',
  srcAddress: Address,
  dstAddress: Address,
  amountUSDC: string, 
  slippagePercent: number = 1 
): Promise<{
  success: boolean;
  data?: {
    inputUSDC: string;
    outputUSDC: string;
    totalFeeETH: string;
    slippageUSDC: string;
    estimatedTimeSeconds: number;
    isViable: boolean;
    costAnalysis: {
      bridgeLoss: number;
      bridgeLossPercent: number;
      feeInUSDC: number;
    };
  };
  error?: string;
}> {
  try {
    const amountInWei = (parseFloat(amountUSDC) * 1e6).toString();
    const minAmountInWei = (parseFloat(amountUSDC) * (1 - slippagePercent / 100) * 1e6).toString();
    
    const result = await getStargateFees(
      fromChain,
      toChain,
      srcAddress,
      dstAddress,
      amountInWei,
      minAmountInWei
    );
    
    if (!result.success || !result.data) {
      return {
        success: false,
        error: result.error || 'Error desconocido'
      };
    }
    
    const { data } = result;
    
    const inputUSDC = (parseInt(data.srcAmount) / 1e6).toFixed(6);
    const outputUSDC = (parseInt(data.dstAmount) / 1e6).toFixed(6);
    const slippageUSDC = (parseFloat(inputUSDC) - parseFloat(outputUSDC)).toFixed(6);
    
    const bridgeLoss = parseFloat(inputUSDC) - parseFloat(outputUSDC);
    const bridgeLossPercent = (bridgeLoss / parseFloat(inputUSDC)) * 100;
    const feeInUSDC = parseFloat(data.totalFeeInUSDC);
    const isViable = bridgeLossPercent < 5;
    
    return {
      success: true,
      data: {
        inputUSDC,
        outputUSDC,
        totalFeeETH: data.totalFeeInUSDC,
        slippageUSDC,
        estimatedTimeSeconds: data.estimatedTime,
        isViable,
        costAnalysis: {
          bridgeLoss,
          bridgeLossPercent,
          feeInUSDC
        }
      }
    };
    
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Error desconocido'
    };
  }
}

export function getBridgeData(result: Awaited<ReturnType<typeof getStargateFeesUSDC>>) {
  if (!result.success || !result.data) {
    return null;
  }
  return result.data;
}
