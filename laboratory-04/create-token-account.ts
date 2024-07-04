import "dotenv/config";
import { getExplorerLink, getKeypairFromEnvironment } from "@solana-developers/helpers";
import { getOrCreateAssociatedTokenAccount } from "@solana/spl-token";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";

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