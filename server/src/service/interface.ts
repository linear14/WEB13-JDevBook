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

export interface DBGroup {
  idx: number;
  title: string;
  description: string;
  cover: string;
}

export interface DBChat {
  idx: number;
  senderidx: number;
  receiveridx: number;
  content: string;
}

export interface DBPost {
  idx: number;
  useridx: number;
  secret: boolean;
  likenum: number;
  contents: string;
  picture1: string;
  picture2: string;
  picture3: string;
}

export interface DBLike {
  idx: number;
  useridx: number;
  postidx: number;
}

export interface DBComment {
  idx: number;
  postidx: number;
  useridx: number;
  comments: string;
}

export interface DBAlarm {
  idx: number;
  useridx: number;
  message: string;
}