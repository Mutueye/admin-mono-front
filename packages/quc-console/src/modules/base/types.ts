import { EnumList } from '@/store/enums';

/** 应用管理中“应用”的基本数据结构 */
export interface AppletCardData {
  /** 应用名称 */
  name: string;
  /** 应用id */
  id: string;
  /** 数据同步：true: 事件回调/已启用 false：未启用  */
  bulletinEnabled: boolean;
  /** 数据同步模式 */
  bulletMode: 'EventCallback' | '';
  /** 数据同步模式名称 */
  bulletModeTitle: string;
  /** 创建时间(13位时间戳) */
  createAt: number;
  /** 状态：是否启用 */
  enabled: boolean;
}

/** 数据同步 meta data */
export interface BulletinMetaData {
  /** 数据加密是否开启 */
  encryptEnabled: boolean;
  /** 数据加密算法 enum key: bulletin_encrypt_algorithm */
  encryptAlgorithm: string;
  /** 数据加密密钥 */
  encryptKey: string;
  /** 数据签名是否开启 */
  signatureEnabled: boolean;
  /** 数据签名算法 enum key: bulletin_signature_algorithm */
  signatureAlgorithm: string;
  /** 数据签名key */
  signatureKey: string;
  /** 数据签名启用随机数 */
  signingNonce: boolean;
  /** 数据签名启用时间戳 */
  signingTimestamp: boolean;
  /** URI */
  uri: string;
  /** 订阅事件 enum key: event_type*/
  events: string[];
  /** TOKEN */
  token: string;
}

/** 应用详细数据 */
export interface AppletData {
  /** 应用id clientId */
  id: string;
  /** signing key */
  signingKey: string;
  /** 应用名称 */
  name: string;
  /** hosts */
  hosts: string[];
  /** 访问令牌超时时间 单位s 没有表示永久有效 */
  accessTokenTimeout?: number;
  /** 刷新令牌超时时间 单位s 没有表示永久有 */
  refreshTokenTimeout?: number;
  /** 应用权限码 */
  apic?: number;
  /** 应用权限列表 */
  apicList?: EnumList;
  /** 启用/禁用 状态 */
  enabled: boolean;
  /** remark */
  remark?: string;
  /** 有效期 13位标准时间戳 没有值表示永久有效 */
  expireAt?: number;
  /**数据同步是否开启 */
  bulletinEnabled: boolean;
  /** 数据同步模式 EventCallback*/
  bulletinMode?: string;
  /** 数据同步模式名称 */
  bulletinModeTitle?: string;
  /** 数据同步信息 */
  bulletinMetadata?: BulletinMetaData;
}

/** 创建应用 - 提交的数据结构 */
export interface CreateAppletPayload {
  /** 应用名称 */
  name: string;
  /** 应用hosts列表 */
  hosts: string[];
}

/** 创建应用 - 响应数据结构 */
export interface CreateAppletResponse extends CreateAppletPayload {
  id: string;
  secret: string;
}
