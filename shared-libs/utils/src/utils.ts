/** 时间格式化 */
export const formatDate = (time: Date | string | number, formater = 'YYYY-MM-DD hh:mm:ss', defaultStr = '--') => {
  if (!time) return defaultStr;

  const date =
    typeof time === 'number'
      ? new Date(time < 10000000000 ? time * 1000 : time)
      : time instanceof Date
      ? time
      : new Date(time);

  const year = toZeroStr(date.getFullYear());
  const month = toZeroStr(date.getMonth() + 1);
  const day = toZeroStr(date.getDate());
  const hour = toZeroStr(date.getHours());
  const min = toZeroStr(date.getMinutes());
  const sec = toZeroStr(date.getSeconds());

  return formater
    .replace(/Y+/, year)
    .replace(/M+/, month)
    .replace(/D+/, day)
    .replace(/h+/, hour)
    .replace(/m+/, min)
    .replace(/s+/, sec);
};

const toZeroStr = (num: number) => {
  if (num > 99) return num.toString();
  return num > 9 ? num.toString() : `0${num}`;
};

/** 获取日期字符串 */
export const getDateStr = (date: Date, separator = '-') => {
  // const date = new Date();
  const year = toZeroStr(date.getFullYear());
  const month = toZeroStr(date.getMonth() + 1);
  const day = toZeroStr(date.getDate());
  return year + separator + month + separator + day;
};

/** 获取当前日期的格式化字符串 默认YYYY-MM-DD */
export const getCurrentDateStr = (separator = '-') => {
  return getDateStr(new Date(), separator);
};

/**
 * 日期 加减 天数，并返回格式化字符串，默认YYYY-MM-DD
 * @param {Date} date 当前日期
 * @param {number} days 天数
 * @param {string} separator 分隔字符，默认'-'
 */
export const datePlusDays = (date: Date, days: number, separator = '-') => {
  const dateStr = getDateStr(date, separator);
  return getDateStr(new Date(new Date(`${dateStr} 00:00:00`).getTime() + days * 24 * 60 * 60 * 1000), separator);
};
