import axios from '@/utils/axios';
import CommonList from "@/api/commonList";
// import {BaseListPage} from "@/api/interface";

interface GoodsListParam{
    search: string;
    goods_status: number | string;
    [propName: string]: any;
}

class Goods extends CommonList{
    constructor() {
        super();
    }
    /**
     * @param: {
     *     page: current page,
     *     limit: page limit data
     *     goods_status: goods status
     *     search: search goods by keyword
     * }
     * **/
    async getGoodsList(param: GoodsListParam, loadmore: boolean = false,): Promise<never[]> {
        await this.getListData('/Goods/getList', param, loadmore);
        return this.httpResult;
    }
}

export default new Goods;