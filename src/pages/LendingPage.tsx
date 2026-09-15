import { useState } from "react";
import { Landmark, TrendingUp, AlertTriangle, Shield } from "lucide-react";
import { useLendingRates } from "../hooks/useLendingRates";

export function LendingPage() {
  const { rates, isLoading: ratesLoading } = useLendingRates();
  const [activeTab, setActiveTab] = useState<"supply" | "borrow">("supply");

  const formatApy = (bps: string) => {
    const num = Number(bps);
    return (num / 100).toFixed(2) + "%";
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Lending</h1>
        <p className="mt-1 text-sm text-gray-400">
          Supply assets to earn interest or borrow against your collateral
        </p>
      </div>

      {/* Rate Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="card glow-green">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-defi-green" />
            <span className="stat-label">Supply APY</span>
          </div>
          <div className="stat-value mt-1 text-defi-green">
            {ratesLoading ? "--" : formatApy(rates?.supplyApy || "0")}
          </div>
        </div>
        <div className="card">
          <div className="flex items-center gap-2">
            <Landmark className="h-5 w-5 text-stellar-400" />
            <span className="stat-label">Borrow APY</span>
          </div>
          <div className="stat-value mt-1">
            {ratesLoading ? "--" : formatApy(rates?.borrowApy || "0")}
          </div>
        </div>
        <div className="card">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-defi-purple" />
            <span className="stat-label">Utilization</span>
          </div>
          <div className="stat-value mt-1">
            {ratesLoading
              ? "--"
              : (Number(rates?.utilization || "0") / 100).toFixed(1) + "%"}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        <button
          onClick={() => setActiveTab("supply")}
          className={`rounded-xl px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === "supply"
              ? "bg-defi-green/20 text-defi-green"
              : "text-gray-400 hover:bg-gray-800"
          }`}
        >
          Supply
        </button>
        <button
          onClick={() => setActiveTab("borrow")}
          className={`rounded-xl px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === "borrow"
              ? "bg-stellar-600/20 text-stellar-400"
              : "text-gray-400 hover:bg-gray-800"
          }`}
        >
          Borrow
        </button>
      </div>

      {/* Supply Panel */}
      {activeTab === "supply" && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="card max-w-lg">
            <h3 className="mb-4 text-lg font-semibold">Supply Assets</h3>
            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm text-gray-400">
                  Asset
                </label>
                <select className="input-field">
                  <option>XLM</option>
                  <option>USDC</option>
                  <option>BTC</option>
                </select>
              </div>
              <div>
                <label className="mb-1 block text-sm text-gray-400">
                  Amount
                </label>
                <input
                  type="text"
                  placeholder="0.0"
                  className="input-field font-mono"
                />
              </div>
              <button className="btn-primary w-full bg-defi-green text-gray-900 hover:bg-defi-green/90">
                Supply
              </button>
            </div>
          </div>

          <div className="card">
            <h3 className="mb-4 text-lg font-semibold">Your Supply Position</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400">Supplied</span>
                <span className="font-mono">0.00 XLM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Interest Earned</span>
                <span className="font-mono text-defi-green">0.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Exchange Rate</span>
                <span className="font-mono">1.00</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Borrow Panel */}
      {activeTab === "borrow" && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="card max-w-lg">
            <h3 className="mb-4 text-lg font-semibold">Borrow Assets</h3>
            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm text-gray-400">
                  Collateral (XLM)
                </label>
                <input
                  type="text"
                  placeholder="0.0"
                  className="input-field font-mono"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm text-gray-400">
                  Borrow Amount (USDC)
                </label>
                <input
                  type="text"
                  placeholder="0.0"
                  className="input-field font-mono"
                />
              </div>
              <div className="rounded-xl bg-gray-800/50 p-3">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <AlertTriangle className="h-4 w-4 text-defi-yellow" />
                  Collateral Factor: 75% · Liquidation at 80% LTV
                </div>
              </div>
              <button className="btn-primary w-full">Borrow</button>
            </div>
          </div>

          <div className="card">
            <h3 className="mb-4 text-lg font-semibold">Your Borrow Position</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400">Collateral</span>
                <span className="font-mono">0.00 XLM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Borrowed</span>
                <span className="font-mono">0.00 USDC</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Health Factor</span>
                <span className="font-mono text-defi-green">∞</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Interest Owed</span>
                <span className="font-mono text-defi-red">0.00</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
