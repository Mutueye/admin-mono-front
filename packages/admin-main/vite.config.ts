import { defineConfig, loadEnv } from 'vite';
import * as path from 'path';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import Unocss from 'unocss/vite';

const envDir = path.join(__dirname + '/../../env');

const baseConfig = defineConfig({
  plugins: [vue(), AutoImport({ resolvers: [ElementPlusResolver()] }), Components({ resolvers: [ElementPlusResolver()] }), Unocss()],
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
  const gateway = process.env.VITE_API_GATEWAY ? process.env.VITE_API_GATEWAY : 'https://console.uc.eduplus.net';

  return {
    build: {
      outDir: `../../dist/${process.env.npm_package_name}`,
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            // 第三方模块按包名进行拆分打包
            if (id.includes('node_modules')) {
              let name = 'vendor';
              const idArray = id.split('/node_modules/');
              const endStr = idArray[idArray.length - 1];
              const finalStr = endStr.split('/')[0];
              if (finalStr && !finalStr.startsWith('.')) {
                name = `vendor-${finalStr}`;
              }
              return name;
            }
          },
        },
      },
    },
    ...baseConfig,
    base: process.env.VITE_APP_PATH_MAIN ? process.env.VITE_APP_PATH_MAIN : '/',
    server: {
      open: true,
      host: process.env.VITE_DEV_HOST ? process.env.VITE_DEV_HOST : '0.0.0.0',
      port: process.env.VITE_DEV_PORT_MAIN as unknown as number,
      proxy: {
        '/get_appconfig': {
          target: gateway,
          changeOrigin: true,
          secure: false,
        },
        [proxyApiPrepend]: {
          target: gateway,
          changeOrigin: true,
        },
      },
    },
  };
});
