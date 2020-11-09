import { onMounted, onUnmounted} from 'vue';
import Goods from "@/api/goods";
import Emmiter from 'tiny-emitter/instance';
import {reactive, ref} from '@vue/reactivity';


export function getGoodsList() {
    const goodsData = ref([]);
    const goodsState = reactive({
        search: '',
        goodsStatus: 0,
    });
    const getGoodsData = async (loadmore: boolean = false) => {
        goodsData.value = await Goods.getGoodsList({
            search: goodsState.search,
            goods_status: goodsState.goodsStatus,
        }, loadmore);
    }
    onMounted(() => {
        getGoodsData().then();
        Emmiter.on('getList', getGoodsData);
    });
    onUnmounted(() => {
        Emmiter.off('getList', getGoodsData);
    })
    return { getGoodsData, goodsData, goodsState}
}