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

export const chatWith = atom({
  key: 'getReceiver',
  default: '' as string
});

export const imageViewerState = atom<{
  isOpen: boolean;
  imageCount: number;
  currentIdx: number;
  images: (string | never)[];
}>({
  key: 'imageViewerState',
  default: {
    isOpen: false,
    imageCount: 0,
    currentIdx: 0,
    images: []
  }
});
