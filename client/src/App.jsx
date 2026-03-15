import {io} from 'socket.io-client';
import { useState, useEffect } from 'react';
const socket = io('http://localhost:3001');
function App() {
  const [serverMessage, setServerMessage] = useState("");
  const [roomName, setRoomName] = useState("");

  useEffect( () => {
    socket.on('server_damage', (data) => {
      setServerMessage(data);
    });
  return () => socket.off('server_damage');
}, []);
  const joinRoom = () => {
    if (roomName !== ""){
      socket.emit('join_domain', roomName);
    }
  };
  const sendAttack = () => {
    socket.emit('client_attack', roomName);
  };
  return (
    <div>
      <h1> Code Kaisen Arena!</h1>
      <input type="text" placeholder="Type Room Name" onChange={(e) => setRoomName(e.target.value)} />
      <button onClick = {sendAttack}>Attack!</button>
      <button onClick = {joinRoom}>Join Domain!</button>
      <h2>Server says: {serverMessage}</h2>
    </div>
  );
}
export default App;