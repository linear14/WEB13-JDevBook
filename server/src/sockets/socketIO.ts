import dbManager from '../service/dbManager'; // 왜 절대경로 안되지
import { Socket, Server } from 'socket.io';
import { IUserSocket } from '../types/interface';

const UserObj: IUserSocket = {};

const socketIO = (server: any) => {
  const io = new Server(server);
  io.on('connection', (socket: Socket) => {
    // socket.on('name', (username: string) => {
    //   socket.name = username;
    // });
    socket.on(
      'login notify',
      async (userData: { socketId: string; userName: string }) => {
        UserObj[userData.socketId] = userData.userName;
        io.emit('get current users', UserObj);
      }
    );

    socket.on('send chat initial', async (receivedData) => {
      const { sender, receiver } = receivedData;
      socket.name = sender;

      const { senderidx, receiveridx, previousMsg } =
        await dbManager.getChatList(sender, receiver);

      const filteredMsgs: string[] = previousMsg.map((msg) => {
        if (msg.senderidx === senderidx) return `${sender}: ${msg.content}`;
        else return `${receiver}: ${msg.content}`; // msg.senderidx === receiveridx
      });

      io.to(socket.id).emit('get previous chats', filteredMsgs);
    });

    socket.on('send message', (receivedData) => {
      const { sender, receiver, message } = receivedData;

      if (socket.name === sender || socket.name === receiver) {
        const msg: string = `${sender}: ${message}`;
        dbManager.setChatList(sender, receiver, message); // await 안써줘도 될듯?

        io.emit('receive message', {
          sender: sender,
          receiver: receiver,
          msg: msg
        });
      }
    });

    socket.on('post_added', () => {
      socket.broadcast.emit('post_added');
    });

    socket.on('disconnect', () => {
      socket.get = false;
      delete UserObj[socket.id];
      io.emit('get current users', UserObj);
      console.log(`${socket.name}:${socket.id} disconnected`);
    });
  });

  //io.on("forceDisconnect")
  //io.on("disconnect")
};

export default socketIO;
