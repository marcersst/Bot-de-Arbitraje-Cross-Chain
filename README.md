# Cross-Chain Arbitrage Bot: Sonic ↔ Avalanche

## ⏱️ **Development Completed in 6 Hours**

This project was completely developed in **6 hours** as a technical demonstration of a cross-chain arbitrage system between Sonic and Avalanche, focusing on USDC/USDT.

## 📋 Description

This project is an automated arbitrage bot that monitors token price differences between **Sonic** and **Avalanche** networks. The bot dynamically calculates operational costs and determines profitable arbitrage opportunities. **The bot continuously analyzes market conditions every 10 seconds** to identify real-time arbitrage opportunities.

## 🚫 **Decision: Not Implementing Real Swaps**

### **💡 Technical and Economic Reasons**

**1. Negative Profitability Analysis**
- Operational costs (0.7% - 2%) consistently exceed arbitrage opportunities
- Without direct USDT bridge, multiple costly hops are required
- Profit margin is insufficient to justify the risk

**2. Infrastructure Limitations**
- **CCIP not available** between Sonic and Avalanche
- **Only USDC has direct bridge** (Stargate)
- **Limited liquidity** in pools on some networks

**3. Focus on Technical Demonstration**
- **Complete simulation** is safer to demonstrate capabilities
- **Precise calculations** without risk of capital loss
- **End-to-end analysis** without financial exposure

**4. Maximized Educational Value**
- Demonstrates **real understanding** of DeFi challenges
- Shows **critical thinking** about economic viability
- Provides **solid foundation** for future implementations

## 🚨 **Profitability Limitations**

### ❌ **Why is it not currently profitable?**

1. **Absence of direct USDT bridge**: No direct bridge exists for USDT between Sonic and Avalanche
2. **Multiple bridge hops**: At least 2-3 bridges are required to complete arbitrage
3. **Only USDC available**: The only stable token with direct bridge is USDC
4. **Cumulative costs**: Each additional bridge adds significant fees
5. **No CCIP available**: Chainlink CCIP is not available between these networks

### 💰 **Cost Structure**

```
Total Cost = Swap Fee (Origin Network) + Bridge Fee + Swap Fee (Destination Network)
Minimum Threshold = Total Cost + 0.5% (safety margin)
```

**Typical cost example:**
- Sonic Swap: ~0.3% - 0.5%
- USDC Bridge (Stargate): ~0.1% - 0.3%
- Avalanche Swap: ~0.3% - 0.5%


To be profitable, the price difference must exceed these costs + margin.

## **Technologies Used**

### **Blockchain & Web3**
- **[Viem](https://viem.sh/)**: TypeScript client for interacting with EVM blockchains
- **Uniswap V3**: For price fetching and swap fee calculations
- **Stargate Protocol**: Bridge for USDC transfers between the two chains

### **Development**
- **TypeScript**: Main project language
- **Node.js**: JavaScript runtime
- **ts-node**: Direct TypeScript execution
- **dotenv**: Environment variable management

### **Blockchain Networks**
- **Sonic Network**: High-speed L2 network
- **Avalanche C-Chain**: EVM-compatible network

## **Project Architecture**

```
src/
├── auxs/                    # Auxiliary utilities
│   ├── avalanchePrice.ts    # Price fetching on Avalanche
│   ├── sonicPrice.ts        # Price fetching on Sonic
│   ├── priceComparator.ts   # Price comparison and analysis
│   └── monitor.ts           # Continuous monitoring
├── bridges/                 # Bridge logic
│   ├── bridgeUSDC.ts        # USDC bridge via Stargate
│   ├── stargateQuotes.ts    # Stargate quotes
│   └── visuls.ts            # Cost visualization
├── constanst/               # Constants and configuration
│   ├── addresses.ts         # Contract addresses
│   ├── chains.ts            # Network configuration
│   ├── clients.ts           # Blockchain clients
│   └── utils/               # Utilities
└── main.ts                  # Main entry point
```

## 🔧 **Installation and Configuration**

### **Prerequisites**
- Node.js v18+
- npm or yarn
- `.env` file with configuration

### **Installation**

```bash
# Clone the repository
git clone <repository-url>
cd BotTranding

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env
# Edit .env with your configurations
```

### **Environment Variables**

```env
# RPC URLs
AVALANCHE_RPC_URL=https://api.avax.network/ext/bc/C/rpc
SONIC_RPC_URL=https://rpc.soniclabs.com

# Contract addresses (optional for monitoring)
PRIVATE_KEY=your_private_key_here
```

## 🚀 **Usage**

### **Available Commands**

```bash
# Start complete monitoring (analyzes every 10 seconds)
npm run start

```

### **Output Example**

```
*** CALCULATING ARBITRAGE COSTS ***
   [C] Cost SONIC → AVALANCHE: 1.15%
   [C] Cost AVALANCHE → SONIC: 1.08%
   [T] Dynamic threshold: 1.58% (minimum cost + 0.5%)

*** ARBITRAGE OPPORTUNITY ***
   [i] No significant opportunity (0.85% < 1.58%)
```

## 📊 **Main Features**

### **1. Price Monitoring**
- Real-time price fetching from both networks
- Calculation of absolute and percentage differences
- Identification of the network with the best price
- **Continuous analysis every 10 seconds**

### **2. Dynamic Cost Calculation**
- Swap fee estimation on both networks
- USDC bridge cost calculation
- Dynamic threshold based on real costs

### **3. Profitability Analysis**
- Automatic comparison: difference vs costs
- 0.5% safety margin
- Strategy recommendations

### **4. Cost Visualization**
- Detailed breakdown of all fees
- Final amount calculation after costs
- Total cost percentages

## ⚠️ **Technical Limitations**

### **Bridge Constraints**
- **USDC only**: Only stable token with direct bridge
- **Stargate Protocol**: Dependency on a single provider
- **Variable fees**: Costs change according to liquidity

### **Network Limitations**
- **No CCIP**: Chainlink Cross-Chain not available
- **Limited liquidity**: Small pools on some networks
- **Slippage**: Price impact with large volumes

### **Hardcoded Prices**
- **S and AVAX prices**: Native token prices are hardcoded for visual demonstration purposes
- **Real implementation**: In production, these prices should be obtained dynamically from real pools
- **Purpose**: Fixed values were used to simplify the demonstration and focus on arbitrage logic

## 🔮 **Future Improvements**

1. **Integration of more bridges**: LayerZero, Wormhole, etc.
2. **Support for more tokens**: ETH, BTC, other stablecoins
3. **Route optimization**: Finding more efficient paths
4. **MEV Protection**: Protection against front-running
5. **Web Dashboard**: Graphical interface for monitoring




## ⚡ **Conclusion**

Although technically functional, this bot demonstrates the **economic limitations** of current cross-chain arbitrage between Sonic and Avalanche. Operational costs frequently exceed profit opportunities, especially without efficient direct bridges.


### **📋 Requested Project Context**

This bot was developed as a response to a trial project that requested:
- USDC/USDT arbitrage between Avalanche and Sonic
- Use of CCIP for USDC bridge
- Optimized bridge for USDT
- Monitoring of specific CL pools (Pharaoh/Shadow)
- Automatic execution when profitable

### **🔄 Implementation vs Requirements**

#### **✅ What was implemented:**
- ✅ **Price monitoring**: Complete cross-network comparison system
- ✅ **Cost calculation**: Dynamic analysis of fees and profitability
- ✅ **TypeScript + Viem architecture**: Requested technology stack
- ✅ **Configurable threshold**: Dynamic system based on real costs
- ✅ **Detailed logging**: Complete cost and analysis information
- ✅ **End-to-end simulation**: Complete round-trip calculation
- ✅ **Continuous monitoring**: Analysis every 10 seconds

#### **⚠️ Necessary adaptations:**

**1. USDC Bridge (Stargate vs CCIP)**
- **Requested**: CCIP for USDC
- **Implemented**: Stargate Protocol
- **Reason**: CCIP is not available between Sonic and Avalanche
- **Alternative**: Stargate is the most reliable bridge available for USDC

**2. USDT Bridge**
- **Requested**: Optimized bridge for USDT
- **Reality**: No direct USDT bridge exists between Sonic-Avalanche
- **Solution**: Only USDC has viable direct bridge
- **Impact**: This makes arbitrage significantly more expensive

**3. Specific Pools**
- **Requested**: Pharaoh (Avalanche) and Shadow (Sonic)
- **Implemented**: Available pools on each network
- **Adaptation**: Used pools with highest available liquidity

### **🛠️ Technical Decisions Made**

#### **Bridge Selection for USDT**
**Problem**: No direct USDT bridge Sonic ↔ Avalanche

**Options evaluated**:
1. **LayerZero**: Does not support Sonic directly
2. **Wormhole**: Very high fees, multiple hops
3. **Multichain**: Discontinued
4. **Stargate**: Only USDC available

**Final decision**: **Use USDC only** via Stargate
- **Estimated cost**: 0.1% - 0.3%
- **Average time**: 2-5 minutes
- **Reliability**: High (established protocol)


### **🔒 Risk Reduction for Large Capital**

If this system handled significant capital:

#### **1. Risk Management**
- **Position sizing**: Maximum 1-2% of capital per trade
- **Stop-loss**: Automatic loss limits
- **Slippage protection**: Dynamic price impact calculation
- **MEV protection**: Use of private mempools

#### **2. Infrastructure**
- **Multiple RPC endpoints**: Connectivity redundancy
- **Circuit breakers**: Automatic pause in anomalous conditions
- **Real-time monitoring**: System and performance alerts
- **Hot/Cold wallet separation**: Minimize exposure

#### **3. Operational Security**
- **Multi-sig wallets**: Requires multiple signatures
- **Time delays**: Cooldowns for large operations
- **Audit trails**: Complete logging of all operations
- **Insurance**: Coverage for smart contract risks




---





