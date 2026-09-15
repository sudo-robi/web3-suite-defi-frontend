import { useState, useEffect, useCallback } from "react";

interface LendingRates {
  supplyApy: string;
  borrowApy: string;
  utilization: string;
}

interface UseLendingRatesReturn {
  rates: LendingRates | null;
  isLoading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

export function useLendingRates(): UseLendingRatesReturn {
  const [rates, setRates] = useState<LendingRates | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRates = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/lending/rates");
      if (!response.ok) throw new Error("Failed to fetch rates");
      const data = await response.json();
      setRates(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Rate fetch failed");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRates();
    const interval = setInterval(fetchRates, 30_000); // Refresh every 30s
    return () => clearInterval(interval);
  }, [fetchRates]);

  return { rates, isLoading, error, refresh: fetchRates };
}
