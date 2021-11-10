import socket from '../components/common/Socket';
import { atom } from 'recoil';
import { Socket } from 'socket.io-client';

import { PostData } from 'utils/types';

export const modalVisibleStates = atom({
  key: 'modalVisibleState',
  default: {
    searchUser: false,
    postWriter: false,
    postInPhoto: false
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

export const postWriterData = atom<PostData>({
  key: 'postWriterData',
  default: {
    userId: -1,
    secret: 0,
    likenum: 0,
    contents: '',
    picture1: null,
    picture2: null,
    picture3: null
  }
});
