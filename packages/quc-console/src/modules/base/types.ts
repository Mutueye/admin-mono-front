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
  /** 访问令牌超时时间 */
  accessTokenTimeout: 7200;
  /** 刷新令牌超时时间 */
  refreshTokenTimeout: 14400;
  /** 应用权限码 */
  apic: 122;
  /** 应用权限列表 */
  apicList: EnumList;
  /** 启用/禁用 状态 */
  enabled: boolean;
  /** remark */
  remark: string;
  /**数据同步是否开启 */
  bulletinEnabled: boolean;
  /** 数据同步模式 EventCallback*/
  bulletinMode: string;
  /** 数据同步模式名称 */
  bulletinModeTitle: string;
  /** 数据同步信息 */
  bulletinMetadata: {
    /** 数据加密是否开启 */
    encryptEnabled: boolean;
    /** 数据签名是否开启 */
    signatureEnabled: boolean;
    /** URI */
    uri: 'https://tev.qstcloud.net/api/auth/quc_event';
    /** 订阅事件 TODO */
    events: string[];
    /** TOKEN */
    token: '117e1d61ec1911e9a16cfa163ef5ba8a';
  };
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
