import dbManager from '../service/dbManager';
import { Socket, Server } from 'socket.io';
import { addAssociation } from 'sequelize-typescript';

declare module 'socket.io' {
  interface Socket {
    name: string;
    get: boolean;
  }
}

const socketIO = (server: any) => {
  const io = new Server(server);
  io.on('connection', (socket: Socket) => {
    socket.on('name', (username: string) => {
      socket.name = username;
    });
    socket.on('send chat initial', async (receivedata) => {
      const { sender, receiver } = receivedata;
      const { senderidx, receiveridx, previousMsg } =
        await dbManager.getChatList(sender, receiver);

      const strmap: string[] = previousMsg.map((v, i) => {
        if (v.senderidx === senderidx) return `${sender}: ${v.content}`;
        else return `${receiver}: ${v.content}`;
      });
      io.to(socket.id).emit('get previous chats', strmap);
    });
    socket.on('send message', (receivedata) => {
      const { sender, receiver, message } = receivedata;
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
    socket.on('disconnect', () => {
      socket.get = false;
      console.log(`${socket.name}:${socket.id} disconnected`);
    });
  });

  //io.on("forceDisconnect")
  //io.on("disconnect")
};

export default socketIO;
