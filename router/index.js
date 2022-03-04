import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

const createRouter = () => new VueRouter({
    routes: [
        {
            path: '/',
            component: () => import("@/pages/home/index.vue")
        },
        {
            path: '/user',
            component: () => import("@/pages/user/index.vue")
        }
    ]
})

const router = createRouter();
export default router;