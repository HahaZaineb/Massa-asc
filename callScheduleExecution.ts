import { Account, Args, SmartContract, JsonRpcProvider } from '@massalabs/massa-web3';
import 'dotenv/config';

async function main() {
    const account = await Account.fromEnv();
    const provider = JsonRpcProvider.buildnet(account);
    const contractAddress = 'AS1cTbLw8kCjAZxqvbQ1vpYVEvQtpLzubdaUiouVvCY8i6LEPJw8'; 
    const contract = new SmartContract(provider, contractAddress);
    const balance = await provider.balance();
    console.log('Balance:', balance);
 
    
    const maxGas = 4294167295n;
    const fee = 5000000000n;  
        
    await contract.call('scheduleExecution', new Args(), { maxGas, fee });
    console.log('Scheduled execution of the function.');

    const events = await provider.getEvents({
        smartContractAddress: contractAddress,
    });

    for (const event of events) {
        console.log('Event message:', event.data);
    }
}

main().catch(console.error);