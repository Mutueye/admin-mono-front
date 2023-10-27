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
