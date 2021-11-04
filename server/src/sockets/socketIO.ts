import { Socket } from 'socket.io';

const socketIO = (server: any) => {
  const io = require('socket.io')(server);

  io.on('connection', (socket: Socket) => {
    console.log(`socket 연결 ${socket.id}`);
    socket.on('send message', (item: { message: string }) => {
      io.emit('receive message', { message: item.message });
    });
  });

  //io.on("forceDisconnect")
};

export default socketIO;
