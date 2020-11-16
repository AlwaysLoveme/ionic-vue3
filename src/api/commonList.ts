import axios from '@/utils/axios';

/**
 * 通用分页加载数据类
 * **/
class CommonList {
    // 本次请求的地址
    url: string = '';
    // 当前页
    page: number = 1;
    // 基于分页的参数集合
    params: object = {};
    // 请求方式，默认post
    method: string = 'post';
    // 是否有数据
    nodata: boolean = false;
    // 请求结果集合
    httpResult: never[] = [];

    /**
     * @param url: http request url
     * @param params: http request data
     * @param loadmore: default is not, refresh
     * @param method: http request methods, default is "POST"
     * **/
    async getListData(url: string, params: object = {}, loadmore: boolean = false, method: string = 'post') {
        this.url = url;
        this.params = params;
        this.method = method;
        const refresher = this.getInfiniteAndRefreshElement('ion-refresher');
        const infiniteScroll = this.getInfiniteAndRefreshElement('ion-infinite-scroll');
        if (!loadmore) {
            this.page = 1;
        }
        const param = {
            ...params,
            limit: 20,
            page: this.page,
        };
        const {data, status} = await axios[method](url, param);
        await this.finishInfiniteAndRefresh(refresher);
        await this.finishInfiniteAndRefresh(infiniteScroll, false);
        if (status) {
            const list: never[] = data instanceof Array ? data : data.list;
            loadmore ? this.httpResult.push(...list) : this.httpResult = list;
            if (list.length === 0) {
                await this.finishInfiniteAndRefresh(infiniteScroll, true);
                this.nodata = this.page === 1;
                return data;
            }
            this.page++;
        }
        return data;
    }

    getInfiniteAndRefreshElement(tagName: string) {
        const elements: HTMLElement | any = document.querySelectorAll(tagName);
        return elements;
    }

    async finishInfiniteAndRefresh(elements: any, disabled: boolean = false) {
        elements.forEach((element: HTMLElement | any) => {
            element.complete();
            element.disabled = disabled;
        });
    }
}

export default CommonList