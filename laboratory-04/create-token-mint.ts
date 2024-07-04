import "dotenv/config";
import { getExplorerLink, getKeypairFromEnvironment } from "@solana-developers/helpers";
import { createMint } from "@solana/spl-token";
import { Connection, clusterApiUrl } from "@solana/web3.js";

const user = getKeypairFromEnvironment("SECRET_KEY");
const connection = new Connection(clusterApiUrl("devnet"));

const tokenMint = await createMint(
  connection,
  user,
  user.publicKey,
  user.publicKey,
  9
);

const link = getExplorerLink("address", tokenMint.toString(), "devnet");

console.log({ link });