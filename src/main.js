import { createApp } from 'vue'
import App from './App.vue'
import installElementPlus from './plugins/element'

const app = createApp(App)
// 屏蔽错误信息
app.config.errorHandler = () => null;
// 屏蔽警告信息
app.config.warnHandler = () => null;

installElementPlus(app)
app.mount('#app')