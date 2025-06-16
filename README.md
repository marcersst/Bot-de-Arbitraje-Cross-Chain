# Bot de Arbitraje Cross-Chain: Sonic ↔ Avalanche

## ⏱️ **Desarrollo Completado en 6 Horas**

Este proyecto fue desarrollado completamente en **6 horas** como demostración técnica de un sistema de arbitraje cross-chain entre Sonic y Avalanche, enfocándose en USDC/USDT.

## 📋 Descripción

Este proyecto es un bot de arbitraje automatizado que monitorea diferencias de precios de tokens entre las redes **Sonic** y **Avalanche**. El bot calcula dinámicamente los costos operativos y determina oportunidades de arbitraje rentables.

## 🚫 **Decisión: No Implementar Swaps Reales**

### **💡 Razones Técnicas y Económicas**

**1. Análisis de Rentabilidad Negativa**
- Los costos operativos (0.7% - 2%) superan consistentemente las oportunidades de arbitraje
- Sin bridge directo USDT, se requieren múltiples saltos costosos
- El margen de ganancia es insuficiente para justificar el riesgo

**2. Limitaciones de Infraestructura**
- **CCIP no disponible** entre Sonic y Avalanche
- **Solo USDC tiene bridge directo** (Stargate)
- **Liquidez limitada** en pools de algunas redes

**3. Enfoque en Demostración Técnica**
- **Simulación completa** es más segura para demostrar capacidades
- **Cálculos precisos** sin riesgo de pérdida de capital
- **Análisis end-to-end** sin exposición financiera

**4. Valor Educativo Maximizado**
- Demuestra **comprensión real** de los desafíos DeFi
- Muestra **pensamiento crítico** sobre viabilidad económica
- Proporciona **base sólida** para futuras implementaciones

## 🚨 **Limitaciones de Rentabilidad**

### ❌ **¿Por qué no es rentable actualmente?**

1. **Ausencia de puente USDT directo**: No existe un puente directo para USDT entre Sonic y Avalanche
2. **Múltiples saltos de bridge**: Se requieren al menos 2-3 bridges para completar el arbitraje
3. **Solo USDC disponible**: El único token estable con bridge directo es USDC
4. **Costos acumulativos**: Cada bridge adicional suma fees significativos
5. **Sin CCIP disponible**: Chainlink CCIP no está disponible entre estas redes

### 💰 **Estructura de Costos**

```
Costo Total = Swap Fee (Red Origen) + Bridge Fee + Swap Fee (Red Destino)
Threshold Mínimo = Costo Total + 0.5% (margen de seguridad)
```

**Ejemplo típico de costos:**
- Swap Sonic: ~0.3% - 0.5%
- Bridge USDC (Stargate): ~0.1% - 0.3%
- Swap Avalanche: ~0.3% - 0.5%


Para ser rentable, la diferencia de precios debe superar estos costos + margen.

##  **Tecnologías Utilizadas**

### **Blockchain & Web3**
- **[Viem](https://viem.sh/)**: Cliente TypeScript para interactuar con blockchains EVM
- **Uniswap V3**: Para obtener precios y calcular fees de swap
- **Stargate Protocol**: Bridge para transferencias USDC entre  las dos cadenas

### **Desarrollo**
- **TypeScript**: Lenguaje principal del proyecto
- **Node.js**: Runtime de JavaScript
- **ts-node**: Ejecución directa de TypeScript
- **dotenv**: Gestión de variables de entorno

### **Redes Blockchain**
- **Sonic Network**: Red L2 de alta velocidad
- **Avalanche C-Chain**: Red compatible con EVM

## **Arquitectura del Proyecto**

```
src/
├── auxs/                    # Utilidades auxiliares
│   ├── avalanchePrice.ts    # Obtención de precios en Avalanche
│   ├── sonicPrice.ts        # Obtención de precios en Sonic
│   ├── priceComparator.ts   # Comparación y análisis de precios
│   └── monitor.ts           # Monitoreo continuo
├── bridges/                 # Lógica de bridges
│   ├── bridgeUSDC.ts        # Bridge USDC via Stargate
│   ├── stargateQuotes.ts    # Cotizaciones de Stargate
│   └── visuls.ts            # Visualización de costos
├── constanst/               # Constantes y configuración
│   ├── addresses.ts         # Direcciones de contratos
│   ├── chains.ts            # Configuración de redes
│   ├── clients.ts           # Clientes blockchain
│   └── utils/               # Utilidades
└── main.ts                  # Punto de entrada principal
```

## 🔧 **Instalación y Configuración**

### **Prerrequisitos**
- Node.js v18+
- npm o yarn
- Archivo `.env` con configuración

### **Instalación**

```bash
# Clonar el repositorio
git clone <repository-url>
cd BotTranding

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tus configuraciones
```

### **Variables de Entorno**

```env
# RPC URLs
AVALANCHE_RPC_URL=https://api.avax.network/ext/bc/C/rpc
SONIC_RPC_URL=https://rpc.soniclabs.com

# Direcciones de contratos (opcional para monitoreo)
PRIVATE_KEY=your_private_key_here
```

## 🚀 **Uso**

### **Comandos Disponibles**

```bash
# Iniciar monitoreo completo
npm run start

```

### **Ejemplo de Salida**

```
*** CALCULANDO COSTOS DE ARBITRAJE ***
   [C] Costo SONIC → AVALANCHE: 1.15%
   [C] Costo AVALANCHE → SONIC: 1.08%
   [T] Threshold dinámico: 1.58% (costo mínimo + 0.5%)

*** OPORTUNIDAD DE ARBITRAJE ***
   [i] No hay oportunidad significativa (0.85% < 1.58%)
```

## 📊 **Funcionalidades Principales**

### **1. Monitoreo de Precios**
- Obtención de precios en tiempo real de ambas redes
- Cálculo de diferencias absolutas y porcentuales
- Identificación de la red con mejor precio

### **2. Cálculo Dinámico de Costos**
- Estimación de fees de swap en ambas redes
- Cálculo de costos de bridge USDC
- Threshold dinámico basado en costos reales

### **3. Análisis de Rentabilidad**
- Comparación automática: diferencia vs costos
- Margen de seguridad del 0.5%
- Recomendaciones de estrategia

### **4. Visualización de Costos**
- Desglose detallado de todos los fees
- Cálculo del monto final después de costos
- Porcentajes de costo total

## ⚠️ **Limitaciones Técnicas**

### **Bridge Constraints**
- **Solo USDC**: Único token estable con bridge directo
- **Stargate Protocol**: Dependencia de un solo proveedor
- **Fees variables**: Los costos cambian según liquidez

### **Network Limitations**
- **Sin CCIP**: Chainlink Cross-Chain no disponible
- **Liquidez limitada**: Pools pequeños en algunas redes
- **Slippage**: Impacto en precios con volúmenes grandes

### **Precios Hardcodeados**
- **Precios de S y AVAX**: Los precios de los tokens nativos están hardcodeados para fines de demostración visual
- **Implementación real**: En producción, estos precios deberían obtenerse dinámicamente de los pools reales
- **Propósito**: Se utilizaron valores fijos para simplificar la demostración y enfocarse en la lógica de arbitraje

## 🔮 **Mejoras Futuras**

1. **Integración de más bridges**: LayerZero, Wormhole, etc.
2. **Soporte para más tokens**: ETH, BTC, otros stablecoins
3. **Optimización de rutas**: Encontrar paths más eficientes
4. **MEV Protection**: Protección contra front-running
5. **Dashboard Web**: Interfaz gráfica para monitoreo




## ⚡ **Conclusión**

Aunque técnicamente funcional, este bot demuestra las **limitaciones económicas** del arbitraje cross-chain actual entre Sonic y Avalanche. Los costos operativos superan frecuentemente las oportunidades de ganancia, especialmente sin bridges directos eficientes.


### **📋 Contexto del Proyecto Solicitado**

Este bot fue desarrollado como respuesta a un trial project que solicitaba:
- Arbitraje USDC/USDT entre Avalanche y Sonic
- Uso de CCIP para bridge USDC
- Bridge optimizado para USDT
- Monitoreo de pools CL específicos (Pharaoh/Shadow)
- Ejecución automática cuando sea rentable

### **🔄 Implementación vs Requerimientos**

#### **✅ Lo que se implementó:**
- ✅ **Monitoreo de precios**: Sistema completo de comparación entre redes
- ✅ **Cálculo de costos**: Análisis dinámico de fees y rentabilidad
- ✅ **Arquitectura TypeScript + Viem**: Stack tecnológico solicitado
- ✅ **Threshold configurable**: Sistema dinámico basado en costos reales
- ✅ **Logging detallado**: Información completa de costos y análisis
- ✅ **Simulación end-to-end**: Cálculo completo del round-trip

#### **⚠️ Adaptaciones necesarias:**

**1. Bridge USDC (Stargate vs CCIP)**
- **Solicitado**: CCIP para USDC
- **Implementado**: Stargate Protocol
- **Razón**: CCIP no está disponible entre Sonic y Avalanche
- **Alternativa**: Stargate es el bridge más confiable disponible para USDC

**2. Bridge USDT**
- **Solicitado**: Bridge optimizado para USDT
- **Realidad**: No existe bridge directo USDT entre Sonic-Avalanche
- **Solución**: Solo USDC tiene bridge directo viable
- **Impacto**: Esto hace el arbitraje significativamente más costoso

**3. Pools Específicos**
- **Solicitado**: Pharaoh (Avalanche) y Shadow (Sonic)
- **Implementado**: Pools disponibles en cada red
- **Adaptación**: Se usaron los pools con mayor liquidez disponibles

### **🛠️ Decisiones Técnicas Tomadas**

#### **Bridge Selection para USDT**
**Problema**: No hay bridge directo USDT Sonic ↔ Avalanche

**Opciones evaluadas**:
1. **LayerZero**: No soporta Sonic directamente
2. **Wormhole**: Fees muy altos, múltiples saltos
3. **Multichain**: Descontinuado
4. **Stargate**: Solo USDC disponible

**Decisión final**: **Usar solo USDC** via Stargate
- **Costo estimado**: 0.1% - 0.3%
- **Tiempo promedio**: 2-5 minutos
- **Confiabilidad**: Alta (protocolo establecido)


### **🔒 Reducción de Riesgo para Capital Grande**

Si este sistema manejara capital significativo:

#### **1. Risk Management**
- **Position sizing**: Máximo 1-2% del capital por trade
- **Stop-loss**: Límites automáticos de pérdida
- **Slippage protection**: Cálculo dinámico de impacto en precio
- **MEV protection**: Uso de private mempools

#### **2. Infrastructure**
- **Multiple RPC endpoints**: Redundancia de conectividad
- **Circuit breakers**: Pausa automática en condiciones anómalas
- **Real-time monitoring**: Alertas de sistema y performance
- **Hot/Cold wallet separation**: Minimizar exposición

#### **3. Operational Security**
- **Multi-sig wallets**: Requiere múltiples firmas
- **Time delays**: Cooldowns para operaciones grandes
- **Audit trails**: Logging completo de todas las operaciones
- **Insurance**: Cobertura para smart contract risks




---





