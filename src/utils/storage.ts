import {Plugins} from '@capacitor/core';
const {Storage} = Plugins;

class WebStorage {
    async setItem(key: string, value: string | object) {
        const setValue = typeof value === 'string' ? value : JSON.stringify(value);
        return Storage.set({ key, value: setValue});
    }
    async getItem(key: string) {
        const result: any = await Storage.get({key});
        if (typeof result.value === 'string') {
            return result.value;
        }
        return JSON.parse(result.value);
    }
    remove(key: string) {
        return Storage.remove({key});
    }
    getKeys() {
        return Storage.keys();
    }
    clear() {
        return Storage.clear();
    }
}
export default new WebStorage