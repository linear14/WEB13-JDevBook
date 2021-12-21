const MINUTE = 60 * 1000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const WEEK = 7 * DAY;

const MONTH_NAME: string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];

const getConventionalHour = (hour: number): string => {
  if (hour < 12) {
    return `${hour}`;
  }
  if (hour === 12) {
    return '12';
  }
  if (hour < 23) {
    return `${hour - 12}`;
  } else {
    return '0';
  }
};

const textUtil = {
  timeToString: (targetDate: Date): string => {
    const target = new Date(targetDate.toString());
    const now = new Date();

    const [targetTime, nowTime] = [target.getTime(), now.getTime()];

    const diff = nowTime - targetTime;

    if (diff < MINUTE) {
      return '방금 전';
    }
    if (diff < HOUR) {
      return `${Math.floor(diff / MINUTE)}분 전`;
    }
    if (diff < DAY) {
      return `${Math.floor(diff / HOUR)}시간 전`;
    }
    if (diff < WEEK) {
      return `${Math.floor(diff / DAY)}일 전`;
    }
    if (target.getFullYear() !== now.getFullYear()) {
      return `${target.getFullYear()}년 ${MONTH_NAME[target.getMonth()]}월 ${target.getDate()}일`;
    } else {
      return `${MONTH_NAME[target.getMonth()]}월 ${target.getDate()}일 ${target.getHours() < 12 ? '오전' : '오후'} ${getConventionalHour(target.getHours())}시 ${target
        .getMinutes()
        .toString()
        .padStart(2, '0')}분`;
    }
  },

  getByteLength: (s: string) => {
    let b = 0;
    let i = 0;
    let c = 0;

    for (b = i = 0; (c = s.charCodeAt(i++)); b += c >> 11 ? 3 : c >> 7 ? 2 : 1);
    return b;
  }
};

export default textUtil;
