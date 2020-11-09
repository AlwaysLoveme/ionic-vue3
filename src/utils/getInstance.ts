import {getCurrentInstance} from 'vue';

// 在Composition API setup() 中访问globalProperties， 在methods中可使用this.$xxx访问
export function getInstance() {
    const internalInstance: any = getCurrentInstance();
    return internalInstance.appContext.config.globalProperties;
}