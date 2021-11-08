const MINUTE = 60 * 1000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const WEEK = 7 * DAY;

const MONTH_NAME: string[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

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

    // DB 문제로 인해 임시조치.. DB에 들어가는 값이 정확하면 해결됨!
    const diff = nowTime - targetTime + 15 * WEEK;

    if (diff < 0) {
      return 'Something wrong';
    }
    if (diff < MINUTE) {
      return 'just now';
    }
    if (diff < HOUR) {
      return `${Math.floor(diff / MINUTE)}m`;
    }
    if (diff < DAY) {
      return `${Math.floor(diff / HOUR)}h`;
    }
    if (diff < WEEK) {
      return `${Math.floor(diff / DAY)}d`;
    }
    if (target.getFullYear() !== now.getFullYear()) {
      return `${
        MONTH_NAME[target.getMonth()]
      } ${target.getDate()}, ${target.getFullYear()}`;
    } else {
      return `${
        MONTH_NAME[target.getMonth()]
      } ${target.getDate()} at ${getConventionalHour(
        target.getHours()
      )}:${target.getMinutes().toString().padStart(2, '0')} ${
        target.getHours() < 12 ? 'AM' : 'PM'
      }`;
    }
  }
};

export default textUtil;
