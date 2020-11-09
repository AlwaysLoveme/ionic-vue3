/**
 * 该指令主要适用于沉浸式状态栏中，输入框获取焦点被软键盘挡住的情况 only for Android
 * **/
import {isPlatform} from '@ionic/vue';
import {Plugins, KeyboardInfo} from '@capacitor/core';

/**
 * 获取滚动元素
 * **/
function getContent() {
    const ionContent: HTMLElement | any = document.querySelector('ion-content');
    return ionContent;
}
/*
* 获取元素到可滚动区域内的高度
* @param el: native input element
* @param offsetTop: Initial value
* */
async function getOffsetTop(el: HTMLElement, offsetTop: number = 0): Promise<number> {
    let offset: number = offsetTop;
    if (el.nodeName && el.nodeName !== 'ION-CONTENT') {
        offset += el.offsetTop;
        return getOffsetTop(el.offsetParent as HTMLElement, offset);
    } else {
        return offset;
    }
}

const {Keyboard} = Plugins;
const keyBoardOverlay = {
    async mounted(el: HTMLElement | any) {
        // 非native平台不执行任何操作
        if (!isPlatform('hybrid')) return;
        // 这里延迟执行，否则有可能获取不到元素的offsetTop
        setTimeout(async () => {
            const ionContent: HTMLElement | any = getContent();
            const nativeInput: HTMLElement = await el.getInputElement();
            const thisOffsetTop: number = await getOffsetTop(el, 0);

            // 输入框获取焦点的时候，再监听键盘事件，使页面滚动至输入框可视区域内
            nativeInput.addEventListener('focus', function () {
                Keyboard.addListener('keyboardDidShow', function (keyboardInfo: KeyboardInfo) {
                    ionContent.style.cssText += `--keyboard-offset: ${keyboardInfo.keyboardHeight}px`;
                    ionContent.scrollToPoint(0, thisOffsetTop);
                });
                Keyboard.addListener('keyboardWillHide', function () {
                    ionContent.scrollToPoint(0, -thisOffsetTop);
                    ionContent.style.cssText += `--keyboard-offset: 0`;
                });
            }, false)
            // 输入框失去焦点，页面恢复原样
            nativeInput.addEventListener('blur', function () {
                Keyboard.removeAllListeners();
                ionContent.style.cssText += '--keyboard-offset: 0';
            }, false)
        }, 200);
    },
    unmounted() {
        Keyboard.removeAllListeners();
    }
}

export default keyBoardOverlay