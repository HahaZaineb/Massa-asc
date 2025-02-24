import { JsonRPCClient } from "@massalabs/massa-web3";
import { useEffect, useState } from "react";
import { MassaLogo } from "@massalabs/react-ui-kit";
import './App.css';

const sc_addr = "AS124rVgrcHK3W5knRCx168BQWfSVrUbFqFtwxF3xYJuxPf4CeWMf";

function App() {
  const [status, setStatus] = useState<string>("Waiting...");
  const client = JsonRPCClient.buildnet();

  useEffect(() => {
    const interval = setInterval(() => {
      checkExecution();
    }, 5000);

    return () => clearInterval(interval);
  }, [client]);

  async function checkExecution() {
    if (client) {
      try {
        const events = await client.getEvents({
          smartContractAddress: sc_addr,
        });

        console.log("Fetched Events:", events);

        const executed = events.some(event => event.data.includes("executeInFuture was triggered"));

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
    <div>
      <MassaLogo className="logo" size={100} />
      <h2>Autonomous Smart Contract Status:</h2>
      <h1>{status}</h1>
    </div>
  );
}

export default App;
