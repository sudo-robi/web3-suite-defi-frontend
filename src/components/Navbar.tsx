import { Link, useLocation } from "react-router-dom";
import { WalletButton } from "./WalletButton";
import { ArrowLeftRight, Droplets, Landmark, Layers } from "lucide-react";
import clsx from "clsx";

const navItems = [
  { path: "/swap", label: "Swap", icon: ArrowLeftRight },
  { path: "/liquidity", label: "Liquidity", icon: Droplets },
  { path: "/lending", label: "Lending", icon: Landmark },
];

export function Navbar() {
  const location = useLocation();

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

        <WalletButton />
      </div>
    </nav>
  );
}
