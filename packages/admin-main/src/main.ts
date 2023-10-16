import { createApp } from 'vue';
import { initQstTheme } from '@itshixun/qst-ui-system';
import { useAuthStore } from '@qst-admin/auth';
import { initRequestWrapper } from '@qst-admin/utils';
import { getSubAppList } from './utils/subAppConfig';
import App from '@/App.vue';
import { router, initRouter } from '@/router/index';
import pinia from '@/store';

// element-plus css variables
import 'element-plus/theme-chalk/index.css';
// import 'element-plus/theme-chalk/el-var.css';
// // element-plus darkmode css variables
import 'element-plus/theme-chalk/dark/css-vars.css';
// // fix el-dialog el-message-box el-loading 样式丢失; 或可用uplugin-element-plus插件
// import 'element-plus/theme-chalk/el-dialog.css';
// import 'element-plus/theme-chalk/el-message.css';
// import 'element-plus/theme-chalk/el-message-box.css';
// import 'element-plus/theme-chalk/el-loading.css';
// import 'element-plus/theme-chalk/el-form.css';
// import 'element-plus/theme-chalk/el-form-item.css';
// // 引入el-menu的样式，保证子应用的el-menu可以获取到:root内定义的el-menu相关css变量
// import 'element-plus/theme-chalk/el-menu.css';
// unocss styles
import 'uno.css';

getSubAppList().then(() => {
  initRouter();
  if (router) {
    const app = createApp(App);
    app.use(pinia);
    app.use(router);
    // app.use(ElementPlus, { locale: zhCn });

    app.mount('#app');

    /** 初始化requestWrapper配置 */
    initRequestWrapper(() => {
      useAuthStore().logout(() => router?.push({ name: 'login' }));
    });
  }
});

initQstTheme();
