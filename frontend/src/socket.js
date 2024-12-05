import { io } from 'socket.io-client';

const socketUrl = 'http://localhost:5001';

const socket = io(socketUrl, {
  reconnectionAttempts: 5,
  timeout: 10000,
});

export default socket;
