import {RouteRecordRaw} from 'vue-router';
const goodsRoutes: Array<RouteRecordRaw> = [
    {
        path: '/goods-list',
        component: () => import('@/views/goods-manage/goods-list/GoodsList.vue')
    },
];
export default goodsRoutes;