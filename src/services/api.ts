const API_BASE = import.meta.env.VITE_API_URL || "";

export async function apiGet<T>(path: string): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`);
  if (!response.ok) {
    const err = await response.json().catch(() => ({ message: response.statusText }));
    throw new Error(err.message || `API error: ${response.status}`);
  }
  return response.json();
}

export async function apiPost<T>(path: string, body: unknown): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    const err = await response.json().catch(() => ({ message: response.statusText }));
    throw new Error(err.message || `API error: ${response.status}`);
  }
  return response.json();
}

// ─── Swap API ─────────────────────────────────────────────

export const swapApi = {
  getQuote: (params: {
    tokenIn: string;
    tokenOut: string;
    amountIn: string;
    aToB: boolean;
  }) => {
    const query = new URLSearchParams({
      ...params,
      aToB: String(params.aToB),
    });
    return apiGet(`/api/swap/quote?${query}`);
  },

  execute: (body: {
    from: string;
    amountIn: string;
    minAmountOut: string;
    aToB: boolean;
    secretKey: string;
  }) => apiPost("/api/swap/execute", body),

  getPool: () => apiGet("/api/swap/pool"),
};

// ─── Lending API ──────────────────────────────────────────

export const lendingApi = {
  getPool: () => apiGet("/api/lending/pool"),
  getRates: () => apiGet("/api/lending/rates"),
  supply: (body: { amount: string; secretKey: string }) =>
    apiPost("/api/lending/supply", body),
  borrow: (body: { amount: string; collateralAmount: string; secretKey: string }) =>
    apiPost("/api/lending/borrow", body),
  getPosition: (address: string) => apiGet(`/api/lending/position/${address}`),
};
