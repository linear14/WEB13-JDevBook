export interface GnbProps {
  type?: string;
}

export interface FlexProps {
  center?: boolean;
}

export interface TabProps {
  current?: boolean;
}

export interface IconProps {
  img: any;
}

export interface RightModalProps {
  [key: string]: boolean;
  rightModalFlag: boolean;
  messageFlag: boolean;
  alarmFlag: boolean;
  selectorFlag: boolean;
}

export interface Message {
  message?: string;
}
export interface SearchedUser {
  idx: number;
  nickname: string;
  profile: string;
}

export interface SearchedUserProps {
  user: SearchedUser;
}

export interface ProfilePhotoProps {
  src?: string;
  size?: string;
}

export interface SideBarProps {
  isLeft: boolean;
}

export interface HomePost {
  idx: number;
  useridx: number;
  secret: number;
  likenum: number;
  contents: string;
  picture1: string | null;
  picture2: string | null;
  picture3: string | null;
}

export interface PostProps {
  post: HomePost;
}
