import { io } from 'socket.io-client';

const socket = io('http://localhost:5001', {
  transports: ['websocket'],
});

socket.on('connect', () => {
  console.log('Successfully connected to WebSocket server');
});

socket.on('connect_error', (err) => {
  console.error('Connection failed:', err.message);
});

export default socket;
