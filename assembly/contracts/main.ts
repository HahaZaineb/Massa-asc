import { call, Context, sendMessage, Address, generateEvent } from "@massalabs/massa-as-sdk";
import { currentPeriod } from '@massalabs/massa-as-sdk/assembly/std/context';

export function constructor(_: StaticArray<u8>): void {
    generateEvent("Contract deployed! Triggering first execution...");
    scheduleExecution(new StaticArray<u8>(0)); 
}

// Function that will be executed in the future
export function executeInFuture(): void {
    generateEvent("executeInFuture was triggered");    
}   
  
// Function to schedule execution
export function scheduleExecution(_: StaticArray<u8>): void {
    const delayInSeconds: u64 = 60;
    const delayInPeriods: u64 = delayInSeconds / 16;
    const executionPeriod: u64 = Context.currentPeriod() + delayInPeriods;
    const executionThread: u8 = Context.currentThread();
    

    sendMessage(
        Context.callee(),  // Target contract (itself)
        "executeInFuture", // Function to execute
        executionPeriod,   // When to execute
        executionThread,   // Thread to use
        executionPeriod,   // Unique identifier for scheduling
        executionThread,   // Same thread
        u64(50_000_000),  //maxgas
        u64(200_000),     //fee  
        u64(0),            // No additional coins
        new StaticArray<u8>(0) // No filter key
    );
    //sendMessage(
      //  address,
      //  functionName,
      //  validityStartPeriod,
      //  validityStartThread,
      //  validityEndPeriod,
      //  validityEndThread,
      //  maxGas,
      //  rawFee,
      //  coins,
      //  []
      //);
    
}
