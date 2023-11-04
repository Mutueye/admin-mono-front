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
  | 'event_type'
  /** 事件来源 */
  | 'event_source';

/** 枚举列表 */
export type EnumList = { name: string; title: string }[];

export const useEnumsStore = defineStore('enums', {
  state: (): Record<EnumType, EnumList> => ({
    apic: [],
    organ_type: [],
    organ_level: [],
    organ_nature: [],
    credit_type: [],
    bulletin_encrypt_algorithm: [],
    bulletin_signature_algorithm: [],
    event_type: [],
    event_source: [],
  }),
  actions: {
    /**
     * 获取枚举数据
     * @param {EnumType} type 枚举类型
     * @param {boolean} reload 是否强制重新请求接口数据，默认false
     */
    getEnums(type: EnumType, reload = false) {
      if (this[type].length === 0 || reload) {
        return requestWrapper<QstResult<EnumList>>(() => axiosInstance.get(`${ApiPath}/console/enums/${type}`)).then(
          (res) => {
            if (res.data) this[type] = res.data;
            return this[type];
          }
        );
      } else {
        // 如果当前类型的枚举已存在，不再请求接口，直接返回
        return Promise.resolve(this[type]);
      }
    },
  },
});
