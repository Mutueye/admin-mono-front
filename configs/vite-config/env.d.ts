/// <reference types="vite/client" />

declare module '*.vue' {
  import { defineComponent } from 'vue'
  const Component: ReturnType<typeof defineComponent>
  export default Component
}

interface ImportMetaEnv {
  /** athean服务api前缀: '/athena_api' */
  VITE_API_ATHENA: string
  /** uranus服务api前缀：'/api' */
  VITE_API_URANUS: string
  /** api gateway */
  VITE_API_GATEWAY: string
}
