import {createApp} from 'vue'
import App from './App.vue'
import router from './router';
import vconsole from 'vconsole';
import {IonicVue} from '@ionic/vue';
import plugin from "@/utils/plugin";
import customComponent from "@/components";

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/display.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';

/* Theme variables */
import './theme/variables.css';
import './theme/common.less';

// new vconsole();

const app = createApp(App)
    .use(IonicVue, {
        rippleEffect: true,
        mode: 'ios',
        backButtonText: '返回'
    })
    .use(router)
    .use(plugin)
    .use(customComponent);

router.isReady().then(() => {
    app.mount('#app');
});

export default app