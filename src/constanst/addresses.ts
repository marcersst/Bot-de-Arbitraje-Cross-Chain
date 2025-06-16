type TokenAddresses = {
    USDC: string;
    USDT: string;
}

type PoolAddresses ={
    USDT_USDC: string; 
}

export const AVALANCHE_ADDRESSES = {
    TOKEN: {
        USDT:`0x9702230A8Ea53601f5cD2dc00fDBc13d4dF4A8c7`,
        USDC: `0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E`,
    } as TokenAddresses,

    POOLS :{
        USDT_USDC: `0x184B487c7e811f1d9734D49E78293e00b3768079`,
    } as PoolAddresses,
}
export const SONIC_ADDRESSES = {
    TOKEN: {
        USDT:`0x6047828dc181963ba44974801FF68e538dA5eaF9`,
        USDC: `0x29219dd400f2Bf60E5a23d13Be72B486D4038894`,
    } as TokenAddresses,

    POOLS :{
        USDT_USDC: `0x9053fE060f412ad5677f934F89e07524343eE8E7`,
    } as PoolAddresses,
}

