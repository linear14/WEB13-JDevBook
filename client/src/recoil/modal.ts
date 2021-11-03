import { atom } from 'recoil';

export const modalVisibleStates = atom({
  key: 'modalVisibleState',
  default: {
    searchUser: false
  }
});

export const userData = atom({
  key: 'userData',
  default: {
    username: ''
  }
})
