import App from '@/main';
import baseRoutes from "@/router/base";
import goodsRoutes from "@/router/goods";
import WebStorage from '@/utils/storage';
import {RouteRecordRaw} from 'vue-router';
import {createRouter, createWebHistory} from '@ionic/vue-router';

const routes: Array<RouteRecordRaw> = [
    ...baseRoutes,
    ...goodsRoutes,
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

router.beforeEach(async (to, from, next) => {
    // 页面切换先关闭loading之类的弹窗
    await App.config.globalProperties.$hideAlert();
    await App.config.globalProperties.$hideLoading();
    await App.config.globalProperties.$hideActionSheet();
    const token = await WebStorage.getItem('token');
    if (!token && to.path.indexOf('/login') === -1) {
        next('/login');
    } else {
        next();
    }
});

export default router
