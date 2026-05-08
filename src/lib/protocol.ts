// Solgateskit Protocol Constants
// HTTP 402 Payment Required - header specification

export const HEADERS = {
  // Server → Client (in 402 response)
  PAYMENT_REQUEST: "X-Payment-Request", // JSON: { amount, recipient, network, memo }
  
  // Client → Server (in retry request)  
  PAYMENT_RECEIPT: "X-Payment-Receipt", // Transaction signature
  PAYMENT_NETWORK: "X-Payment-Network", // devnet | testnet | mainnet
} as const;

export interface PaymentRequest {
  amount: number;       // Amount in SOL
  recipient: string;    // Solana wallet address (base58)
  network: string;      // devnet | testnet | mainnet
  memo?: string;        // Optional memo/description
  expires?: number;     // Unix timestamp when payment request expires
}

export interface PaymentReceipt {
  signature: string;    // Solana transaction signature
  network: string;      // Network where tx was submitted
  payer: string;        // Payer's public key
}

// Parse payment request from 402 response header
export function parsePaymentRequest(headerValue: string): PaymentRequest | null {
  try {
    return JSON.parse(headerValue);
  } catch {
    return null;
  }
}

// Create payment request header value
export function createPaymentRequest(req: PaymentRequest): string {
  return JSON.stringify(req);
}

// Default gate config
export const DEFAULT_GATE_CONFIG = {
  amount: 0.001,  // 0.001 SOL per request
  network: "devnet" as const,
  memo: "Solgateskit API payment",
};
