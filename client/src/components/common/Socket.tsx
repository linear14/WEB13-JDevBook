import { io } from 'socket.io-client';

const host: string = '/';

const socket = io(host);

export default socket;
