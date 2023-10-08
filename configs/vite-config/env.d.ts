/// <reference types="vite/client" />

declare module '*.vue' {
  import { defineComponent } from 'vue'
  const Component: ReturnType<typeof defineComponent>
  export default Component
}

// declare module '*.vue' {
//   import type { DefineComponent } from 'vue';
//   // eslint-disable-next-line @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any
//   const component: DefineComponent<{}, {}, any>;
//   export default component;
// }

declare interface ImportMetaEnv {
  /** API前缀 /spi */
  VITE_API_BASE_PATH: string
  /** 后端地址，仅供前端开发时 vite dev server 使用 */
  VITE_API_GATEWAY: string
  /** 基座项目根目录 */
  VITE_APP_PATH_MAIN: string
  /** 用户中心控制台根目录 */
  VITE_APP_PATH_QUC: string
  /** 消息通知控制台根目录 */
  VITE_APP_PATH_QMN: string
  /** 任务调度控制台根目录 */
  VITE_APP_PATH_QTS: string
  /** 开发模式下 vite dev server 的 host */
  VITE_DEV_HOST: string
  /** 开发模式下 基座项目的端口 */
  VITE_DEV_PORT_MAIN: string
  /** 开发模式下 用户中心控制台项目的端口 */
  VITE_DEV_PORT_QUC: string
  /** 开发模式下 消息通知控制台项目的端口 */
  VITE_DEV_PORT_QMN: string
  /** 开发模式下 任务调度控制台项目的端口 */
  VITE_DEV_PORT_QTS: string
}
