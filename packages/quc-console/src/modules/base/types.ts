/** 应用管理中“应用”的基本数据结构 */
export type Applet = {
  /** 应用名称 */
  name: string;
  /** 应用id */
  id: string;
  /** 数据同步：true: 事件回调/已启用 false：未启用  */
  bulletinEnabled: boolean;
  /** 创建时间(13位时间戳) */
  createAt: number;
  /** 状态：是否启用 */
  enabled: boolean;
};
