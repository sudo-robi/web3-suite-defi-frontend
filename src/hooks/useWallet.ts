import { useState, useCallback, useEffect } from "react";
import * as Freighter from "@freighter-api/freighter";

interface WalletState {
  isConnected: boolean;
  address: string | null;
  network: string | null;
  isLoading: boolean;
  error: string | null;
}

export function useWallet() {
  const [state, setState] = useState<WalletState>({
    isConnected: false,
    address: null,
    network: null,
    isLoading: false,
    error: null,
  });

  const connect = useCallback(async () => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    try {
      const isAllowed = await Freighter.isAllowed();
      if (!isAllowed) {
        await Freighter.requestAccess();
      }
      const address = await Freighter.getAddress();
      const network = await Freighter.getNetwork();
      setState({
        isConnected: true,
        address: address.address,
        network: network.network,
        isLoading: false,
        error: null,
      });
    } catch (err) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: err instanceof Error ? err.message : "Failed to connect wallet",
      }));
    }
  }, []);

  const disconnect = useCallback(() => {
    setState({
      isConnected: false,
      address: null,
      network: null,
      isLoading: false,
      error: null,
    });
  }, []);

  const signTransaction = useCallback(
    async (xdr: string): Promise<string | null> => {
      if (!state.isConnected || !state.address) return null;
      try {
        const signed = await Freighter.signTransaction(xdr, {
          network: state.network || "TESTNET",
          accountToSign: state.address,
        });
        return signed.signedTxXdr;
      } catch (err) {
        setState((prev) => ({
          ...prev,
          error: err instanceof Error ? err.message : "Transaction signing failed",
        }));
        return null;
      }
    },
    [state.isConnected, state.address, state.network]
  );

  // Check connection on mount
  useEffect(() => {
    const checkConnection = async () => {
      try {
        const isAllowed = await Freighter.isAllowed();
        if (isAllowed) {
          const address = await Freighter.getAddress();
          const network = await Freighter.getNetwork();
          setState({
            isConnected: true,
            address: address.address,
            network: network.network,
            isLoading: false,
            error: null,
          });
        }
      } catch {
        // Not connected
      }
    };
    checkConnection();
  }, []);

  return { ...state, connect, disconnect, signTransaction };
}
