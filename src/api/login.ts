import App from '@/main';
import router from '@/router';
import axios from '@/utils/axios';
import JPUSH from "@/utils/jpush";
import WebStorage from '@/utils/storage';

export interface LoginParam {
    code: string,
    mobile: string,
    password: string,
    store_type: number,
    agreeService: boolean,
}

export interface MobileCodeParam {
    mobile: string;
    store_type: number;
}

class Login {
    async login(params: LoginParam, loginTye: boolean = false) {
        if (!params.agreeService) return App.config.globalProperties.$toast('请先阅读并同意用户协议')
        const url = loginTye ? '/Login/codeLogin' : '/login/login';
        const {data, status} = await axios.post(url, params);
        if (status) {
            await new JPUSH().setAlias(data.alias);
            await WebStorage.setItem('token',data.token);
            await WebStorage.setItem('user', data.store);
            App.config.globalProperties.$toast('登录成功');
            await router.back();
        }
    }

    async sendMobileCode(params: MobileCodeParam) {
        const {status, msg} = await axios.post('/Login/sendCode', params);
        if (status) {
            App.config.globalProperties.$toast(msg);
            return Promise.resolve(true);
        }
    }
}

export default new Login;