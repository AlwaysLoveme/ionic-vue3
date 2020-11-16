import {RouteRecordRaw} from 'vue-router';

const baseRoutes: Array<RouteRecordRaw> = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        component: () => import('@/views/home/Home.vue')
    },
    {
        path: '/login',
        component: () => import('@/views/login/Login.vue')
    },
    {
        path: '/image-cropper',
        component: () => import('@/views/image-cropper/ImageCropper.vue')
    }
];
export default baseRoutes;