// import { ref } from 'vue';

/**
 * ion-button 验证码倒计时
 * **/
let timer: any = null;
const MobileCode = {
    name: 'mobileCode',
    async mounted(el: HTMLElement | any, binding: any) {
        let time = 60;
        if (el.tagName === 'ION-BUTTON') {
            el.innerText = '获取验证码';
            el.addEventListener('click', function () {
                binding.value(countDown);
            }, false);
        } else {
            console.error('绑定元素应为<ion-button>');
        }

        function countDown() {
            timer = setInterval(() => {
                time--;
                el.innerText = `${time}s后重新获取`;
                el.disabled = true;
                if (time < 1) {
                    el.disabled = false;
                    el.innerText = '获取验证码';
                    clearInterval(timer);
                    timer = null;
                    time = 10;
                }
            }, 1000);
        }
    },
    unmounted() {
        if (timer) {
            clearInterval(timer);
            timer = null;
        }
    }
}

export default MobileCode;