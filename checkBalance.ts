import { Account, JsonRpcProvider } from '@massalabs/massa-web3';
import 'dotenv/config';

async function main() {
    const account = await Account.fromEnv();
    const provider = JsonRpcProvider.buildnet(account);

    const balance = await provider.balance();
    console.log(`Wallet balance: ${balance}`);
}

main().catch(console.error);