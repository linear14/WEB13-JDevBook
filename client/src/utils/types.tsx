export interface GnbProps {
  type?: string;
  rightModalType?: string;
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
  children: React.ReactNode;
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
  createdAt: Date;
  BTUseruseridx: {
    bio: string | null;
    idx: number;
    nickname: string;
    profile: string | null;
  };
}

export interface PostProps {
  post: HomePost;
}

export interface PostHeaderProps {
  nickname: string;
  profile: string | null;
  createdAt: Date;
}

export interface PostBodyProps {
  contents: string;
  picture1: string | null;
  picture2: string | null;
  picture3: string | null;
}

export interface PostFooterProps {
  likenum: number;
}

export interface PostImageInfo {
  url: string;
  originalWidth: number;
  originalHeight: number;
}

export interface PostImageBoxProps {
  imageCount: number;
  images: PostImageInfo[] | null;
}

export interface PostImageBoxStyle {
  width: number;
  height: number;
  leftBorder?: boolean;
  rightBorder?: boolean;
  topBorder?: boolean;
  bottomBorder?: boolean;
}
