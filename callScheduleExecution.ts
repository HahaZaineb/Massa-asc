import { Account, Args, SmartContract, JsonRpcProvider } from '@massalabs/massa-web3';
import 'dotenv/config';

async function main() {
    const account = await Account.fromEnv();
    const provider = JsonRpcProvider.buildnet(account);
    const contractAddress = 'AS12fmwBeNCw1svhrqSVDHiwcwsgUeQckS5FVW1zcG13cmBz4zzpN'; // Replace with your deployed contract address
    const contract = new SmartContract(provider, contractAddress);
    const balance = await provider.balance();
    console.log('Balance:', balance);
    

    const maxGas = 4294167295n;
    const fee = 5000000000n;  // Increase fee arbitrarily to see if there's another issue
    

    // Call the scheduleExecution function with the manually set gas limit and fee
    await contract.call('scheduleExecution', new Args(), { maxGas, fee });
    console.log('Scheduled execution of the function.');

    // Fetch and display the logs
    const events = await provider.getEvents({
        smartContractAddress: contractAddress,
    });

    for (const event of events) {
        console.log('Event message:', event.data);
    }
}

main().catch(console.error);