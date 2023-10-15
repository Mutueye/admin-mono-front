import { createApp } from 'vue';
// import ElementPlus from 'element-plus';
// import zhCn from 'element-plus/es/locale/lang/zh-cn';
import { initQstTheme } from '@itshixun/qst-ui-system';
import { getSubAppList } from './utils/subAppConfig';

import App from '@/App.vue';
import { router, initRouter } from '@/router/index';
import pinia from '@/store';

// 初始化aixos控制器及其实例
import '@/utils/requestUtils';

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
  }
});

initQstTheme();
