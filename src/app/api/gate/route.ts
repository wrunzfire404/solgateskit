import { NextRequest, NextResponse } from "next/server";
import { getConnection, verifyTransaction, type NetworkName } from "@/lib/solana";
import { HEADERS, createPaymentRequest } from "@/lib/protocol";

// This is the demo "gated" API endpoint.
// It demonstrates the 402 flow:
// 1. First request → 402 with payment terms
// 2. Second request with payment receipt → verify → 200 with data

// Server wallet that receives payments (devnet)
const SERVER_WALLET = process.env.SERVER_WALLET || "11111111111111111111111111111111";
const GATE_AMOUNT = 0.001; // 0.001 SOL per request

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  // Check if client provided a payment receipt
  const receiptSignature = request.headers.get(HEADERS.PAYMENT_RECEIPT);
  const paymentNetwork = (request.headers.get(HEADERS.PAYMENT_NETWORK) || "devnet") as NetworkName;

  // No payment receipt → return 402 Payment Required
  if (!receiptSignature) {
    const paymentRequest = createPaymentRequest({
      amount: GATE_AMOUNT,
      recipient: SERVER_WALLET,
      network: paymentNetwork,
      memo: "Solgateskit demo API access",
      expires: Math.floor(Date.now() / 1000) + 300, // 5 min expiry
    });

    return new NextResponse(
      JSON.stringify({
        error: "Payment Required",
        message: "This endpoint requires payment. Send SOL to the specified address and retry with the transaction signature.",
        payment: JSON.parse(paymentRequest),
      }),
      {
        status: 402,
        headers: {
          "Content-Type": "application/json",
          [HEADERS.PAYMENT_REQUEST]: paymentRequest,
        },
      }
    );
  }

  // Payment receipt provided → verify on-chain
  try {
    const connection = getConnection(paymentNetwork);
    const verification = await verifyTransaction(
      connection,
      receiptSignature,
      SERVER_WALLET,
      GATE_AMOUNT
    );

    if (!verification.valid) {
      return NextResponse.json(
        {
          error: "Payment verification failed",
          detail: verification.error,
        },
        { status: 402 }
      );
    }

    // Payment verified! Return the gated data
    return NextResponse.json({
      success: true,
      message: "Payment verified. Access granted.",
      data: {
        timestamp: Date.now(),
        quote: "The future of API monetization is on-chain.",
        txVerified: receiptSignature,
        network: paymentNetwork,
      },
    });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Verification error";
    return NextResponse.json(
      { error: "Payment verification error", detail: msg },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  // POST also supports the same flow for flexibility
  return GET(request);
}
