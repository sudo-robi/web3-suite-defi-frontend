import { useWallet } from "../hooks/useWallet";
import { Wallet, LogOut, Loader2 } from "lucide-react";
import clsx from "clsx";

export function WalletButton() {
  const { isConnected, address, isLoading, error, connect, disconnect } = useWallet();

  if (isLoading) {
    return (
      <button className="btn-secondary flex items-center gap-2" disabled>
        <Loader2 className="h-4 w-4 animate-spin" />
        Connecting...
      </button>
    );
  }

  if (isConnected && address) {
    return (
      <div className="flex items-center gap-3">
        <div className="hidden sm:block">
          <span className="font-mono text-sm text-gray-400">
            {address.slice(0, 6)}...{address.slice(-4)}
          </span>
        </div>
        <button
          onClick={disconnect}
          className="btn-secondary flex items-center gap-2"
        >
          <LogOut className="h-4 w-4" />
          <span className="hidden sm:inline">Disconnect</span>
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-end gap-1">
      <button
        onClick={connect}
        className="btn-primary flex items-center gap-2"
      >
        <Wallet className="h-4 w-4" />
        Connect Wallet
      </button>
      {error && (
        <span className="text-xs text-defi-red">{error}</span>
      )}
    </div>
  );
}
