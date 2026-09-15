import { useState } from "react";
import { ArrowDownUp, Settings, Info } from "lucide-react";
import { TokenInput, type Token } from "../components/TokenInput";
import { useSwapQuote } from "../hooks/useSwapQuote";

const TOKENS: Token[] = [
  { symbol: "XLM", name: "Stellar Lumens", address: "CAS3J7HYLGSEL2VK4LW25QW2YMOHQYDWGD6Y6QSEZ3OZCNR6ESY5CCCP" },
  { symbol: "USDC", name: "USD Coin", address: "CB6CH2QSS6FNEBNSNKRMZ2NC2RYQKQ3K5VMWQV4ZVD4YKPP3KQXSQAIS" },
  { symbol: "BTC", name: "Wrapped Bitcoin", address: "GBTG2POJVVSRBQSZVA3IYJEZJQLPTIVVYOYRLTZEAEFBM67E2UPHOJ7A" },
  { symbol: "ETH", name: "Wrapped Ether", address: "CAMMBLPKUOY5VTBLI7ELBXS54IS7VAZF4UO3UFE5LMTYQCDJELKRCRJ4" },
];

const SLIPPAGE_OPTIONS = ["0.1", "0.5", "1.0"];

export function Swap() {
  const [tokenIn, setTokenIn] = useState<Token>(TOKENS[0]);
  const [tokenOut, setTokenOut] = useState<Token>(TOKENS[1]);
  const [amountIn, setAmountIn] = useState("");
  const [slippage, setSlippage] = useState("0.5");
  const [showSettings, setShowSettings] = useState(false);
  const { quote, isLoading, error } = useSwapQuote();

  const handleSwapTokens = () => {
    setTokenIn(tokenOut);
    setTokenOut(tokenIn);
    setAmountIn("");
  };

  const minAmountOut = quote
    ? String(Math.floor(Number(quote.amountOut) * (1 - Number(slippage) / 100)))
    : "0";

  return (
    <div className="mx-auto max-w-lg space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Swap Tokens</h1>
        <p className="mt-1 text-sm text-gray-400">
          Trade tokens on the Stellar DEX with minimal slippage
        </p>
      </div>

      <div className="card glow-stellar">
        {/* Settings Toggle */}
        <div className="mb-3 flex justify-end">
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-800 hover:text-gray-200"
          >
            <Settings className="h-4 w-4" />
          </button>
        </div>

        {/* Slippage Settings */}
        {showSettings && (
          <div className="mb-4 rounded-xl bg-gray-800/50 p-3">
            <div className="mb-2 text-sm font-medium text-gray-300">Slippage Tolerance</div>
            <div className="flex gap-2">
              {SLIPPAGE_OPTIONS.map((opt) => (
                <button
                  key={opt}
                  onClick={() => setSlippage(opt)}
                  className={`rounded-lg px-3 py-1 text-sm transition-colors ${
                    slippage === opt
                      ? "bg-stellar-600/20 text-stellar-400"
                      : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                  }`}
                >
                  {opt}%
                </button>
              ))}
            </div>
          </div>
        )}

        {/* From Token */}
        <TokenInput
          label="You pay"
          value={amountIn}
          onChange={setAmountIn}
          selectedToken={tokenIn}
          onTokenSelect={setTokenIn}
          tokens={TOKENS}
          balance="0.00"
        />

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
        <TokenInput
          label="You receive"
          value={quote?.amountOut || ""}
          onChange={() => {}}
          selectedToken={tokenOut}
          onTokenSelect={setTokenOut}
          tokens={TOKENS}
          balance="0.00"
          readOnly
        />

        {/* Quote Details */}
        {quote && (
          <div className="mt-4 space-y-2 rounded-xl bg-gray-800/50 p-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Price Impact</span>
              <span className={Number(quote.priceImpactPct) > 100 ? "text-defi-red" : "text-defi-green"}>
                {(Number(quote.priceImpactPct) / 100).toFixed(2)}%
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Trading Fee</span>
              <span className="text-gray-300">{quote.fee}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Minimum Received</span>
              <span className="text-gray-300">{minAmountOut}</span>
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="mt-3 rounded-xl bg-defi-red/10 p-3 text-sm text-defi-red">{error}</div>
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
