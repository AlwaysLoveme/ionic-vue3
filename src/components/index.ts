import CustomNavbar from "@/components/CustomNavbar.vue";
import CustomPageContent from "@/components/CustomPageContent.vue";

interface CustomComponent {
    [propName: string]: any
}
const components: CustomComponent = {
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
