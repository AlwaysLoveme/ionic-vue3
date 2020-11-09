import keyBoardOverlay from '@/directive/keyBoardOverlay';
import {toastController, loadingController, alertController, actionSheetController} from '@ionic/vue'

const install = function (app: any) {
    app.config.globalProperties.$toast = async function (message: string) {
        const toastContrl = await toastController.create({
            message,
            mode: 'ios',
            duration: 1500,
            cssClass: 'custom-toast'
        });
        return await toastContrl.present();
    }
    app.config.globalProperties.$showLoading = async function(message: string = '') {
        const loading = await loadingController.create({
            message,
            mode: 'ios',
            duration: 0,
            spinner: 'lines',
        });
        return await loading.present();
    }
    app.config.globalProperties.$hideLoading = async function() {
        const loading = await loadingController.getTop();
        if (loading) {
            return await loading.dismiss();
        }
    }
    app.config.globalProperties.$hideAlert = async function() {
        const alert = await alertController.getTop();
        if (alert) {
            return await alert.dismiss();
        }
    }
    app.config.globalProperties.$hideActionSheet = async function() {
        const actionSheet = await actionSheetController.getTop();
        if (actionSheet) {
            return await actionSheet.dismiss();
        }
    }

    app.directive('keyboardOverlay', keyBoardOverlay);
    return app;
}

export default {
    install
}