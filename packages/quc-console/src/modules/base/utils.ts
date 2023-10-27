/** 时间单位：天、时、分 */
export const timeUnits = [
  { value: 'day', title: '天' },
  { value: 'hour', title: '小时' },
  { value: 'minute', title: '分钟' },
];

/** 转换秒数到天/时/分 */
export const translateTime = (s: number) => {
  const minuteSeconds = 60;
  const hourSeconds = 60 * minuteSeconds;
  const daySeconds = 24 * hourSeconds;
  if (s / daySeconds >= 1 && s % daySeconds === 0) {
    return {
      value: s / daySeconds,
      unit: timeUnits[0],
    };
  } else if (s / hourSeconds >= 1 && s % hourSeconds === 0) {
    return {
      value: s / hourSeconds,
      unit: timeUnits[1],
    };
  } else {
    return {
      value: s / minuteSeconds,
      unit: timeUnits[2],
    };
  }
};
