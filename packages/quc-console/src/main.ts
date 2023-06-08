import { createApp } from 'vue';
import { initQstTheme } from '@itshixun/qst-ui-system';

import App from '@/App.vue';
import { router } from '@/router/index';
import pinia from '@/store';

// element-plus css vars
import 'element-plus/theme-chalk/el-var.css';
// element-plus darkmode css variables
import 'element-plus/theme-chalk/dark/css-vars.css';
// unocss styles
import 'uno.css';

const app = createApp(App);
app.use(pinia);
app.use(router);

app.mount('#app');

initQstTheme();
