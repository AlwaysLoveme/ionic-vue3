import {RouteRecordRaw} from 'vue-router';
import {createRouter, createWebHistory} from '@ionic/vue-router';
import App from '@/main'
import Tabs from '../views/Tabs.vue'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        component: () => import('@/views/home/Home.vue')
    },
    {
        path: '/goods-list',
        component: () => import('@/views/goods-manage/goods-list/GoodsList.vue')
    },
    {
        path: '/login',
        component: () => import('@/views/login/Login.vue')
    },
    {
        path: '/image-cropper',
        component: () => import('@/views/image-cropper/ImageCropper.vue')
    }
    // {
    //     path: '/tabs/',
    //     component: Tabs,
    //     children: [
    //         {
    //             path: '',
    //             redirect: 'tab1'
    //         },
    //         {
    //             path: 'tab1',
    //             component: () => import('@/views/Tab1.vue')
    //         },
    //         {
    //             path: 'tab2',
    //             component: () => import('@/views/Tab2.vue')
    //         },
    //         {
    //             path: 'tab3',
    //             component: () => import('@/views/Tab3.vue')
    //         }
    //     ]
    // }
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

    next();
});

export default router
