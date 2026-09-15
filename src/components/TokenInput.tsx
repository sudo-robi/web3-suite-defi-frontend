import { useState } from "react";
import { ChevronDown } from "lucide-react";

export interface Token {
  symbol: string;
  name: string;
  address: string;
  icon?: string;
}

interface TokenInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  selectedToken: Token;
  onTokenSelect: (token: Token) => void;
  tokens: Token[];
  balance?: string;
  readOnly?: boolean;
  disabled?: boolean;
}

export function TokenInput({
  label,
  value,
  onChange,
  selectedToken,
  onTokenSelect,
  tokens,
  balance,
  readOnly = false,
  disabled = false,
}: TokenInputProps) {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="stat-label">{label}</span>
        {balance !== undefined && (
          <span className="stat-label">
            Balance: {balance}
          </span>
        )}
      </div>

      <div className="flex items-center gap-3">
        <input
          type="text"
          inputMode="decimal"
          placeholder="0.0"
          value={value}
          onChange={(e) => {
            const v = e.target.value;
            if (v === "" || /^\d*\.?\d*$/.test(v)) {
              onChange(v);
            }
          }}
          readOnly={readOnly}
          disabled={disabled}
          className="input-field flex-1 font-mono text-2xl"
        />

        <div className="relative">
          <button
            onClick={() => !readOnly && setShowDropdown(!showDropdown)}
            disabled={readOnly}
            className={`flex items-center gap-2 rounded-xl bg-gray-800 px-4 py-3 font-semibold transition-colors ${
              readOnly ? "cursor-default" : "hover:bg-gray-700"
            }`}
          >
            {selectedToken.symbol}
            {!readOnly && <ChevronDown className="h-4 w-4 text-gray-400" />}
          </button>

          {showDropdown && !readOnly && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setShowDropdown(false)}
              />
              <div className="absolute right-0 top-full z-50 mt-2 w-56 rounded-xl border border-gray-700 bg-gray-800 py-1 shadow-xl">
                {tokens.map((token) => (
                  <button
                    key={token.address}
                    onClick={() => {
                      onTokenSelect(token);
                      setShowDropdown(false);
                    }}
                    className={`flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-gray-700 ${
                      token.address === selectedToken.address
                        ? "bg-stellar-600/20 text-stellar-400"
                        : "text-gray-200"
                    }`}
                  >
                    <span className="font-semibold">{token.symbol}</span>
                    <span className="text-sm text-gray-400">{token.name}</span>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
