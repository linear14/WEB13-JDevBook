import { atom } from 'recoil';

export const modalVisibleStates = atom({
  key: 'modalVisibleState',
  default: {
    searchUser: false
  }
});
