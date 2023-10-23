/** 应用管理中“应用”的基本数据结构 */
export type Applet = {
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
};

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
