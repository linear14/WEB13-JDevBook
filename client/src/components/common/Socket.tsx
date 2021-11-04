const io = require('socket.io-client');
const socket = io.connect("http://localhost:4000");

export default socket;