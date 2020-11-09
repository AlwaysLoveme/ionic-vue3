import qs from 'qs';
import App from '@/main';
import envelopement from "@/api/envelopement";
import axios, {AxiosRequestConfig, AxiosError, AxiosResponse} from 'axios';

const Axios: any = axios;
// 设置默认请求头
Axios.defaults.headers = {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/x-www-form-urlencoded',
};
// 请求超时的时间限制
Axios.defaults.timeout = 20000;
// 取消请求
const CancelToken = Axios.CancelToken;
// config 代表发起请求的参数的实体
let requestName: any;

// 请求前拦截
const request = (config: AxiosRequestConfig) => {
    const url: string = config.url as string;
    App.config.globalProperties.$showLoading();
    if (!url.startsWith('http')) {
        config.url = envelopement.BASE_UEL + config.url;
    }

    config.headers.token = 'ff6c431816ef98417a20ba3cd53bda28';
    // 得到参数中的 requestName 字段，用于决定下次发起请求，取消对应的 相同字段的请求
    // 如果没有 requestName 就默认添加一个 不同的时间戳
    if (config.method === 'post' && !(config.data instanceof FormData)) {
        config.data = qs.stringify(config.data);
        if (config.data && qs.parse(config.data).requestName) {
            requestName = qs.parse(config.data).requestName;
        } else {
            requestName = new Date().getTime();
        }
    } else {
        if (config.params && config.params.requestName) {
            requestName = config.params.requestName;
        } else {
            requestName = new Date().getTime();
        }
    }
    // 判断，如果这里拿到的参数中的 requestName 在上一次请求中已经存在，就取消上一次的请求
    if (requestName) {
        if (Axios[requestName] && Axios[requestName].cancel) {
            Axios[requestName].cancel('取消了请求');
        }
        config.cancelToken = new CancelToken( (c: any) => {
            Axios[requestName] = {};
            Axios[requestName].cancel = c;
        });
    }
    return config;
}

// 请求后拦截
const response = async (response: AxiosResponse) => {
    await App.config.globalProperties.$hideLoading();
    const { data } = response;
    if(!data.status && !response.config.data.hideToast) {
        App.config.globalProperties.$toast(data.msg);
    }
    return data;
}

// 错误拦截
const error = (err: AxiosError) => {
    App.config.globalProperties.$hideLoading();
    return Promise.reject(err);
}

Axios.interceptors.request.use(request, error);
Axios.interceptors.response.use(response, error);

export default Axios;