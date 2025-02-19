import { call, Context, sendMessage, Address, generateEvent } from "@massalabs/massa-as-sdk";
import { currentPeriod } from '@massalabs/massa-as-sdk/assembly/std/context';
// Function that will be executed in the future
export function executeInFuture(): void {
    generateEvent("executeInFuture was triggered");
    
}   
  
// Function to schedule execution
export function scheduleExecution(_: StaticArray<u8>): void {
    const address = Context.callee();
    const functionName = 'executeInFuture';
    const validityStartPeriod = currentPeriod() + 1;
    const validityStartThread = 0 as u8;
    const validityEndPeriod = validityStartPeriod;
    const validityEndThread = 31 as u8;

    const maxGas = 500_000_000; // gas for smart contract execution
    const rawFee = 200_000;
    const coins = 0;


    sendMessage(
        address,
        functionName,
        validityStartPeriod,
        validityStartThread,
        validityEndPeriod,
        validityEndThread,
        maxGas,
        rawFee,
        coins,
        [],
      );
      generateEvent(
        `next update planned on period ${validityStartPeriod.toString()} thread: ${validityStartThread.toString()}`,
      );

}
