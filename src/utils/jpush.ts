import {isPlatform} from '@ionic/vue';

interface Alias {
    alias: string;
    sequence: number;
}

interface AliasSuccess {
    (alias: string, sequence: number): void;
}

interface AliasError {
    (code: number, sequence: number): void;
}

interface GetRegistrationID {
    (id: string): string;
}

interface JPUSH {
    init(): void;

    startJPushSDK(): void;

    setBadge: (badge: number) => void;

    setDebugMode(enable: boolean): void;

    getRegistrationID(callback: GetRegistrationID): void;

    setAlias(alias: Alias, success: AliasSuccess, error: AliasError): any;
}

class Jpush {
    JPushInstance: JPUSH | any;

    constructor() {
        if ((window as any).JPush) {
            this.JPushInstance = ((window as any).JPush as JPUSH);
            this.JPushInstance.setDebugMode(true);
            if (isPlatform('ios')) {
                this.JPushInstance.startJPushSDK();
                this.JPushInstance.init();
            }
        }
    }

    getRegistrationID() {
        return new Promise(resolve => {
            this.JPushInstance.getRegistrationID(function (rId: string) {
                resolve(rId);
                console.log("JPushPlugin:registrationID is " + rId);
            })
        })
    }

    // 设置别名
    setAlias(alias: string) {
        return new Promise(((resolve, reject) => {
            this.JPushInstance.setAlias({
                alias,
                sequence: new Date().valueOf(),
            }, (res: { alias: string; sequence: number }) => {
                console.log('别名设置成功: ', res);
                resolve(res);
            }, (err: { code: number; sequence: number }) => {
                console.log('别名设置失败: ', err);
                setTimeout(() => this.setAlias(alias), 3000);
                reject(err);
            })
        }))
    }

    // 设置角标 只限IOS
    setBadge(badge: number) {
        if (isPlatform('ios')) {
            this.JPushInstance.setBadge(badge);
        }
    }

    trrigerEvents() {
        // 点击通知进入应用程序时触发
        document.addEventListener('jpush.openNotification', function (event) {
            console.log(event);
        }, false);

        // 收到通知时触发。
        document.addEventListener("jpush.receiveNotification", function (event: any) {
            let alertContent;
            if (isPlatform('android')) {
                alertContent = event.alert
            } else {
                alertContent = event.aps.alert
            }
            alert("open Notification:" + alertContent)
        }, false)

        // 收到自定义消息时触发，推荐使用事件的方式传递。
        document.addEventListener("jpush.receiveMessage", function (event: any) {
            let message = null;
            if (isPlatform('android')) {
                message = event.message;
            } else {
                message = event.content;
            }
            console.log(message)
        }, false)
    }
}

export default Jpush