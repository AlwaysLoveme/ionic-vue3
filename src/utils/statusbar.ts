import {isPlatform} from '@ionic/vue';
import {Plugins, StatusBarStyle} from '@capacitor/core';

const {StatusBar} = Plugins;

class Statusbar {
    /*
    * @style dark or light
    * */
    async setStatusBarStyle(style: string, color: string = '#ffffff') {
        if(!isPlatform('capacitor')) return;
        StatusBar.setStyle({
            style: style === 'dark' ? StatusBarStyle.Dark : StatusBarStyle.Light
        }).then();
        StatusBar.setBackgroundColor({
            color
        }).then();
    }

    /*
    * overlaysWebview only for android
    * */
    setOverlaysWebview(overlay: boolean) {
        if (!isPlatform('android')) return;
        StatusBar.setOverlaysWebView({overlay}).then();
    }

    async hideStatusBar() {
        return StatusBar.hide();
    }

    async showStatusBar() {
        return StatusBar.show();
    }

    async getStatusbarInfo() {
        return await StatusBar.getInfo();
    }
}

export default new Statusbar