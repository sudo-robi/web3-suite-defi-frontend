import { Routes, Route, Navigate } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { SwapPage } from "./pages/SwapPage";
import { LiquidityPage } from "./pages/LiquidityPage";
import { LendingPage } from "./pages/LendingPage";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-950">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-8">
        <Routes>
          <Route path="/" element={<Navigate to="/swap" replace />} />
          <Route path="/swap" element={<SwapPage />} />
          <Route path="/liquidity" element={<LiquidityPage />} />
          <Route path="/lending" element={<LendingPage />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-6 text-center text-sm text-gray-500">
        <p>Web3 Suite DeFi · Built on Stellar/Soroban</p>
      </footer>
    </div>
  );
}
