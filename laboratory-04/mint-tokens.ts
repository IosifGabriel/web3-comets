import "dotenv/config";
import { getExplorerLink, getKeypairFromEnvironment } from "@solana-developers/helpers";
import { getOrCreateAssociatedTokenAccount, mintTo } from "@solana/spl-token";
import { Connection, LAMPORTS_PER_SOL, PublicKey, clusterApiUrl } from "@solana/web3.js";

const user = getKeypairFromEnvironment("SECRET_KEY");
const connection = new Connection(clusterApiUrl("devnet"), {
  commitment: "confirmed",
});

const recipient = new PublicKey('3STewRjENsPgumoftjyo1F6U8vFgtSLbhaSHYGzCzoYu');
const tokenMintAddress = new PublicKey("BSxuS9D8h3P51up1VyovVQL1NKnKuBUDDapPDAvXZCvR");
const tokenAccount = await getOrCreateAssociatedTokenAccount(
  connection,
  user,
  tokenMintAddress,
  recipient,
);

const link = getExplorerLink("address", tokenAccount.address.toString(), "devnet");

console.log({ link });

const mintTxSig = await mintTo(
  connection,
  user,
  tokenMintAddress,
  tokenAccount.address,
  user,
  100 * LAMPORTS_PER_SOL
);

const mintLink = getExplorerLink("transaction", mintTxSig, "devnet");

console.log({ mintLink });