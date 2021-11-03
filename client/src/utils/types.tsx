type GnbProps = {
  type?: string;
};

type FlexProps = {
  center?: boolean;
};

type TabProps = {
  current?: boolean;
};

type IconProps = {
  img: any;
};

type RightModalProps = {
  [key: string]: boolean;
  rightModalFlag: boolean;
  messageFlag: boolean;
  alarmFlag: boolean;
  selectorFlag: boolean;
};

type Message = {
  message?: string;
};

export type {
  GnbProps,
  FlexProps,
  TabProps,
  IconProps,
  RightModalProps,
  Message
};
