import { useState } from "react";
import { Plus, Minus, TrendingUp, Droplets } from "lucide-react";

interface LiquidityPosition {
  id: string;
  tokenA: string;
  tokenB: string;
  feeTier: number;
  liquidity: string;
  valueUsd: string;
}

const MOCK_POSITIONS: LiquidityPosition[] = [
  { id: "1", tokenA: "XLM", tokenB: "USDC", feeTier: 30, liquidity: "12,450", valueUsd: "$24,900" },
  { id: "2", tokenA: "XLM", tokenB: "BTC", feeTier: 100, liquidity: "8,200", valueUsd: "$16,400" },
];

export function Liquidity() {
  const [activeTab, setActiveTab] = useState<"positions" | "add">("positions");

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Liquidity Pools</h1>
        <p className="mt-1 text-sm text-gray-400">
          Provide liquidity and earn trading fees from every swap
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="card">
          <div className="stat-label">Total Value Locked</div>
          <div className="stat-value glow-green">$41,300</div>
        </div>
        <div className="card">
          <div className="stat-label">Total Fees Earned</div>
          <div className="stat-value text-defi-green">+$342.50</div>
        </div>
        <div className="card">
          <div className="stat-label">Active Positions</div>
          <div className="stat-value">{MOCK_POSITIONS.length}</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        <button
          onClick={() => setActiveTab("positions")}
          className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === "positions"
              ? "bg-stellar-600/20 text-stellar-400"
              : "text-gray-400 hover:bg-gray-800"
          }`}
        >
          <TrendingUp className="h-4 w-4" />
          My Positions
        </button>
        <button
          onClick={() => setActiveTab("add")}
          className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === "add"
              ? "bg-stellar-600/20 text-stellar-400"
              : "text-gray-400 hover:bg-gray-800"
          }`}
        >
          <Plus className="h-4 w-4" />
          Add Liquidity
        </button>
      </div>

      {/* Positions List */}
      {activeTab === "positions" && (
        <div className="space-y-3">
          {MOCK_POSITIONS.map((pos) => (
            <div key={pos.id} className="card hover:border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-stellar-600/20">
                    <Droplets className="h-5 w-5 text-stellar-400" />
                  </div>
                  <div>
                    <div className="font-semibold">
                      {pos.tokenA} / {pos.tokenB}
                    </div>
                    <div className="text-sm text-gray-400">
                      Fee Tier: {pos.feeTier / 100}%
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-mono font-semibold">{pos.valueUsd}</div>
                  <div className="text-sm text-gray-400">{pos.liquidity} LP</div>
                </div>
                <div className="flex gap-2">
                  <button className="rounded-lg border border-gray-700 p-2 transition-colors hover:border-stellar-500 hover:bg-gray-800">
                    <Plus className="h-4 w-4" />
                  </button>
                  <button className="rounded-lg border border-gray-700 p-2 transition-colors hover:border-defi-red hover:bg-gray-800">
                    <Minus className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Liquidity Form */}
      {activeTab === "add" && (
        <div className="card max-w-lg">
          <h3 className="mb-4 text-lg font-semibold">Add Liquidity</h3>
          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-sm text-gray-400">Token Pair</label>
              <select className="input-field">
                <option>XLM / USDC (0.30%)</option>
                <option>XLM / BTC (1.00%)</option>
                <option>USDC / ETH (0.30%)</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm text-gray-400">Amount XLM</label>
              <input type="text" placeholder="0.0" className="input-field font-mono" />
            </div>
            <div>
              <label className="mb-1 block text-sm text-gray-400">Amount USDC</label>
              <input type="text" placeholder="0.0" className="input-field font-mono" />
            </div>
            <div>
              <label className="mb-1 block text-sm text-gray-400">Price Range (Tick Lower / Upper)</label>
              <div className="flex gap-2">
                <input type="number" placeholder="-100" className="input-field font-mono" />
                <input type="number" placeholder="100" className="input-field font-mono" />
              </div>
            </div>
            <button className="btn-primary w-full">Add Liquidity</button>
          </div>
        </div>
      )}
    </div>
  );
}
