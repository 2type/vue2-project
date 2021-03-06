import Vue from 'vue';
import App from './index.vue';
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from '@/router'
import store from '@/store'

// import store from './store';

Vue.use(ElementUI)

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app');