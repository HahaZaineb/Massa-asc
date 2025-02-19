import { JsonRPCClient } from "@massalabs/massa-web3";
import { useEffect, useState } from "react";
import { MassaLogo } from "@massalabs/react-ui-kit";
import './App.css';


const sc_addr = "AS1TZbupC4Dcx3EkXhU8EVhNhzgRbtP1ZYR6tvA5ocKnmwkgUJq"; 

function App() {
  const [status, setStatus] = useState<string>("Waiting...");

  const client = JsonRPCClient.buildnet();

  useEffect(() => {
    checkExecution();
  }, []); 

  async function checkExecution() {
    if (client) {
      try {
        
        const events = await client.getEvents({
          smartContractAddress: sc_addr,
        });

        const executed = events.some(event => event.data.includes("Autonomous Execution: This function ran in the future!"));

        if (executed) {
          setStatus("Executed! Check logs.");
        } else {
          setStatus("Not executed yet.");
        }
      } catch (error) {
        console.error("Error checking contract execution:", error);
        setStatus("Error checking execution.");
      }
    }
  }

  
  return (
    <>
      <div>
        <MassaLogo className="logo" size={100} />
        <h2>Autonomous Smart Contract Status:</h2>
        <h1>{status}</h1>
      </div>
    </>
  );
}

export default App;
