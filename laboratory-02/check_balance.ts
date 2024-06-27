import "dotenv/config";
import { Connection,
        LAMPORTS_PER_SOL,
        PublicKey,
        clusterApiUrl,
} from "@solana/web3.js";


const connection = new Connection(clusterApiUrl("devnet"));

console.log("Checking balance of the account...");

const address = "3STewRjENsPgumoftjyo1F6U8vFgtSLbhaSHYGzCzoYu";
const publicKey = new PublicKey(address);

const balanceInLamport = await connection.getBalance(publicKey);

console.log(`Balance of the account is ${balanceInLamport} lamports`);


console.log('Wanting aidrop')

const aidropSignature = await connection.requestAirdrop( 
                        publicKey,
                        LAMPORTS_PER_SOL
                        );

await connection.confirmTransaction(aidropSignature);

console.log('Airdrop completed');

const balanceInLamportAfterAidrop = await connection.getBalance(publicKey);

console.log(`Balance of the account is ${balanceInLamport} lamports`);