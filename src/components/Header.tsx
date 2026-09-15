import { Link, useLocation } from "react-router-dom";
import { useWallet } from "../hooks/useWallet";
import { ArrowLeftRight, Droplets, Landmark, Layers, Wallet, LogOut, Loader2 } from "lucide-react";
import clsx from "clsx";

const navItems = [
  { path: "/swap", label: "Swap", icon: ArrowLeftRight },
  { path: "/liquidity", label: "Liquidity", icon: Droplets },
  { path: "/lending", label: "Lending", icon: Landmark },
];

export function Header() {
  const location = useLocation();
  const { isConnected, address, isLoading, error, connect, disconnect } = useWallet();

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-800 bg-gray-950/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold">
            <Layers className="h-6 w-6 text-stellar-500" />
            <span className="hidden sm:inline">Web3 Suite</span>
          </Link>

          <div className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={clsx(
                    "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-stellar-600/20 text-stellar-400"
                      : "text-gray-400 hover:bg-gray-800 hover:text-gray-200"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Wallet Button */}
        <div className="flex flex-col items-end gap-1">
          {isLoading ? (
            <button className="btn-secondary flex items-center gap-2" disabled>
              <Loader2 className="h-4 w-4 animate-spin" />
              Connecting...
            </button>
          ) : isConnected && address ? (
            <div className="flex items-center gap-3">
              <span className="hidden font-mono text-sm text-gray-400 sm:block">
                {address.slice(0, 6)}...{address.slice(-4)}
              </span>
              <button onClick={disconnect} className="btn-secondary flex items-center gap-2">
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Disconnect</span>
              </button>
            </div>
          ) : (
            <>
              <button onClick={connect} className="btn-primary flex items-center gap-2">
                <Wallet className="h-4 w-4" />
                Connect Wallet
              </button>
              {error && <span className="text-xs text-defi-red">{error}</span>}
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
