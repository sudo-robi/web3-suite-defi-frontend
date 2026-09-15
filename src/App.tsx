import { Routes, Route, Navigate } from "react-router-dom";
import { Header } from "./components/Header";
import { Swap } from "./pages/Swap";
import { Liquidity } from "./pages/Liquidity";
import { Lending } from "./pages/Lending";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-950">
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-8">
        <Routes>
          <Route path="/" element={<Navigate to="/swap" replace />} />
          <Route path="/swap" element={<Swap />} />
          <Route path="/liquidity" element={<Liquidity />} />
          <Route path="/lending" element={<Lending />} />
        </Routes>
      </main>

      <footer className="border-t border-gray-800 py-6 text-center text-sm text-gray-500">
        <p>Web3 Suite DeFi · Built on Stellar/Soroban</p>
      </footer>
    </div>
  );
}
