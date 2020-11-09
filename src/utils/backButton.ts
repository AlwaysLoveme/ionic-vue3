import app from '@/main';
import {useRouter} from "vue-router";
import {Plugins} from "@capacitor/core";
import {useIonRouter} from '@ionic/vue';
import {
    toastController,
    alertController,
    modalController,
    pickerController,
    loadingController,
    actionSheetController,
} from "@ionic/vue";

const {App} = Plugins;

class BackButton {
    lastTime: number = new Date().valueOf();
    subscribe() {
        const pageRouter = useRouter();
        const ionRouter = useIonRouter();
        App.addListener('backButton', async () => {
            if (ionRouter.canGoBack()) {
                // close all modals before router back
                const modal = await modalController.getTop();
                const alert = await alertController.getTop();
                const picker = await pickerController.getTop();
                const loading = await loadingController.getTop();
                const actionSheet = await actionSheetController.getTop();
                if (modal) {
                    await modal.dismiss();
                    return;
                }
                if (alert) {
                    await alert.dismiss();
                    return;
                }
                if (picker) {
                    await picker.dismiss();
                    return;
                }
                if (loading) {
                    await loading.dismiss();
                    return;
                }
                if (actionSheet) {
                    await actionSheet.dismiss();
                    return;
                }
            } else {
                if (new Date().valueOf() - this.lastTime < 2000) {
                    App.exitApp();
                } else {
                    app.config.globalProperties.$toast('请再按一次退出');
                    // app.$toast('请再按一次退出');
                    this.lastTime = new Date().valueOf();
                }
            }
        })
    }
}

export default new BackButton