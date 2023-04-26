import Jsencrypt from 'jsencrypt';

/**  对登录参数进行处理 */
export const encodeLoginParams = (key: string, params: string[]) => {
  const crypter = new Jsencrypt();
  crypter.setPublicKey(key);
  return crypter.encrypt(params.join('|'));
};
