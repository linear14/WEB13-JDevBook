import socket from '../components/common/Socket';
import { atom } from 'recoil';
import { Socket } from 'socket.io-client';

export const modalVisibleStates = atom({
  key: 'modalVisibleState',
  default: {
    searchUser: false
  }
});

export const userData = atom({
  key: 'userData',
  default: {
    username: '',
    login: false
  }
});

export const rightModalStates = atom({
  key: 'rightModalState',
  default: {
    rightModalFlag: false,
    messageFlag: false,
    alarmFlag: false,
    selectorFlag: false
  }
});

export const usersocket = atom({
  key: 'socket',
  default: socket as Socket
});
