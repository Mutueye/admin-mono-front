import { defineConfig, loadEnv } from 'vite';
import * as path from 'path';
import vue from '@vitejs/plugin-vue';
import Unocss from 'unocss/vite';
import {
  presetAttributify,
  presetIcons,
  presetUno,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss';
import { theme, uplusIconCollection, safelist } from './unocss.theme';

const envDir = path.join(__dirname + '/../../env');

const baseConfig = defineConfig({
  plugins: [
    vue(),
    Unocss({
      presets: [
        presetUno(),
        presetAttributify(),
        presetIcons({
          scale: 1,
          warn: true,
          collections: {
            uplus: uplusIconCollection,
          },
        }),
      ],
      // unocss can't render icon class dynamically, when adding menu icon class
      // in route.meta.menuConfig, you must also add the icon class in safelist.
      safelist,
      transformers: [transformerDirectives(), transformerVariantGroup()],
      theme,
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  envDir,
});

/**
 * 通过不同模式的dev命令来启动不同的开发环境：
 * npm run dev - .env.dev环境
 * npm run dev:prod- .env.prod环境
 * npm run dev:local - 启动本地服务调试，需要根据你的本地服务地址，在/env/.env.local里配置VITE_API_BASEPATH和ITE_API_GATEWAY变量
 */
export default defineConfig(({ mode }) => {
  // 取env环境变量配置，没取到则默认开发环境
  const viteEnvs = loadEnv(mode, envDir);
  for (const k in viteEnvs) {
    process.env[k] = viteEnvs[k];
  }
  // api前缀
  const proxyApiPrepend = process.env.VITE_API_BASE_PATH ? process.env.VITE_API_BASE_PATH : '/spi';
  // 要代理的地址
  const gateway = process.env.VITE_API_GATEWAY
    ? process.env.VITE_API_GATEWAY
    : 'https://console.uc.qstcloud.com';

  return {
    build: {
      outDir: `../../dist/${process.env.npm_package_name}`,
    },
    ...baseConfig,
    base: process.env.VITE_APP_BASE_PATH ? process.env.VITE_APP_BASE_PATH : '/',
    server: {
      open: false,
      host: process.env.VITE_DEV_HOST ? process.env.VITE_DEV_HOST : '0.0.0.0',
      port: process.env.VITE_DEV_PORT_QMN as unknown as number,
      // 子应用请求时需要设置withCredentials:ture，才能在请求时的request headers中携带基座应用接口在respon header中设置的的cookie
      // 这样就要求vite的devServer配置跨域设置access-control-allow-origin不能为'*'，而是指定具体的domain，且access-control-allow-credentials需要设为true
      // 关于withCredentials:(https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/withCredentials)
      cors: {
        origin: `http://${process.env.VITE_DEV_HOST}:${process.env.VITE_DEV_PORT_MAIN}`,
        credentials: true,
      },
      proxy: {
        '/get_appconfig': {
          target: gateway,
          changeOrigin: true,
          secure: false,
        },
        [proxyApiPrepend]: {
          target: gateway,
          changeOrigin: true,
          // rewrite: (path) => path.replace(proxyApiPrepend, ''),
        },
      },
    },
  };
});
