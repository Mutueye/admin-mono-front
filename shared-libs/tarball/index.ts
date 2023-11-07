import tar from 'tar';
import fs from 'fs';

/** 时间格式化 */
const formatDate = (time: Date | string | number, formater = 'YYYY-MM-DD hh:mm:ss', defaultStr = '--') => {
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

// const tarball = (name: string, version: string, fileList: string[]) => {
//   const file = `${name}-${version}-${formatDate(new Date(), 'YYYYMMDDhhmm')}.tgz`;
//   return tar
//     .c(
//       {
//         gzip: true,
//         file,
//       },
//       fileList
//     )
//     .then(() => {
//       return file;
//     });
// };

/**
 * 指定项目名称和版本，并将构建的 文件/文件夹 列表压缩为tgz文件，存放到指定的目录
 */
const tarball = ({
  appName,
  version,
  fileList,
  targetDir = '',
}: {
  /** 项目名称 */
  appName: string;
  /** 项目版本 */
  version: string;
  /** 打包文件/文件夹列表 */
  fileList: string[];
  /** 打包后存放的文件路径 */
  targetDir?: string;
}) => {
  const fileName = `${appName}-${version}-${formatDate(new Date(), 'YYYYMMDDhhmm')}.tgz`;
  console.log(`[${appName}]开始打包压缩...`);
  return tar
    .c(
      {
        gzip: true,
        file: fileName,
      },
      fileList
    )
    .then(() => {
      if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir);
      fs.rename(fileName, `${targetDir}/${fileName}`, (err) => {
        if (err) throw err;
        console.log(`[${appName}]项目打包压缩完成，位于根目录dist文件夹下，文件名称${fileName}！`);
      });
    });
};

export default tarball;
