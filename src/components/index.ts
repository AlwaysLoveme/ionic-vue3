import CustomNavbar from "@/components/CustomNavbar.vue";
import CustomPageContent from "@/components/CustomPageContent.vue";

import {
    IonApp,
    IonPage,
    IonHeader,
    IonToolbar,
    IonFab,
    IonButton,
    IonButtons,
    IonBackButton,
    IonFabButton,
    IonSegment,
    IonSegmentButton,
    IonIcon,
    IonTitle,
    IonFooter,
    IonContent,
    IonImg,
    IonGrid,
    IonRow,
    IonCol,
    IonList,
    IonItem,
    IonLabel,
    IonAvatar,
    IonInput,
    IonSearchbar,
    IonCheckbox,
    IonRadio,
    IonRadioGroup,
    IonSelect,
    IonSelectOption,
    IonDatetime,
    IonRefresher,
    IonSkeletonText,
    IonInfiniteScroll,
    IonRefresherContent,
    IonInfiniteScrollContent,
    IonRouterOutlet,
} from '@ionic/vue';



interface CustomComponent {
    [propName: string]: any
}

const base = {
    IonApp,
    IonPage,
    IonRouterOutlet,
}
const buttons = {
    IonFab,
    IonButton,
    IonSegment,
    IonButtons,
    IonFabButton,
    IonBackButton,
    IonSegmentButton,
}
const forms = {
    IonInput,
    IonRadio,
    IonSelect,
    IonCheckbox,
    IonDatetime,
    IonSearchbar,
    IonRadioGroup,
    IonSelectOption,
}

const layout = {
    IonRow,
    IonCol,
    IonGrid,
    IonList,
    IonItem,
    IonLabel,
    IonTitle,
    IonAvatar,
    IonHeader,
    IonFooter,
    IonToolbar,
    IonContent,
    IonSkeletonText,
}
const loading = {
    IonRefresher,
    IonInfiniteScroll,
    IonRefresherContent,
    IonInfiniteScrollContent,
}

const components: CustomComponent = {
    IonImg,
    IonIcon,
    ...base,
    ...forms,
    ...layout,
    ...buttons,
    ...loading,
    CustomNavbar,
    CustomPageContent,
}

const customComponent = {
    install(app: any) {
        Object.keys(components).forEach((component: string) => {
            app.component(component, components[component]);
        });
        return app;
    }
}
export default customComponent;
