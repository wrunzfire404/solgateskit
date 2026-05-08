import {
  Connection,
  Keypair,
  PublicKey,
  Transaction,
  SystemProgram,
  LAMPORTS_PER_SOL,
  sendAndConfirmTransaction,
} from "@solana/web3.js";

// Network endpoints
export const NETWORKS = {
  devnet: "https://api.devnet.solana.com",
  testnet: "https://api.testnet.solana.com",
  mainnet: "https://api.mainnet-beta.solana.com",
} as const;

export type NetworkName = keyof typeof NETWORKS;

// Default config
const DEFAULT_NETWORK: NetworkName = "devnet";

// Get connection for a network
export function getConnection(network: NetworkName = DEFAULT_NETWORK): Connection {
  return new Connection(NETWORKS[network], "confirmed");
}

// Generate ephemeral keypair
export function generateKeypair(): Keypair {
  return Keypair.generate();
}

// Request airdrop (devnet/testnet only)
export async function requestAirdrop(
  connection: Connection,
  publicKey: PublicKey,
  amount: number = 2
): Promise<string> {
  const signature = await connection.requestAirdrop(
    publicKey,
    amount * LAMPORTS_PER_SOL
  );
  await connection.confirmTransaction(signature, "confirmed");
  return signature;
}

// Transfer SOL
export async function transferSOL(
  connection: Connection,
  from: Keypair,
  to: PublicKey,
  amountSOL: number
): Promise<string> {
  const transaction = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: from.publicKey,
      toPubkey: to,
      lamports: Math.round(amountSOL * LAMPORTS_PER_SOL),
    })
  );

  const signature = await sendAndConfirmTransaction(connection, transaction, [from]);
  return signature;
}

// Verify a transaction on-chain
export async function verifyTransaction(
  connection: Connection,
  signature: string,
  expectedRecipient: string,
  expectedAmountSOL: number
): Promise<{ valid: boolean; error?: string }> {
  try {
    const tx = await connection.getTransaction(signature, {
      commitment: "confirmed",
      maxSupportedTransactionVersion: 0,
    });

    if (!tx) {
      return { valid: false, error: "Transaction not found" };
    }

    if (tx.meta?.err) {
      return { valid: false, error: "Transaction failed on-chain" };
    }

    // Check the transaction is recent (within last 5 minutes)
    const now = Math.floor(Date.now() / 1000);
    const txTime = tx.blockTime || 0;
    if (now - txTime > 300) {
      return { valid: false, error: "Transaction too old (>5 min)" };
    }

    // Verify recipient received the expected amount
    const accountKeys = tx.transaction.message.getAccountKeys();
    const recipientIndex = accountKeys.staticAccountKeys.findIndex(
      (key) => key.toBase58() === expectedRecipient
    );

    if (recipientIndex === -1) {
      return { valid: false, error: "Recipient not found in transaction" };
    }

    const preBalance = tx.meta?.preBalances[recipientIndex] || 0;
    const postBalance = tx.meta?.postBalances[recipientIndex] || 0;
    const received = (postBalance - preBalance) / LAMPORTS_PER_SOL;

    if (received < expectedAmountSOL * 0.99) {
      return { valid: false, error: `Insufficient payment: received ${received} SOL, expected ${expectedAmountSOL} SOL` };
    }

    return { valid: true };
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Unknown error";
    return { valid: false, error: msg };
  }
}

// Get balance
export async function getBalance(
  connection: Connection,
  publicKey: PublicKey
): Promise<number> {
  const balance = await connection.getBalance(publicKey);
  return balance / LAMPORTS_PER_SOL;
}
