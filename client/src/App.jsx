import {io} from 'socket.io-client';
import { useState, useEffect } from 'react';
function App() {
  const socket = io('http://localhost:3001');
const [serverMessage, setServerMessage] = useState("");

useEffect( () => {
  socket.on('server_pong', (data) => {
    setServerMessage(data);
  });
  return () => socket.off('server_pong');
}, []);
  const SendPing = () => {
    socket.emit('client_ping');
  };
  return (
    <div>
      <h1> Code Kaisen Arena!</h1>
      <button onClick ={SendPing}>
        Send Ping to Server
      </button>
      <h2>Server says: {serverMessage}</h2>
    </div>
  );
}
export default App;