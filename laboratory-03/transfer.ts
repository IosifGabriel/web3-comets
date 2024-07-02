import "dotenv/config";
import { getKeypairFromEnvironment } from "@solana-developers/helpers";
import { 
    Connection, 
    LAMPORTS_PER_SOL, 
    PublicKey, 
    clusterApiUrl, 
    sendAndConfirmTransaction, 
    SystemProgram, 
    Transaction 
} from "@solana/web3.js";

import { createMemoInstruction } from "@solana/spl-memo";

const sender = getKeypairFromEnvironment("SECRET_KEY");
console.log("Sender address: ", sender.publicKey.toBase58());

const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
const receiver = new PublicKey("FB9PZQhyY1mK7yxVjpKAH4o8Yd9zsdU3hiUCfs2LPuzL");

async function main() {
    const balance = await connection.getBalance(receiver);
    console.log("Receiver balance before: ", balance / LAMPORTS_PER_SOL);

    const transaction = new Transaction();

    const transferInstruction = SystemProgram.transfer({
        fromPubkey: sender.publicKey,
        toPubkey: receiver,
        lamports: 0.001 * LAMPORTS_PER_SOL,
    });

    transaction.add(transferInstruction);

    const memo = "Hello from Solana";
    const memoInstruction = createMemoInstruction(memo);
    transaction.add(memoInstruction);

    const signature = await sendAndConfirmTransaction(connection, transaction, [sender]);
    const balanceAfter = await connection.getBalance(receiver);
    console.log("Receiver balance after: ", balanceAfter / LAMPORTS_PER_SOL);
    console.log("Transaction signature: ", signature);
}

main().catch(err => {
    console.error(err);
});