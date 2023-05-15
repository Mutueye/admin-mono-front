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
import { theme, uplusIconCollection } from './unocss.theme';

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
      safelist: [
        'i-mdi-home',
        'i-mdi-home-city-outline',
        'i-mdi-home-modern',
        'i-mdi-collage',
        'i-mdi-form-textbox-password',
        'i-mdi-clover',
        'i-mdi-home-outline',
        'i-mdi-apps',
        'i-mdi-account-settings-outline',
        'i-mdi-check-network-outline',
        'i-mdi-record-circle',
        'i-mdi-account-cog-outline',
        'i-mdi-account-details-outline',
        'i-mdi-air-humidifier',
        'i-mdi-air-horn',
        'i-mdi-alarm-light-outline',
        'i-mdi-alarm-panel-outline',
        'i-mdi-altimeter',
        'i-mdi-antenna',
        'i-mdi-apache-kafka',
        'i-mdi-api',
        'i-mdi-archive-outline',
        'i-mdi-archive-cog-outline',
        'i-mdi-atom-variant',
        'i-mdi-auto-mode',
        'i-mdi-audio-input-rca',
        'i-mdi-av-timer',
        'i-mdi-balcony',
        'i-mdi-baseball-diamond-outline',
        'i-mdi-bell-circle-outline',
        'i-mdi-bell-ring-outline',
        'i-mdi-book-account-outline',
        'i-mdi-book-cog-outline',
        'i-mdi-book-settings-outline',
        'i-mdi-bookmark-box-outline',
        'i-mdi-bullhorn-outline',
        'i-mdi-bulletin-board',
        'i-mdi-bug-outline',
        'i-mdi-butterfly-outline',
        'i-mdi-calendar',
        'i-mdi-calendar-clock',
        'i-mdi-calendar-search',
        'i-mdi-calendar-lock',
        'i-mdi-card-bulleted-settings-outline',
        'i-mdi-cast-audio-variant',
        'i-mdi-chart-bar',
        'i-mdi-chart-box-outline',
        'i-mdi-chart-timeline-variant-shimmer',
        'i-mdi-chemical-weapon',
        'i-mdi-city-variant-outline',
        'i-mdi-message-cog-outline',
      ],
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
    build: { outDir: `../../dist/${process.env.npm_package_name}` },
    ...baseConfig,
    base: process.env.VITE_APP_BASE_PATH ? process.env.VITE_APP_BASE_PATH : '/',
    server: {
      open: true,
      host: '0.0.0.0',
      port: 5100,
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
