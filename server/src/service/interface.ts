declare module 'express-session' {
  interface Session {
    username: string;
    useridx: number;
    jwt: string;
  }
}

export interface DBUser {
  idx: number;
  nickname: string;
  profile: string;
  cover: string;
  bio: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

export interface DBUserGroup {
  idx: number;
  useridx: number;
  groupidx: number;
}

export interface Group {
  idx: number;
  title: string;
  description: string;
  cover: string;
}

export interface Chat {
  idx: number;
  senderidx: number;
  receiveridx: number;
  content: string;
}