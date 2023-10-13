import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
// const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:3000';
const URL = "http://localhost:3000"
export const socket = io(URL, {
    'reconnection': true,
    'reconnectionDelay': 500,
    'reconnectionAttempts': 10
  });
