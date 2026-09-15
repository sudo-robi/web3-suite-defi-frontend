import { useState } from "react";
import { ArrowDownUp, Settings, Info } from "lucide-react";
import { useSwapQuote } from "../hooks/useSwapQuote";

const MOCK_TOKENS = [
  { symbol: "XLM", name: "Stellar Lumens", address: "CAS3J7HYLGSEL2VK4LW25QW2YMOHQYDWGD6Y6QSEZ3OZCNR6ESY5CCCP" },
  { symbol: "USDC", name: "USD Coin", address: "CB6CH2QSS6FNEBNSNKRMZ2NC2RYQKQ3K5VMWQV4ZVD4YKPP3KQXSQAIS" },
  { symbol: "BTC", name: "Wrapped Bitcoin", address: "GBTG2POJVVSRBQSZVA3IYJEZJQLPTIVVYOYRLTZEAEFBM67E2UPHOJ7A" },
  { symbol: "ETH", name: "Wrapped Ether", address: "CAMMBLPKUOY5VTBLI7ELBXS54IS7VAZF4UO3UFE5LMTYQCDJELKRCRJ4" },
];

export function SwapPage() {
  const [tokenIn, setTokenIn] = useState(MOCK_TOKENS[0]);
  const [tokenOut, setTokenOut] = useState(MOCK_TOKENS[1]);
  const [amountIn, setAmountIn] = useState("");
  const { quote, isLoading, error } = useSwapQuote();

  const handleSwapTokens = () => {
    setTokenIn(tokenOut);
    setTokenOut(tokenIn);
  };

  return (
    <div className="mx-auto max-w-lg space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Swap Tokens</h1>
        <p className="mt-1 text-sm text-gray-400">
          Trade tokens on the Stellar DEX
        </p>
      </div>

      <div className="card glow-stellar">
        {/* From Token */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="stat-label">You pay</span>
            <span className="stat-label">Balance: 0.00</span>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="text"
              inputMode="decimal"
              placeholder="0.0"
              value={amountIn}
              onChange={(e) => setAmountIn(e.target.value)}
              className="input-field flex-1 font-mono text-2xl"
            />
            <button className="flex items-center gap-2 rounded-xl bg-gray-800 px-4 py-3 font-semibold transition-colors hover:bg-gray-700">
              {tokenIn.symbol}
            </button>
          </div>
        </div>

        {/* Swap Direction Button */}
        <div className="relative flex justify-center py-2">
          <button
            onClick={handleSwapTokens}
            className="absolute -top-3 z-10 rounded-xl border border-gray-700 bg-gray-900 p-2 transition-all hover:border-stellar-500 hover:bg-gray-800"
          >
            <ArrowDownUp className="h-4 w-4 text-gray-400" />
          </button>
        </div>

        {/* To Token */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="stat-label">You receive</span>
            <span className="stat-label">Balance: 0.00</span>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="text"
              readOnly
              placeholder="0.0"
              value={quote?.amountOut || ""}
              className="input-field flex-1 font-mono text-2xl opacity-70"
            />
            <button className="flex items-center gap-2 rounded-xl bg-gray-800 px-4 py-3 font-semibold transition-colors hover:bg-gray-700">
              {tokenOut.symbol}
            </button>
          </div>
        </div>

        {/* Quote Details */}
        {quote && (
          <div className="mt-4 space-y-2 rounded-xl bg-gray-800/50 p-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Price Impact</span>
              <span className={Number(quote.priceImpactPct) > 100 ? "text-defi-red" : "text-defi-green"}>
                {quote.priceImpactPct}%
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Trading Fee</span>
              <span className="text-gray-300">{quote.fee}</span>
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="mt-3 rounded-xl bg-defi-red/10 p-3 text-sm text-defi-red">
            {error}
          </div>
        )}

        {/* Action Button */}
        <button className="btn-primary mt-4 w-full" disabled={!amountIn || isLoading}>
          {isLoading ? "Getting Quote..." : "Swap"}
        </button>
      </div>

      {/* Pool Info */}
      <div className="card">
        <div className="mb-3 flex items-center gap-2">
          <Info className="h-4 w-4 text-gray-400" />
          <span className="text-sm font-medium text-gray-300">Pool Information</span>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="stat-label">Reserve {tokenIn.symbol}</div>
            <div className="stat-value">--</div>
          </div>
          <div>
            <div className="stat-label">Reserve {tokenOut.symbol}</div>
            <div className="stat-value">--</div>
          </div>
          <div>
            <div className="stat-label">Fee Tier</div>
            <div className="stat-value">0.30%</div>
          </div>
          <div>
            <div className="stat-label">Total Liquidity</div>
            <div className="stat-value">--</div>
          </div>
        </div>
      </div>
    </div>
  );
}
