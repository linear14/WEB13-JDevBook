import socket from 'components/common/Socket';
import { atom } from 'recoil';
import { Socket } from 'socket.io-client';

import { IGroup } from 'types/group';
import { SolvedRates, IProfile } from 'types/user';
import { ISolvedProblem } from 'types/problem';

export const usersocketStates = atom({
  key: 'socket',
  default: socket as Socket
  //default: null as Socket | null
});

export const chatWith = atom({
  key: 'getReceiver',
  default: '' as string
});

export const CommentState = atom({
  key: 'commentsFlag',
  default: false as boolean
});

export const GroupNavState = atom({
  key: 'GroupNavState',
  default: {
    about: true,
    problem: false,
    groupChat: false
  }
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

export const myJoinedGroupState = atom<number[] | null>({
  key: 'myJoinedGroup',
  default: null
});

export const groupListState = atom<IGroup[]>({
  key: 'groupListState',
  default: []
});

export const groupState = atom<IGroup>({
  key: 'groupState',
  default: {
    idx: 0,
    title: '',
    description: '',
    cover: ''
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

export const usersNumState = atom<number>({
  key: 'number of usres',
  default: 0
});
