import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const App = () => {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');

  useEffect(() => {
    // Connect to the Socket.IO server
    const socketConnection = io('http://localhost:3000');

    // Save socket instance to state
    setSocket(socketConnection);

    // Listen for messages from the server
    socketConnection.on('message', (msg) => {
      setResponse(msg);
    });

    // Cleanup on component unmount
    return () => {
      socketConnection.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (socket) {
      // Emit a message to the server
      socket.emit('message', message);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Socket.IO Chat</h1>
      <div>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message"
        />
        <button onClick={sendMessage}>Send</button>
      </div>
      <div>
        <h2>Response from server:</h2>
        <p>{response}</p>
      </div>
    </div>
  );
};

export default App;
