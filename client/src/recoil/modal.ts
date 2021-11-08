import socket from '../components/common/Socket';
import { atom } from 'recoil';
import { Socket } from 'socket.io-client';

export const modalVisibleStates = atom({
  key: 'modalVisibleState',
  default: {
    searchUser: false
  }
});

// typescript 답게 타입 설정...
export const userData = atom({
  key: 'userData',
  default: {
    idx: -1,
    name: '',
    profile: '' as string,
    cover: '' as string,
    bio: '' as string,
    login: false
    // CUD는 필요할 때 DB에서 쓰자.
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
