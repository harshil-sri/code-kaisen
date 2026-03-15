import {io} from 'socket.io-client';

const socket = io('http://localhost:3001');
function App() {
  const SendPing = () => {
    socket.emit('client_ping');
  };
  return (
    <div>
      <h1> Code Kaisen Arena!</h1>
      <button onClick ={sendPing}>
        Send Ping to Server
      </button>
    </div>
  );
}
export default App;