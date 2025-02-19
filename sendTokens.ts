import { Account, JsonRpcProvider, Address, Mas } from '@massalabs/massa-web3';
import 'dotenv/config';

async function main() {
    const account = await Account.fromEnv();
    const provider = JsonRpcProvider.buildnet(account);
    const contractAddress = 'AS12C66vXH78jQC9N31XAEkWW4rYANqekRqDkePVf1MN49ics9SnC'; // Replace with your contract address

    // Define the amount of tokens to send (in smallest unit, e.g., nanoMassa)
    const amount = Mas.fromNanoMas(1000000000n); // 1 Massa (assuming 1 Massa = 1,000,000,000 nanoMassa)

    // Send tokens to the contract address
    const operation = await provider.transfer(contractAddress, amount, {
        fee: Mas.fromNanoMas(1000000n), // Define an appropriate fee
    });

    console.log(`Transaction hash: ${operation.id}`);
}

main().catch(console.error);