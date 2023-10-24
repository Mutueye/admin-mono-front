import { defineStore } from 'pinia';
import { ApiPath, axiosInstance } from '@qst-admin/request';
import { requestWrapper, QstResult, QstPagination } from '@itshixun/qst-request-lib';

export type EnumType =
  /** 应用权限 */
  | 'apic'
  /** 机构类型 */
  | 'organ_type'
  /** 办学层次 */
  | 'organ_level'
  /** 办学性质 */
  | 'organ_nature'
  /** 证件类型 */
  | 'credit_type'
  /** 数据加密算法 */
  | 'bulletin_encrypt_algorithm'
  /** 签名算法 */
  | 'bulletin_signature_algorithm'
  /** 数据同步订阅事件类型 */
  | 'event_type';

/** 枚举列表 */
export type EnumList = { name: string; title: string }[];

export const useEnumsStore = defineStore('enums', {
  state: () => ({}),
  actions: {
    /** 获取枚举数据 */
    getEnums(type: EnumType) {
      return requestWrapper<QstResult<EnumList>>(() => axiosInstance.get(`${ApiPath}/console/enums/${type}`)).then(
        (res) => {
          if (res.data) {
            console.log('res.data:::', res.data);
            return res;
          }
        }
      );
    },
  },
});
