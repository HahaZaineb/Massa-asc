import { call, Context, sendMessage, Address, generateEvent } from "@massalabs/massa-as-sdk";

// Function that will be executed in the future
export function executeInFuture(): void {
    console.log("Autonomous Execution: This function ran in the future!");
    
}   

// Function to schedule execution
export function scheduleExecution(_: StaticArray<u8>): void {
    let delayInSeconds: u64 = 180; // Change this to set a different delay
    let executionPeriod: u64 = Context.currentPeriod() + delayInSeconds;
    let executionThread: u8 = Context.currentThread();

    sendMessage(
        Context.callee(),  // Target contract (itself)
        "executeInFuture", // Function to execute
        executionPeriod,   // When to execute
        executionThread,   // Thread to use
        executionPeriod,   // Unique identifier for scheduling
        executionThread,   // Same thread
        u64(50_000_000),
        u64(1_000_000),      
        u64(0),            // No additional coins
        new StaticArray<u8>(0), // No arguments needed
        new Address("0"),  // No filter
        new StaticArray<u8>(0) // No filter key
    );
}
