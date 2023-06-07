/// <reference types="vite/client" />

interface ImportMetaEnv {
  VITE_API_BASE_PATH: string;
  VITE_API_GATEWAY: string;
  VITE_APP_PATH_MAIN: string;
  VITE_APP_PATH_QUC: string;
  VITE_APP_PATH_QMN: string;
  VITE_APP_PATH_QTS: string;
  VITE_DEV_HOST: string;
  VITE_DEV_PORT_MAIN: string;
  VITE_DEV_PORT_QUC: string;
  VITE_DEV_PORT_QMN: string;
  VITE_DEV_PORT_QTS: string;
}

declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  // eslint-disable-next-line @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
