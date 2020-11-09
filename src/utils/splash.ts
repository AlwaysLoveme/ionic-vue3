import { Plugins } from '@capacitor/core';
const { SplashScreen } = Plugins;
class Splash {
    async hide() {
        await SplashScreen.hide();
    }
    async show() {
        await SplashScreen.show();
    }
}
export default new Splash;