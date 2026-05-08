import { NextRequest, NextResponse } from "next/server";
import { getConnection, verifyTransaction, type NetworkName } from "@/lib/solana";

export const dynamic = "force-dynamic";

// Standalone verification endpoint
// POST { signature, recipient, amount, network }
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { signature, recipient, amount, network = "devnet" } = body;

    if (!signature || !recipient || !amount) {
      return NextResponse.json(
        { error: "Missing required fields: signature, recipient, amount" },
        { status: 400 }
      );
    }

    const connection = getConnection(network as NetworkName);
    const result = await verifyTransaction(connection, signature, recipient, amount);

    return NextResponse.json({
      verified: result.valid,
      error: result.error || null,
      signature,
      network,
    });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: msg },
      { status: 500 }
    );
  }
}
