import { useState, useCallback } from "react";

interface SwapQuote {
  amountIn: string;
  amountOut: string;
  fee: string;
  priceImpactPct: string;
}

interface UseSwapQuoteReturn {
  quote: SwapQuote | null;
  isLoading: boolean;
  error: string | null;
  fetchQuote: (tokenIn: string, tokenOut: string, amountIn: string, aToB: boolean) => Promise<void>;
}

export function useSwapQuote(): UseSwapQuoteReturn {
  const [quote, setQuote] = useState<SwapQuote | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchQuote = useCallback(
    async (tokenIn: string, tokenOut: string, amountIn: string, aToB: boolean) => {
      if (!amountIn || amountIn === "0") {
        setQuote(null);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams({
          tokenIn,
          tokenOut,
          amountIn,
          aToB: String(aToB),
        });

        const response = await fetch(`/api/swap/quote?${params}`);
        if (!response.ok) {
          const err = await response.json();
          throw new Error(err.message || "Failed to fetch quote");
        }

        const data = await response.json();
        setQuote(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Quote fetch failed");
        setQuote(null);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return { quote, isLoading, error, fetchQuote };
}
