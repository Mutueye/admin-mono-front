/** 时间单位：天、时、分 */
export const timeUnits = [
  { value: 'day', title: '天' },
  { value: 'hour', title: '小时' },
  { value: 'minute', title: '分钟' },
];

export type TimeWithUnit = {
  value: string;
  unit: {
    value: string;
    title: string;
  };
};

const minuteSeconds = 60;
const hourSeconds = 60 * minuteSeconds;
const daySeconds = 24 * hourSeconds;

/** 转换秒数到天/时/分 */
export const translateTime = (s: number): TimeWithUnit => {
  if (s / daySeconds >= 1 && s % daySeconds === 0) {
    return {
      value: (s / daySeconds).toString(),
      unit: timeUnits[0],
    };
  } else if (s / hourSeconds >= 1 && s % hourSeconds === 0) {
    return {
      value: (s / hourSeconds).toString(),
      unit: timeUnits[1],
    };
  } else {
    return {
      value: (s / minuteSeconds).toString(),
      unit: timeUnits[2],
    };
  }
};

/** 带单位事件数据转换为秒 */
export const translateTimeReverse = (data: TimeWithUnit): number | undefined => {
  if (data && data.value) {
    switch (data.unit.value) {
      case 'day':
        return parseFloat(data.value) * daySeconds;
      case 'hour':
        return parseFloat(data.value) * hourSeconds;
      case 'minute':
        return parseFloat(data.value) * minuteSeconds;
      default:
        return parseFloat(data.value) * minuteSeconds;
    }
  } else {
    return undefined;
  }
};
