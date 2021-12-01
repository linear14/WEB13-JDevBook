import { atom } from 'recoil';

import { ISolvedProblem } from 'types/problem';
import { IProfile, SolvedRates } from 'types/user';

export const userDataStates = atom({
  key: 'userData',
  default: {
    idx: -1,
    name: '',
    profile: '' as string,
    cover: '' as string,
    bio: '' as string,
    login: false
  }
});

export const profileState = atom<IProfile>({
  key: 'profileState',
  default: {
    idx: 0,
    nickname: '',
    cover: null,
    bio: null
  }
});

export const myJoinedGroupState = atom<number[] | null>({
  key: 'myJoinedGroup',
  default: null
});

export const solvedProblemState = atom<ISolvedProblem[]>({
  key: 'solvedProblem',
  default: []
});

export const rateState = atom<SolvedRates>({
  key: 'rateState',
  default: {
    prevRate: 0,
    solvedRate: 0,
    totalProblemsCount: 0
  }
});
